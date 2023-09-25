// Create a Category model for an e-commerce platform with essential fields
// including name, slug.

// This is the problem statement...
// we have build the product, order, user model so far..
// now let's build the category modelllll.
// It's quite simple .
const mongoose = require('mongoose')
const categorySchema =  new mongoose.Schema({
    name:{
      type:String,
      required:true,
      unique:true,
    },
    slug:{
      type:String,
      lowercase: true,
    }
})
// now import this...,// this is the simple way to create the category model 
// for the ecommerce.....
const CategoryModel = mongoose.model('Category',categorySchema)
module.exports =CategoryModel; 