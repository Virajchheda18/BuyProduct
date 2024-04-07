const {body} = require('express-validator');

//Request body validations for API - "/api/buy_product/add_product"
const productValidations = () => {

    return [
        body('name')
        .notEmpty().withMessage('name is required')
        .isString().withMessage('Expected name to be a valid string')
        .trim().isLength({
            min: 1
        }).withMessage('name is required'),

        body('cost')
        .notEmpty().withMessage('cost is required')
        .isNumeric().withMessage('Expected cost to be a valid number'),

        body('size')
        .notEmpty().withMessage('size is required')
        .custom(async (size) => {
            let enums = ["S", "M", "L", "XL", "XXL"];
            if (!enums.includes(size)) {
                throw new Error(`Expected size to be: ${enums}`);
            }
        }),

        body('color')
        .notEmpty().withMessage('color is required')
        .custom(async (color) => {
            let enums = ["Red", "Blue", "White", "Black"];
            if (!enums.includes(color)) {
                throw new Error(`Expected color to be: ${enums}`);
            }
        }),
    ]

}

//Request body validations for API - "/api/buy_product/place_order"
const getCostValidations = () => {

    return [
        body('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('Expected string to be valid email'),

        body('product_name')
        .notEmpty().withMessage('product_name is required')
        .isString().withMessage('Expected product_name to be a valid string')
        .trim().isLength({
            min: 1
        }).withMessage('product_name is required'),

        body('size')
        .notEmpty().withMessage('size is required')
        .custom(async (size) => {
            let enums = ["S", "M", "L", "XL", "XXL"];
            if (!enums.includes(size)) {
                throw new Error(`Expected size to be: ${enums}`);
            }
        }),

        body('color')
        .notEmpty().withMessage('color is required')
        .custom(async (color) => {
            let enums = ["Red", "Blue", "White", "Black"];
            if (!enums.includes(color)) {
                throw new Error(`Expected color to be: ${enums}`);
            }
        }),

        body('coupon')
        .if(body('coupon').exists({
            checkNull: false
        }))
        .custom(async (coupon) => {
            let enums = ["FIRST50", "PATRON50", "REPEAT80", null, ""];
            if (!enums.includes(coupon)) {
                throw new Error(`Invalid coupon: ${coupon}`);
            }
        }),
    ]

}

const placeOrderValidations = () => {

    return [
        body('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('Expected string to be valid email'),

        body('product_id')
        .notEmpty().withMessage('product_id is required')
        .isString().withMessage('Expected product_id to be a valid string')
        .trim().isLength({
            min: 1
        }).withMessage('product_id is required'),

        body('cost')
        .notEmpty().withMessage('cost is required')
        .isNumeric().withMessage('Expected string to be valid cost'),

        body('coupon')
        .if(body('coupon').exists())
        .custom(async (coupon) => {
            let enums = ["FIRST50", "PATRON50", "REPEAT80", null, ""];
            if (!enums.includes(coupon)) {
                throw new Error(`Invalid coupon: ${coupon}`);
            }
        }),
    ]

}

exports.productValidations = productValidations;
exports.getCostValidations = getCostValidations;
exports.placeOrderValidations = placeOrderValidations;