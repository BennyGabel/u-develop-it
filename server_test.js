const express = require('express');



const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mysql = require('mysql2');
const db = require('./db/connection');
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Sql@2022ngin5783',
    database: 'election'
  },
  console.log('Connected to the election database.')
  
  );

  db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
  })

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