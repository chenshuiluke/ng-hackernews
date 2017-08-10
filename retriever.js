var hn = require("hackernews-api");
var config = require("./config");
var MongoClient = require('mongodb').MongoClient;

var url = config.mongo_url;

function retrieveTopPosts() {
  console.log("Getting top stories");
  var stories = hn.getTopStories();
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Connected to mongodb");
    var storyArray = [];
    for (var counter = 0; counter <= stories.length; counter++) {
      try {
        var element = stories[counter];
        if (counter == stories.length) {
          time = new Date();

          db.collection("stories").drop(function (err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection deleted");
            console.log("Updating story collection");

            db.collection("stories").insertMany(storyArray, {
              ordered: true
            }, function (err, db) {
              db.close();
              storyArray = [];
              console.log("Stories updated");
            });


          });
        }
        else {
          console.log("Getting item: " + counter);
          var story = hn.getItem(element);
          storyArray.push(story);
        }

      }
      catch (err) {
        console.log(err);
      }
    }


  });


}

setInterval(retrieveTopPosts, 600000);

module.exports = retrieveTopPosts();
