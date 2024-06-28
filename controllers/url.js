const shortid = require('shortid');
const URL = require('../models/url')

 async function handleGenerateNewUrl(req,res){
    const body = req.body
    console.log('value of body is:',body)
    if(!body.url) return res.status(400).json("url required")

    const shortID = shortid.generate()
    console.log('value of short id is:',shortID)
    await URL.create({
        shortId: shortID,
        redirectUrl:body.url,
        visitHistory:[]
    })
     return res.json({id:shortID})

}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    return res.json({totalClicks:result.visitHistory.length, analytics:result.visitHistory})
}

module.exports= {handleGenerateNewUrl,handleGetAnalytics} 