const express = require('express');



const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mysql = require('mysql2');
const db = require('./db/connection');


/*
// Query #1.1
db.query(`SELECT * FROM candidates`, (err, rows) => {
console.log(rows);
})
*
// Query #1.2   Get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });
*/

/*
// Query #2.1
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    if (err) {
        console.log(err) ;
    } else {
        console.log(row)
    }
  }
)
*/
// Get a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

/*
// Query #3
db.query(`DELETE FROM candidates WHERE id = ?`, 1 , (err, row) => {
    if (err) {
        console.log('ERROR!!', err) ;
    } else {
        console.log(row)
    }
  }
)
*/

/*
// Query #4:  Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});
*/


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
    console.log(`server running on port ${PORT}`)
})