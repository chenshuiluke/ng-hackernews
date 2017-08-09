var http = require("http");
var express = require("express");
var api = require("./server/routes/api");
var logger = require("morgan");
var app = express();

app.use(logger("short"));
app.use("/api", api);

http.createServer(app).listen(3000, function () {
  console.log("Listening on port 3000");
});
