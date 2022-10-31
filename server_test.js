const express = require('express');



const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mysql = require('mysql2');
const db = require('./db/connection');


  console.log('1');
  db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
  })
  console.log('2')


app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

//  Default reponse for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`server ji ji ji running on port ${PORT}`)
})