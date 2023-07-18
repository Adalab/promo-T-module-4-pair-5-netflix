const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
// create and config server
const server = express();
server.use(cors());
server.use(express.json());

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
  if (req.query.genre === "All"){
    const select = `SELECT * FROM movies`;
    console.log('hola')
  } else {
    const select = `SELECT * FROM movies WHERE genre=?`;
    const connect = await connectDB();
    const [result, cols] = await connect.query(select, [req.query.genre]);
    console.log(result);
    connect.end();
    res.json({
    success: true,
    movies:  result
  });
  }
});

server.use(express.static('./src/public-react'));
server.use(express.static('./src/public-movies-images'));