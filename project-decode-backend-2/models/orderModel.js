// Create a Order model for an e-commerce platform with essential fields
// including products, payment, buyer, status.
// NOTE: Refer the Products and Users


const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
  products:[{
    type:mongoose.ObjectId,
    ref: "Products"// here' we refer to the products...
  }],// used [] to store multiple values.
  payment:{},
  buyer:{
    type:mongoose.ObjectId,
    ref:'User'
  },
  status:{
    type:String,
    default: 'Not Process',
    enum: ['Not Process','Processing','shipped','delivered','cancel']
  },


}, {timestamps:true}

);
const OrderModel =  mongoose.model('Orders',OrderSchema)
module.exports =OrderModel;// this is the ordermodel,
// Thank's for watching.....
