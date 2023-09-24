// Create a User model for an e-commerce platform with essential fields
// including name, email, password, phone, address, and role.

const mongoose = require('mongoose')
const userSchema =  new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  phone:{
    type:String,
    required:true,
  },
  address:{
    type:String,
    required:true,
  },
  role:{
    type:Number,
    required:true,
    default: 0, // for the user -0, admin -1
  }
})
const UserModel = mongoose.model('User',userSchema)
module.exports= UserModel;
// This is the simple example to create the user model
// Thank's for watching.....



/* 
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
*/
