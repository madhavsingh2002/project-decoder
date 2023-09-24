// Create a Order model for an e-commerce platform with essential fields
// including products, payment, buyer, status.
// NOTE: Refer the Products and Users

const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema(
    {
      products: [
        {
          type: mongoose.ObjectId,
          ref: "Products",
        },
      ],
      payment: {},
      buyer: {
        type: mongoose.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
      },
    },
    { timestamps: true }
);
const OrderModel = mongoose.model('Orders',orderSchema)
module.exports= OrderModel;

