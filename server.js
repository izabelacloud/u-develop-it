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


