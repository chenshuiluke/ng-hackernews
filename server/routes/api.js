var express = require("express");
var config = require("./../../config");
var MongoClient = require('mongodb').MongoClient;
var api = express.Router();

var storyArr = [];
var time = new Date();


var url = config.mongo_url;

MongoClient.connect(url, function (err, db) {
  if (err) {
    db.close();
    throw err;
  }
  console.log("Database created!");
  db.createCollection("stories", function (err, res) {
    if (err) {
      throw err;
    }
    console.log("Collection created");
    db.close();
  });

});

api.get("/stories/top", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      db.close();
      res.send([]);
      throw err;
    }
    var collection = db.collection("stories");
    collection.find().toArray(function (err, docs) {
      if (err) {
        console.log(err);
        res.send([]);
      }
      else {
        res.send(docs);
      }

    });

  });

});

module.exports = api;
