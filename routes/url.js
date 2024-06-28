const router = require('express').Router();
const {handleGenerateNewUrl,handleGetAnalytics } = require('../controllers/url')

router.post('/',handleGenerateNewUrl)
router.get('/analytics/:shortId',handleGetAnalytics)



module.exports = router