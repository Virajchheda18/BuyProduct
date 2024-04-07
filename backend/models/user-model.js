const mongoose = require('mongoose');

// Schema for user
const userSchema = new mongoose.Schema({
    id: { type:String , required:true },
    email:{ type:String , required:true },
    order_count: { type:Number , required:true, default: 0 },
    coupons_used: [{ type:String }]
});


module.exports = mongoose.model('user',userSchema);

