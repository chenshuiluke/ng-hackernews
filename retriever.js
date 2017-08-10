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

function retrieveTopPosts() {
  console.log("Getting top stories");
  getTop().then(function(response){
    MongoClient.connect(mongo_url, function (err, db) {
      if (err) throw err;
      console.log("Connected to mongodb");
      var storyArray = [];
      var queue = 0;
      var previousReq = null;
      response.forEach(function(element, index, arr){
        try {
          if (index == arr.length - 1) {
            interval = setInterval(function(){
              console.log(storyArray.length + " / " + arr.length);
              if (storyArray.length >= arr.length) {
                storyArray.sort(itemSort);
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
                    clearInterval(interval);
                  });


                });
              }
            }, 5000);

          }
          else {
            //console.log("Getting item: " + index);
            if (queue < 10) {
              queue++;
              recursivelyGetItem(element).then(function (story) {
                storyArray.push(story);
                queue--;
              });
            }
            else {
              var queue_interval = setInterval(function () {
                if (queue < 10) {
                  queue++;
                  recursivelyGetItem(element).then(function (story) {
                    storyArray.push(story);
                    queue--;
                  });
                }
              }, 3000)
            }


          }

        }
        catch (err) {
          console.log("Error " + err);
        }
      });

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
        console.log("Error " + err);
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
        console.log("Error " + err);
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
            if(index == arr.length - 1){
              item.comments.sort(itemSort);
              resolve(item)
            }
          })
            .catch(function(err){
              console.log("Error "+ err);
              reject(err);
            });
        });
      }
    })
      .catch(function(err){
        console.log("Error "+ err);
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


setInterval(retrieveTopPosts, 600000);

module.exports = retrieveTopPosts();
