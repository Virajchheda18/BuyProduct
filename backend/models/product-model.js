const mongoose = require('mongoose');

// Schema for product
const productSchema = new mongoose.Schema({
    id:{ type:String , required:true },
    name:{ type:String , required:true },
    size:{ type:String , required:true, enum: ["S", "M", "L", "XL", "XXL"] },
    color:{ type:String , required:true, enum:["Red", "Blue", "White", "Black"] },
    cost: { type:Number , required:true }
});


module.exports = mongoose.model('product',productSchema);

