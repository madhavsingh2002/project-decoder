const express =require('express')
const connectToMongodb = require('./config/db.js');
const app =express()
connectToMongodb();
const bcrypt = require('bcryptjs');
const UserModel = require('./models/userModel.js');
app.use(express.json());

// test-endpoints
app.get('/',(req,res)=>{
    res.send('hello world')
})

// User-EndPoints

// Define the registerController as a route handler
app.post("/register", async (req, res) => {
    try {
      const { name, email, password, phone, address } = req.body;
      
      // Validations (You can use a function for this if needed)
      if (!name || !email || !password || !phone || !address ) {
        return res.status(400).json({ message: "All fields are required" });
      }
      
      // Check if the user already exists
      const existingUser = await UserModel.findOne({ email });
  
      if (existingUser) {
        return res.status(200).json({
          success: false,
          message: "User already registered. Please log in.",
        });
      }
  
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Register the user
      const user = await new UserModel({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
        
      }).save();
  
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error in registration",
        error: error.message,
      });
    }
  });





app.listen(8000,()=>{
    console.log('server is running on 8000')
})