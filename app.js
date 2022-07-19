const express = require('express')
const cors = require('cors')
const app = express();

const scrapeUrl = require('./index')

app.use(express.json())


app.use(cors())

const callMe = (sta) => {
    
    app.get('/',async (req, res) => {
        let data = await scrapeUrl();
        console.log('get method -> ', data)
        console.log(sta)
        res.send(`<a href=${data}>click me to download</a>`)
        
    })
}
app.get('/', (req, res) => {
    res.send('hell is working')
})

// callMe("https://youtu.be/dXjKh66BR2U");

app.post('/ytUrl', async (req, res) => {
    const url = await req.body.url;
    let toDelviery =  await scrapeUrl(url);
    callMe(toDelviery);
//    res.status(200).send(`<a href=${toDelviery}>click me to download</a>`);
   res.status(200).send(toDelviery);

})





app.listen(80 || process.env.PORT, () => { console.log('backend is running at port 80') });