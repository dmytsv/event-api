const path = require("path");
var ObjectID = require("mongodb").ObjectID;

module.exports = function(app, db) {
  const eventsCollection = db.collection("events");

  //   index route
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/../index.html"));
  });

  // get all events
  app.get("/api/events/", (req, res) => {
    eventsCollection.find({}).toArray((err, events) => {
      if (err) {
        res.send({ error: "An error has occured" });
      } else {
        res.send(events || { error: "No events in database" });
      }
    });
  });

  // one event
  app.get("/api/events/:id", (req, res) => {
    const query = { _id: new ObjectID(req.params.id) };

    eventsCollection.findOne(query, (err, item) => {
      if (err) {
        res.send({ error: "An error has occured" });
      } else {
        res.send(item || { error: "No event with this ID in database" });
      }
    });
  });

  app.post("/api/events", (req, res) => {
    const { name, location } = req.body;
    eventsCollection.insert({ name, location }, (err, result) => {
      if (err) {
        res.send({ error: "An error has occured" });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.patch("/api/events/:id", (req, res) => {
    const { name, location } = req.body;
    const id = req.params.id;
    const query = { _id: new ObjectID(id) };
    eventsCollection.update(query, { name, location }, (err, result) => {
      if (err) {
        res.send({ error: "An error has occured" });
      } else {
        res.send(result);
      }
    });
  });

  app.delete("/api/events/:id", (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectID(id) };

    eventsCollection.remove(query, (err, item) => {
      if (err) {
        res.send({ error: "An error has occured" });
      } else {
        res.send(`Note ${id} deleted!`);
      }
    });
  });
}; // end exports
