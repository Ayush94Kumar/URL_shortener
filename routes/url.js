const express = require('express');
const { handleGenerateNewShortURL, handelredirect, handleAnalytics } = require('../controller/url')
const {restrictToLoggedinUSeronly}=require('../middleware/auth');

const router = express.Router();

router.post("/", restrictToLoggedinUSeronly,handleGenerateNewShortURL);
router.get("/:shortID", handelredirect);
router.get("/analytics/:shortID", handleAnalytics);
router.get("/:shortID", handelredirect);

module.exports = router;