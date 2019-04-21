const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const app = express();

const { mongoURI } = require("./config");
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(mongoURI, (err, database) => {
  if (err) return console.log(err);

  const db = database.db("event-api");
  require("./routes")(app, database);
  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
});
