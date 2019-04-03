// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("../config/connection.js");

// Routes
// =============================================================
module.exports = function(app) {
  app.get("/api/all", function(req, res) {
    var dbQuery = "SELECT * FROM stories";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get("/api/finished", function(req, res) {
    var dbQuery = "SELECT * FROM stories WHERE storyCount=9 ORDER BY RAND() LIMIT 1";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });


  app.get("/api/unfinished/", function(req, res) {
    var dbQuery = "SELECT * FROM stories WHERE storyCount<9 ORDER BY RAND() LIMIT 1";
    // console.log(dbQuery)
    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });


  // Add a story
  app.post("/api/new", function(req, res) {
    console.log("New Story:");
    console.log(req.body);

    var dbQuery = "INSERT INTO stories (mainText, recentText, mature, storyCount) VALUES (?,?,?,?)";

    connection.query(dbQuery, [req.body.newStory, req.body.newStory, req.body.mature, 0], function(err, result) {
      if (err) throw err;
      console.log("Story Successfully Saved!");
      res.end();
    });
  });

  app.put("/api/update", function(req, res) {
    console.log("New Story:");
    console.log(req.body);

    var dbQuery = "UPDATE stories SET mainText = CONCAT(mainText,' [.] ',?), recentText = ?, storyCount = ? WHERE id = ?";

    connection.query(dbQuery, [req.body.recentText, req.body.recentText, req.body.storyCount, req.body.id], function(err, result) {
      if (err) throw err;
      console.log("Story Successfully Updated!");
      res.end();
    });
  });


};
