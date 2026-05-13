const express=require('express');
const { connectToMongoDB }=require('./connect');
const URL=require('./model/url')

const urlRoute =require("./routes/url");

const app=express();
PORT=8001;
connectToMongoDB("mongodb://127.0.0.1:27017/short_url")
.then(()=>console.log("mongodb connected !"))
.catch(()=>console.log("mongodb connection failed!"));

app.use(express.json());
app.use("/url", urlRoute);

// app.get('/:shortID', async (req,res)=>{

//     const shortID = req.params.shortID;

//     const entry = await URL.findOneAndUpdate(
//         {
//             shortID,
//         },
//         {
//             $push:{
//                 visitHistory:{
//                     timestamp: Date.now(),
//                 }
//             }
//         }
//     );

//     res.redirect(entry.redirectURL);
// });

app.listen(PORT,()=>{console.log(`Server is Running on PORT ${PORT} !`)})