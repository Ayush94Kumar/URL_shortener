const URL = require('../model/url');
const shortid = require('shortid');

async function handleGenerateNewShortURL(req,res) {

    const body = req.body;

    if(!body.url){
        return res.status(400).json({error:"url is required"});
    }

    const shortID = shortid.generate();

    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.json({id: shortID});
}

async function handelredirect(req,res)
{
    const shortID = req.params.shortID;

    const entry = await URL.findOneAndUpdate(
        {
            shortID,
        },
        {
            $push:{
                visitHistory:{
                    timestamp: Date.now(),
                }
            }
        }
    );

    res.redirect(entry.redirectURL);
}

async function handleAnalytics(req,res) {
    const shortID =req.params.shortID;
    const result = await URL.findOne({shortID});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics:result.visitHistory,
    });
}

module.exports = { handleGenerateNewShortURL,handelredirect,handleAnalytics };