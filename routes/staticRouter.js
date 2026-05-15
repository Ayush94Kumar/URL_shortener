const express =require('express');
const URL = require('../model/url');
const router =express.Router();

router.get("/", async (req,res)=>{
    const allurls =await URL.find({})
    return res.render("home", {
        urls :allurls,
        id: req.query.id // This grabs the ID from the URL if it exists
    });
})

module.exports= router;