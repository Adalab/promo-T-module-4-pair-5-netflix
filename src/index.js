const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

async function connectDB () {
  const connection = await mysql
  .createConnection({
    host: 'sql.freedb.tech',
    database: 'freedb_netflix_DB',
    user: 'freedb_módulo-4-pair-5',
    password: '7Um5cp%db$dS?Gb'
  })
  await connection.connect();
  console.log(`conexión con ${connection.threadId}`);
  return connection;
};

connectDB();

server.get('/movies', async (req, res) => {
  console.log(req.query);
  const genreFilterParam = req.query.genre;
  const sortFilterParam = req.query.sort;
  let select = ``;
  if (req.query.genre === "All"){
    select = `SELECT * FROM movies ORDER BY title ${sortFilterParam}`;
  } else {
    select = `SELECT * FROM movies WHERE genre=? ORDER BY title ${sortFilterParam}`;
  };
  const connect = await connectDB();
  const [result, cols] = await connect.query(select, [genreFilterParam]);
  console.log(result);
  res.json({
  success: true,
  movies:  result,
  })
  connect.end();
});

server.get('/movie/:movieId', async(req, res) => {
  const movieId= req.params.movieId
  console.log(movieId)
  const select = 'SELECT * FROM movies WHERE id= ?'
  const connect = await connectDB();
  const [result, cols] = await connect.query(select, [parseInt(movieId)]);
  console.log(result);
  res.render('movie', result[0])
  
  connect.end();
});

server.use(express.static('./src/public-react'));
server.use(express.static('./src/public-movies-images'));