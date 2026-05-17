const express=require('express');
const path =require('path');
const { connectToMongoDB }=require('./connect');
const URL=require('./model/url')

const urlRoute =require("./routes/url");
const staticRoute=require('./routes/staticRouter');
const userRoute=require('./routes/user');

const app=express();
PORT=8001;
connectToMongoDB("mongodb://127.0.0.1:27017/short_url")
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
app.use("/url", urlRoute);
app.use('/', staticRoute);
app.use('/user', userRoute);

app.listen(PORT,()=>{console.log(`Server is Running on PORT ${PORT} !`)})