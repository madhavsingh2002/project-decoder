
// Create a Product model for an e-commerce platform with essential fields
// including name, description, price, phone, category, quantity,photo and shipping.

const mongoose =  require('mongoose')
const productSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    decription:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
        required:true,
    },
    photo:{
        data:Buffer,
        contentType:String,
    },
    shipping:{
        type: Boolean
    }
    
},
{timestamps:true}
)
// import this.
const ProductModel =  mongoose.model('Products',productSchema)
module.exports= ProductModel; 