const express = require('express')
const app = express()
app.listen(3000)

app.get('/', (req, res) => {
    res.send('OK');
  })


//   app.get('/', (req, res) => {
//     res.status(200).json("ok");
//   })

  app.get('/test', (req, res) => {
    res.status(200).send("ok");
  })

  app.get('/time',(req, res) => {
    
    let today=new Date();

    var time=today.getHours() + ":" + today.getSeconds()

    res.status(200).send(`${time}`);

    // res.json({status:200,data:time});

  })
 // step 4 
  app.get('/hello/:Id?/', (req, res) => {
     let Id = req.params.Id || "souhad";
     res.status(200).json({status:200, message: "hello",id:Id});
  //   res.send(req.params)
  })

//STEP 4 */ http://localhost:3000/search?s=souhad*/

  app.get('/search',(req,res) => {
    if(req.query.s){
    res.status(200).json({status:200, message: "ok",data:req.query.s});
    } else 
     res.status(500).json({status:500, message: "you have to provide a search",error:true});
  });