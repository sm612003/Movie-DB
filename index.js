const express = require('express')
const app = express()
app.listen(3000)

// app.get('/', (req, res) => {
//     res.send('OK');
//   })


//   app.get('/', (req, res) => {
//     res.status(200).json("ok");
//   })

//   app.get('/test', (req, res) => {
//     res.status(200).send("ok");
//   })

  app.get('/time',(req, res) => {
    
    let today=new Date();

    var time=today.getHours() + ":" + today.getSeconds()

    res.status(200).send(`${time}`);

    // res.json({status:200,data:time});

  })