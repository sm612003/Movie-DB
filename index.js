//step 2
const express = require('express')
const app = express()
app.listen(3000)

app.get('/', (req, res) => {
    res.send('OK');
  })

 // step 3 
  app.get('/test', (req, res) => {
    res.status(200).send("ok");
  })
 // step 3 
  app.get('/time',(req, res) => {
    
    let today=new Date();

    var time=today.getHours() + ":" + today.getSeconds()

    res.status(200).send(`${time}`);

    res.json({status:200,data:time});

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
  //step 5 
// used for the arabic word 
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    next();
  });


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

          // step 8  // http://localhost:3000/movies/add?title=souhad&year=2003&rating=8
          app.get("/movies/add", (req, res) => {
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
        

           //step 9 
           app.get('/movies/delete/:id', (req, res) => {
            const idToDelete = parseInt(req.params.id);
          
            
            // Find the index of the movie to delete
            const indexToDelete = idToDelete - 1;
          
            if (indexToDelete >= 0 && indexToDelete < movies.length) {
              // Use splice to remove the movie from the array
              movies.splice(indexToDelete, 1);
          
              res.status(200).json({ status: 200, message: `Movie with ID ${idToDelete} deleted.`, data:movies});
            } else {
              res.status(404).json({ status: 404, message: `Movie with ID ${idToDelete} not found.`, error: true });
            }
          });
          



  //step 10 
  //http://localhost:3000/movies/update/1?title=souhad&rating=5
  app.get('/movies/update/:id', (req, res) => {
    const Id = req.params.id;
    const newTitle = req.query.title;
    const newRating = req.query.rating;
    const newYear = req.query.year;
    const indexToUpdate = Id - 1;
  
    if (indexToUpdate >= 0 && indexToUpdate < movies.length) {
      // Update the movie's title if provided
      if (newTitle) {
        movies[indexToUpdate].title = newTitle;
      }
  
      // Update the movie's rating if provided
      if (newRating) {
        movies[indexToUpdate].rating = newRating;
      }
  
      // Update the movie's year if provided
      if (newYear) {
        movies[indexToUpdate].year=newYear;
      }
  
      res.status(200).json({ status: 200, data: movies });
    } else {
      res.status(404).json({ status: 404, message: `Movie with ID ${Id} not found.`, error: true });
    }
  });


 //step 11 with post ( create in step 8)

// const express = require("express");
const bodyParser = require("body-parser");
// const app = express();

app.use(bodyParser.json());
// Route to create a new movie using POST
app.post("/movies/add", (req, res) => {
  const { title, year, rating } = req.body; //instead of using req.query we have to use req.body with post 

  if (!title || !year) {
    res.status(400).json({
      status: 400,
      error: true,
      message: "You must provide a title and a year to create a movie.",
    });
    return;
  }

  if (year.length !== 4 || isNaN(parseInt(year))) {
    res.status(400).json({
      status: 400,
      error: true,
      message: "Year should be a four-digit number.",
    });
    return;
  }

  const newMovie = {
    title: title,
    year: year,
    rating: parseFloat(rating) || 4,
  };

  movies.push(newMovie);

  res.status(201).json({
    status: 201,
    error: false,
    message: "Movie created successfully.",
    movie: newMovie,
  });
});

// Route to read the list of movies
app.get("/movies/read", (req, res) => {
  res.json(movies);
});



//step 11 with delete ( step 9)
app.delete('/movies/delete/:id', (req, res) => {
  const idToDelete = parseInt(req.params.id);

  
  // Find the index of the movie to delete
  const indexToDelete = idToDelete - 1;

  if (indexToDelete >= 0 && indexToDelete < movies.length) {
    // Use splice to remove the movie from the array
    movies.splice(indexToDelete, 1);

    res.status(200).json({ status: 200, message: `Movie with ID ${idToDelete} deleted.`, data:movies});
  } else {
    res.status(404).json({ status: 404, message: `Movie with ID ${idToDelete} not found.`, error: true });
  }
});
     //step 11 with put ( update in step 10)

     app.put('/movies/update/:id', (req, res) => {
      const Id = parseInt(req.params.id); 
      const indexToUpdate = Id - 1;
      const newmovie = req.body;
    
      if (indexToUpdate >= 0 && indexToUpdate < movies.length) {
        const movieToUpdate = movies[indexToUpdate];

        // Update the movie's title if provided
        if (newmovie.title) {
          movieToUpdate.title = newmovie.title;
        }
    
        // Update the movie's rating if provided
        if (newmovie.rating) {
          movieToUpdate.rating = newmovie.rating;
        }
    
        // Update the movie's year if provided
        if (newmovie.year) {
          movieToUpdate.year = newmovie.year;
        }
    
        res.status(200).json({ status: 200, data: movies });
      } else {
        res.status(404).json({ status: 404, message: `Movie with ID ${Id} not found.`, error: true });
      }
    });