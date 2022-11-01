const inputCheck = require('./utils/inputCheck');
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
*/


// Query #1.2   Get all candidates
app.get('/api/candidates', (req, res) => {
    // const sql = `SELECT * FROM candidates`;
    const sql = `SELECT candidates.*, parties.name as party_name
    FROM candidates
    LEFT JOIN parties
    ON candidates.party_id = parties.id`;

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



/*
// Query #2.1    Get a single candidate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    if (err) {
        console.log(err) ;
    } else {
        console.log(row)
    }
  }
)
*/

// Query #2.2    Get a single candidate
// http://localhost:3001/api/candidate/1
// http://localhost:3001/api/candidate/2
// http://localhost:3001/api/candidate/3
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name as party_name
            FROM candidates
            LEFT JOIN parties
            ON candidates.party_id = parties.id 
            WHERE candidates.id = ?`;

    

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
// Query #3.1  DELETE A CANDIDATE
db.query(`DELETE FROM candidates WHERE id = ?`, 1 , (err, row) => {
    if (err) {
        console.log('ERROR!!', err) ;
    } else {
        console.log(row)
    }
  }
)
*/

// Query #3.2  DELETE A CANDIDATE
app.delete('/api/candidate/:id', (req, res) => {

    console.log("ID to DELETE .. " + req.params.id)
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log('BUUUUUUUUUUUUUU')
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

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


// Create a candidate
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    console.log('Got in here')
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    } else {
        ///
        const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
                    VALUES (?,?,?)`;
        const params = [body.first_name, body.last_name, body.industry_connected];

        db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
        });
        ///
    }
  });



// Update a candidate's party
app.put('/api/candidate/:id', (req, res) => {
  const sql = `UPDATE candidates SET party_id = ? 
               WHERE id = ?`;
  const params = [req.body.party_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});


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