const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://user-zero:Globaleader2021@cluster0.qjlgg.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
app.use((req, res, next) => {
    console.log(new Date());

    next();
});
const path = __dirname + "/public"
app.use(express.static(path));

// Serving HTML-file
app.get("/", (req, res) => {
    console.log(path)
    res.sendFile(__dirname + '/index.html');
})
// Handling API-request
app.get("/api", (req, res) => {
 MongoClient.connect(uri, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("sample_airbnb");
        var query = {};
        const result = await dbo.collection("listingsAndReviews").find(query)
    res.send(result)
        });
      });

app.listen(3000, () => {
    console.log("Server running on port " + 3000);

});