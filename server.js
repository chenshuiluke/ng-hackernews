var http = require("http");
var express = require("express");
var api = require("./server/routes/api");
var logger = require("morgan");
var path = require("path");
var fs = require('fs');
var spawn = require('child_process').spawn;

var child = spawn(__dirname + '/retriever.sh');


child.stdout.on('data', function (data) {
  console.log('story retriever: ' + data);
});

child.on('error', function (err) {
  console.log(err);
  console.log('Failed to start child process.');
});

var app = express();

app.use(logger("short"));

app.use(express.static(path.resolve(__dirname, "dist")));

app.use("/api", api);

app.get("*", function(req, res){
  res.sendFile("dist/index.html");
});

http.createServer(app).listen(3000, function () {
  console.log("Listening on port 3000");
});
