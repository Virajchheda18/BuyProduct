const mongoose = require('mongoose');

// Schema for order
const orderSchema = new mongoose.Schema({
    id: { type:String , required:true },
    product_id:{ type:String , required:true },
    user_id: { type:String , required:true }
});


module.exports = mongoose.model('order',orderSchema);

