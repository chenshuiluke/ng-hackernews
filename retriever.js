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
          var story = recursivelyGetItem(element);
          storyArray.push(story);
        }

      }
      catch (err) {
        console.log(err);
      }
    }


  });


}

function recursivelyGetItem(itemId) {
  var item = hn.getItem(itemId);
  //console.log("Descendants: " + item.descendants);
  if (item.descendants === 0 || item.descendants === undefined) {
    return item;
  }
  else {
    item.retrieved_kids = [];
    for (var counter = 0; counter < item.kids.length; counter++) {
      console.log("Getting kid of id " + item.kids[counter] + " from parent of id: " + itemId);
      var kid = recursivelyGetItem(item.kids[counter]);
      if (kid != undefined) {
        item.retrieved_kids.push(kid);
      }

      console.log("Got kid of id " + item.kids[counter] + " from parent of id: " + itemId);
    }
    return item;
  }
}

setInterval(retrieveTopPosts, 6000000);

module.exports = retrieveTopPosts();
