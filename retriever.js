var hn = require("hackernews-api");
var config = require("./config");
var MongoClient = require('mongodb').MongoClient;
var axios = require("axios");
var mongo_url = config.mongo_url;
var top_stories_url = config.top_stories_url;
var _ = require("underscore");
var itemSort = function(a,b){
  if(a.kids && b.kids){
    return b.kids.length- a.kids.length;
  }
  else{
    return 0;
  }
};

Promise.each = function (arr, fn) { // take an array and a function
  // invalid input
  if (!Array.isArray(arr)) return Promise.reject(new Error("Non array passed to each"));
  // empty case
  if (arr.length === 0) return Promise.resolve();
  return arr.reduce(function (prev, cur) {
    return prev.then(function () {
      fn(cur)
    })
  }, Promise.resolve());
};

function retrieveTopPosts() {
  console.log("Getting top stories");
  getTop().then(function(response){
    MongoClient.connect(mongo_url, function (err, db) {
      if (err) throw err;
      console.log("Connected to mongodb");
      var storyArray = [];
      var queue = 0;
      var previousReq = null;
      var count = 0;
      var promiseArr = [];

      var refresh = function () {
        storyArray.sort(itemSort);
        time = new Date();

        db.collection("stories").drop(function (err, delOK) {
          if (err) console.log(err);
          if (delOK) console.log("Collection deleted");
          console.log("Updating story collection");
          setTimeout(retrieveTopPosts, 5000);
          db.collection("stories").insertMany(storyArray, {
            ordered: true
          }, function (err, db) {
            console.log(err);
            db.close();
            storyArray = [];
            console.log("Stories updated");
            clearInterval(interval);

          });
        });
      };

      response.reduce(function (accumulated, current, index) {
          return accumulated.then(function (story) {
            if (story) {
              storyArray.push(story);
            }
            console.log("Getting " + current);

            return recursivelyGetItem(current)
          })
        },
        Promise.resolve())
        .then(refresh)
        .catch(refresh);
    });
  });
}

function getTop(){
  return new Promise(function(resolve, reject){
    axios.get(top_stories_url)
      .then(function(response){
        console.log(response.data);
        resolve(response.data);
      })
      .catch(function(err){
        console.log("Get Top Error " + err);
        reject(err);
      });

  });
}

function getItem(id){
  return new Promise(function(resolve, reject){
    axios.get(config.story_url(id))
      .then(function(response){
        //console.log("Got item " + id);
        resolve(response.data);
      })
      .catch(function(err){
        console.log("Get Item Error " + err);
        reject(err);
      });

  });
}

function recursivelyGetItem(itemId) {
  return new Promise(function(resolve, reject){
    getItem(itemId).then(function(item){
      if (!item.kids) {
        resolve(item);
      }
      else {
        item.comments = [];
        item.kids.forEach(function(item_kid, index, arr){

          //console.log("Getting kid of id " + item_kid + " from parent of id: " + itemId);
          recursivelyGetItem(item.kids[index]).then(function(kid){
            if (kid != undefined) {
              item.comments.push(kid);
            }

            //console.log("Got kid of id " + item.kids[index] + " from parent of id: " + itemId);
            if (index == arr.length - 1) {
              item.comments.sort(itemSort);
              resolve(item)
            }
          })
            .catch(function(err){
              console.log("Get Children Error " + err);
              reject(err);
            });
        });
      }
    })
      .catch(function(err){
        console.log("Recursive Item Error " + err);
        reject(err);
      });
  })

  //console.log("Descendants: " + item.descendants);

}

process.on( 'unhandledRejection', function( error, promise ){
  console.log('UPR: ' + promise + ' with ' + error);
  console.log("err: " + error);
console.log( error.stack )
});


module.exports = retrieveTopPosts();
