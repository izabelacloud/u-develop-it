//importing express
const express = require("express");

//adding PORT
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());


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



//adding PORT listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

