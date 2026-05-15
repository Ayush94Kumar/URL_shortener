const express = require('express');
const { handleGenerateNewShortURL, handelredirect, handleAnalytics } = require('../controller/url')

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortID", handelredirect);
router.get("/analytics/:shortID", handleAnalytics);
module.exports = router;