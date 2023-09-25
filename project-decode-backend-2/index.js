const express =require('express')
const connectToMongodb = require('./config/db.js');
const app =express()
connectToMongodb();
const bcrypt = require('bcryptjs');
const UserModel = require('./models/userModel.js');
const jwt = require('jsonwebtoken')
const dotenv =require('dotenv')
app.use(express.json());
//configure env
dotenv.config();
// test-endpoints
app.get('/',(req,res)=>{
    res.send('hello world')
})


// Define the JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

/*  User-EndPoints */

// Define the registerController as a route handler

app.post('/register',async(req,res)=>{
  try{
    // take the input 
    const {name, email,password,phone,address} =req.body;// these are the values that we are getting from the user...
    // validations...
    if(!name || !email || !password || !phone || !address){
      return res.status(404).json({message: 'All fields are required'})
    }
    // Checks if user already exist..
    const existingUser = await UserModel.findOne({email})// UserModel is the model that we have create earlier.
    if(existingUser){
      return res.status(200).json({
        success:false,
        message:'User already registered.'
      })
    }
    // Hashed the password...
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password,saltRounds);
    // register the user..
    const user = await new UserModel({
      name,
      email,
      phone,
      address,
      password:hashPassword
    }).save()
    res.status(201).json({
      success:true,
      message:'User successfully registered',
      user

    })
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})



// Define the loginController as a route handler
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if the user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
});


app.listen(8000,()=>{
    console.log('server is running on 8000')
})