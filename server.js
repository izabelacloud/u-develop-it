//importing express
const express = require("express");
//importing sqlite3
const sqlite3 = require("sqlite3").verbose();

//adding PORT
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());



//connect to the database
const db = new sqlite3.Database("./db/election.db", err => {
    if(err) {
        return console.error(err.message);
    }

    console.log("Connected to the election database.");
})


// //get request to test the connection
// app.get("/", (req, res) => {
//     res.json({
//         message: "Hello World!"
//     });
// });


//In the preceding statement, the db object is using the all() method. This method runs the SQL query and executes the callback with all the resulting rows that match the query.
// db.all(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// })


//GET a single candidate
db.get(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    if(err) {
        console.log(err);
    }
    console.log(row);
})



// Get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
    const params = [];
    db.all(sql, params, (err, rows) => {
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





// Delete a candidate
// db.run(`DELETE FROM candidates WHERE id = ?`, 1, function(err, result) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result, this, this.changes);
// });


//Get a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates
                WHERE id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({error: err.message});
            return;
        }


        res.json({
            message: 'success',
            data: row
        })
    })
})


//CREATE a single candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//             VALUES (?,?,?,?)`;
// const params = [1, "Ronald", "Firbank", 1];
// //ES5 function, not arrow function, to use this
// db.run(sql, params, function(err, result) {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result, this.lastID);
// })


//default response for any other request (Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
})



//adding PORT listener // start server after DB connection
db.on("open", () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})


