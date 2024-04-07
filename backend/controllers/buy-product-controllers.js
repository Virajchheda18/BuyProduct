const {validationResult} = require('express-validator');
const ksuid = require('ksuid');

// Importing Database models
const Order = require('../models/order-model');
const Product = require('../models/product-model');
const User = require('../models/user-model');
const HttpError = require('../utils/http-error');

// Function to add new product
const addProduct = async (req, res, next) => {

    let input = req.body;
    let product = null;
    try {
        // Checking validations on API's request body
        let error = validationResult(req);
        if (!error.isEmpty()) {
            return next(new HttpError(error ?.array()[0] ?.msg, 400));
        }

        // Creating unique custom id for a product
        input.id = "pr_" + ksuid.randomSync().string;
        
        // Creating new product
        product = await Product.create(input);

        //Returning product id as response
        return res.json({ id : product.id });

    } catch (error) {
        return next(new HttpError('Internal Server Error', 500));
    }

}

// Function to place an order
const get_cost = async (req, res, next) => {

    // Checking validations on API's request body
    let error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new HttpError(error ?.array()[0] ?.msg, 400));
    }

    let input = req.body;
    let product = null;
    let user = null;
    let order = null;
    let cost = null;

    try {

        // Getting product details from database
        product = await Product.findOne({
            name: input ?.product_name,
            size: input ?.size,
            color: input ?.color
        });

        // Getting user details from database
        user = await User.findOne({
            email: input ?.email
        });

        // Throwing error if product not available
        if (!product) {
            return next(new HttpError('Product not available', 400));
        }

        cost = product.cost;

        // Coupon logic for FIRST50
        if (input ?.coupon === "FIRST50") {

            //Checks if first purchase or already used coupon
            if (user) {
                return next(new HttpError('Coupon is not applicable', 400));
            }

            cost = cost / 2;
        } 

        // Coupon logic for PATRON50
        else if (input ?.coupon === "PATRON50") {

            //Checks if more than 4 purchase or already used coupon
            if (!user || user.coupons_used.includes("PATRON50") || user.order_count <= 4) {
                return next(new HttpError('Coupon is not applicable', 400));
            }

            cost = cost / 2;   
        } 
        
        // Coupon logic for REPEAT80
        else if (input ?.coupon === "REPEAT80") {
            
            order = await Order.findOne({
                product_id: product ?.id,
                user_id: user ?.id
            });

            //Checks if user has already placed the same order previously (same product, same size and same color)
            if (!order) {
                return next(new HttpError('Coupon is not applicable', 400));
            }

            cost = cost * 0.8;
        }

        // Returning cost
        return res.json({
            cost: cost,
            product_id: product.id
        })

    } catch (error) {
        return next(new HttpError('Internal Server Error', 500));
    }
}

// Function to place an order
const placeOrder = async (req, res, next) => {

    // Checking validations on API's request body
    let error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new HttpError(error ?.array()[0] ?.msg, 400));
    }

    let input = req.body;
    let user = null;
    let order = null;

    try {

        // Getting user details from database
        user = await User.findOne({
            email: input ?.email
        });

        user = user ? user : {
            id: "us_" + ksuid.randomSync().string,
            email: input.email,
            order_count: 0,
            coupons_used: []
        };

        if (input ?.coupon && !user.coupons_used.includes(input ?.coupon)) {
            user.coupons_used.push(input.coupon);
        }
        user.order_count += 1;

        // Upserting user
        await User.findOneAndUpdate({
            id: user.id
        }, {
            $set: user
        }, {
            upsert: true
        });

        // Creating new order
        order = await Order.create({
            id: "or_" + ksuid.randomSync().string,
            product_id: input ?.product_id,
            user_id: user ?.id
        });

        // Returning cost and order id
        return res.json({
            cost: input ?.cost,
            order_id: order.id
        })

    } catch (error) {
        return next(new HttpError('Internal Server Error', 500));
    }
}

exports.addProduct = addProduct;
exports.get_cost = get_cost;
exports.placeOrder = placeOrder;