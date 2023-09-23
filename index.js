// step 2
const express = require('express')
const app = express()
app.listen(3000)

app.get('/', (req, res) => {
    res.send('OK');
  })

//  // step 3 
//   app.get('/test', (req, res) => {
//     res.status(200).send("ok");
//   })
//  // step 3 
//   app.get('/time',(req, res) => {
    
//     let today=new Date();

//     var time=today.getHours() + ":" + today.getSeconds()

//     res.status(200).send(`${time}`);

//     // res.json({status:200,data:time});

//   })
//  // step 4 
//   app.get('/hello/:Id?/', (req, res) => {
//      let Id = req.params.Id || "souhad";
//      res.status(200).json({status:200, message: "hello",id:Id});
//   //   res.send(req.params)
//   })

// //STEP 4 */ http://localhost:3000/search?s=souhad*/

//   app.get('/search',(req,res) => {
//     if(req.query.s){
//     res.status(200).json({status:200, message: "ok",data:req.query.s});
//     } else 
//      res.status(500).json({status:500, message: "you have to provide a search",error:true});
//   });
//   //step 5 

//   app.use((req, res, next) => {
//     res.setHeader('Content-Type', 'text/html; charset=utf-8');
//     next();
//   });


  const movies = [ { title: 'Jaws', year: 1975, rating: 8 }, 
  { title: 'Avatar', year: 2009, rating: 7.8 },
   { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 } ]

  app.get('/movies/create',(req,res) => {
    res.send('create');

  })
  app.get('/movies/read',(req,res) => {
    res.status(200).json({status:200, data:movies});
  })
  app.get('/movies/update',(req,res) => {
    res.send('update');

  })
  app.get('/movies/delete',(req,res) => {
    res.send('delete');


  })


    //step 6 ORDERED BY  date ( year )
      app.get('/movies/read/by-date',(req,res) => {
       let sort= movies.sort((a, b) => {
       let da = new Date(a.year),
          db = new Date(b.year);
         return da - db;
       });
     res.status(200).json({status:200, data:sort});
    })


    // step 6 ORDERED BY  top rating 
      app.get('/movies/read/by-rating',(req,res) => {
       let sortedbyrating = movies.sort(
       (p1, p2) => (p1.rating < p2.rating) ? 1 : (p1.rating> p2.rating) ? -1 : 0);
       res.status(200).json({status:200, data:sortedbyrating});
         });
  

       //step 6 ORDERED BY  title 
         app.get('/movies/read/by-title',(req,res) => {
         let sortbytitle=movies.sort((a, b) => {
         let ta = a.title.toLowerCase(),
          tb = b.title.toLowerCase();
  
           if (ta < tb) {
          return -1;
         }
          if (ta > tb) {
          return 1;
        }
        return 0;
       });
       res.status(200).json({status:200, data:sortbytitle});
       })

       // step 7 
       app.get('/movies/read/id', (req, res) => {
        if (req.query.id) {
          const index = parseInt(req.query.id);
          const movie = getMovie(index);
      
          if (movie) {
            res.status(200).json({ status: 200, data: movie });
          } else 
            res.status(404).json({ status: 404, message: `The movie ${index} does not exist`, error: true });
      }});
      
      function getMovie(index) {
        const adjustedIndex = index - 1;
        if (adjustedIndex >= 0 && adjustedIndex < movies.length) {
          return movies[adjustedIndex];
        } else {
          return null; 
        }
      }

          //  step 8  // http://localhost:3000/movies/add?title=souhad&year=2003&rating=8
          app.get("/movies/add", (req, res) => {
            // /movies/add?title=Red notice&year=2000&rating=8
            let { title, year, rating } = req.query;
            let newMovie = {
                    title: title,
                    year: year,
                    rating: parseFloat(rating) || 4
                 };
            if (newMovie.year.length !== 4 || isNaN(parseInt(newMovie.year))) {
              res.status(403).json({
                status: 403,
                error: true,
                message:
                  "you cannot create a movie without providing a title and a year",
              });
            }
          
            if (!newMovie.title) {
              return res.status(403).json({
                status: 403,
                error: true,
                message: "You cannot create a movie without providing a title.",
              });
            }
            if (newMovie.title && newMovie.year && newMovie.rating) {
              let newList = movies.push(newMovie);
              res.json(newMovie); 
          
              req.newList = newList; 
              
            }
          });
          app.get("movies/read", (req, res) => {
            const newList = req.newList; 
            res.json(newList);
          });
        