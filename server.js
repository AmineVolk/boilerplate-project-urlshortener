"use strict";
require("dotenv").config();
var express = require("express");
const shortid = require("shortid");
const { isUrlValid } = require("./checkUrlFormat");
const { addShortUrl, getShortUrl } = require("./db/crud");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
var port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(process.cwd() + "/public"));
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl/new", async (req, res) => {
  const newLongUrl = req.body.url;

  let isValid = await isUrlValid(newLongUrl);
  if (isValid) {
    let shortUrl = shortid.generate();
    let saveResult = await addShortUrl(newLongUrl, shortUrl);
    if (saveResult == "shortUrl saved") {
      res.status(200).json({ original_url: newLongUrl, short_url: shortUrl });
    } else {
      res.json({ error: saveResult });
    }
  } else {
    res.status(400).json({ error: "invalid URL" });
  }
});

app.get("/api/shorturl/:shortUrl", async (req, res) => {
  let shortUrl = req.params.shortUrl;
  let getShortUrlResult = await getShortUrl(shortUrl);
  if (getShortUrlResult != "Error") {
    let url = getShortUrlResult.url;
    res.redirect(url);
  }
});

app.listen(port, function() {
  console.log("Node.js listening in " + port);
});
