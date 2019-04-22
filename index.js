const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const app = express();

const { mongoURI } = require("./config");
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

MongoClient.connect(mongoURI, (err, database) => {
  if (err) return console.log(err);

  const db = database.db("event-api");
  require("./routes")(app, database);
  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
});
