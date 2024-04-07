const express =  require('express');
const router = express.Router();
const buyProductControllers = require('../controllers/buy-product-controllers');

//Importing API validations
const {productValidations, placeOrderValidations, getCostValidations} = require('../models/validations');

//Route for adding new product
router.post("/add_product", [ productValidations() ], buyProductControllers.addProduct);

// //Route for placing an order
router.post("/get_cost", [ getCostValidations() ], buyProductControllers.get_cost);

//Route for placing an order
router.post("/place_order", [ placeOrderValidations() ], buyProductControllers.placeOrder);

module.exports = router;