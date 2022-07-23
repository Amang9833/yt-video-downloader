const express = require('express')
const cors = require('cors')
const app = express();

const scrapeUrl = require('./index')
const port = process.env.PORT || 5000;

app.use(express.json())


app.use(cors())

// const callMe = (sta) => {
    
//     app.get('/api',async (req, res) => {
//         let data = await scrapeUrl();
//         console.log('get method -> ', data)
//         console.log(sta)
//         res.send(`<a href=${data}>click me to download</a>`)
        
//     })
// }
app.get('/api', (req, res) => {
    res.send('hell is working')
})

// callMe("https://youtu.be/dXjKh66BR2U");

app.post('/ytUrl', async (req, res) => {
    const url = await req.body.url;
    let size = url.length;
    if (size <= 8) {
        res.send('invalid youtube link')
    }
    let toDelviery =  await scrapeUrl(url);
    // callMe(toDelviery);
//    res.status(200).send(`<a href=${toDelviery}>click me to download</a>`);
   res.status(200).send(toDelviery);

})

app.get('/favicon.ico', (req, res) => {
    res.send('')
});

app.get('*', (req, res) => {
    res.send('Wrong page Url')
})



app.listen(port, () => { console.log  (`backend is running at ${port}`) });
