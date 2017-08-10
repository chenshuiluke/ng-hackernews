module.exports = {
  mongo_url: "mongodb://localhost:27017/ng-hackernews",
  top_stories_url: "https://hacker-news.firebaseio.com/v0/topstories.json",
  story_url: function(id){
    return "https://hacker-news.firebaseio.com/v0/item/" + id + ".json";
  }
};
