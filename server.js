"use strict";

var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");
const { isUrlValid } = require("./checkUrlFormat");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// Basic Configuration
var port = process.env.PORT || 3000;

/** this project needs a db !! **/

// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// your first API endpoint...
app.post("/api/shorturl/new", async (req, res) => {
  const newLongUrl = req.body.url;

  let isValid = await isUrlValid(newLongUrl);
  if (isValid) {
    res.json({ message: "success" });
  } else {
    res.json({ error: "invalid URL" });
  }
});

app.listen(port, function() {
  console.log("Node.js listening in " + port);
});
