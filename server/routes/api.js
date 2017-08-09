var express = require("express");
var hn = require("hackernews-api");
var api = express.Router();

var storyArr = [];
var time = new Date();
api.get("/stories/top", function (req, res) {
  var currentTime = new Date();
  var dateDiff = currentTime.getMinutes() - time.getMinutes();
  if (storyArr.length > 0 && dateDiff < 15) {
    res.send(storyArr);

  }
  else {
    var stories = hn.getTopStories();
    for (var counter = 0; counter <= stories.length; counter++) {
      var element = stories[counter];
      if (counter == stories.length) {
        time = new Date();
        res.send(storyArr);
        return;
      }
      var story = hn.getItem(element);
      storyArr.push(story);
    }
  }
  setInterval(function () {

      var stories = hn.getTopStories();
      var storyArray = [];
      for (var counter = 0; counter <= stories.length; counter++) {
        try {
          var element = stories[counter];
          if (counter == stories.length) {
            time = new Date();
            storyArr = storyArray;
            return;
          }
          var story = hn.getItem(element);
          storyArray.push(story);
        }
        catch (err) {
          console.log(err);
        }
      }

  }, 600000)

});

module.exports = api;
