const express = require('express');
const path = require('path')
const app = express();
const PORT = 8001;

const connectToDb = require('./db/connect')
connectToDb('mongodb://localhost:27017/short-url')
.then(()=>console.log('server connected to db'))


const URL = require('./models/url')
const urlRoute = require('./routes/url')

app.set('view engine', 'ejs')
app.set('views',path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('home.ejs')
})
app.get('/api/:shortid',async (req,res)=>{
    const  shortId = req.params.shortid
    console.log(shortId);
    const entry = await URL.findOneAndUpdate({shortId},{$push:{visitHistory:{timestamp:Date.now()}}})
    console.log(entry)
    res.redirect(entry.redirectUrl)
    
})

app.use('/api/url',urlRoute)


app.listen(PORT,()=>{
    console.log(`server run on port ${PORT}`)
})