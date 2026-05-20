const express=require('express');
const path =require('path');
const cookieParser = require('cookie-parser');

const { connectToMongoDB }=require('./connect');
const URL=require('./model/url')
require('dotenv').config();

const urlRoute =require("./routes/url");
const staticRoute=require('./routes/staticRouter');
const userRoute=require('./routes/user');
const {restrictToLoggedinUSeronly,checkAuth}=require("./middleware/auth")

const app=express();
const PORT=8001;

connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/short_url")
.then(()=>console.log("mongodb connected !"))
.catch(()=>console.log("mongodb connection failed!"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))
// app.get("/test", async (req,res)=>{
//     const allUrls =await URL.find({})
//     return res.render('home',{
//         urls:allUrls,
//     });
// });

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUSeronly, urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth ,staticRoute);

app.listen(PORT,()=>{console.log(`Server is Running on PORT ${PORT} !`)})