const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express(); 
const authJwt = require('./helper/jwt.js')

app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
// app.use(authJwt());        
  

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_name,
  api_key: process.env.cloudinary_Config_API_key,    
  api_secret: process.env.cloudinary_Config_API_secret,
  secure: true, 
});

const userRoutes = require('./routes/user.js')
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/products'); 
const ImagesUpload = require("./helper/ImagesUpload")
const cart = require("./routes/carts.js");
const productReview = require('./routes/productReview.js')


app.use('/uploads',express.static("uploads"));
app.use('/api/imageuploads', ImagesUpload);
app.use('/api/categorys',categoryRoutes);
app.use('/api/products',productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cart);
app.use('/api/productReview', productReview)

app.listen(process.env.port,()=>{
    console.log(`Server is running Port ${process.env.port}`)
});

mongoose.connect(process.env.DATABASE_STRING)

const databds = mongoose.connection;
 
databds.on('error',(error)=>{
    console.log(error,"not connnect")
})
databds.once('connected',()=>{
    console.log("Database connected")
})
