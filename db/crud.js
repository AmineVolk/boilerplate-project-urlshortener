var mongo = require("mongodb");
var mongoose = require("mongoose");
var uri = process.env.MONGOLAB_URI;
console.log("************ MONGOLAB_URI : " + uri.toString());
const ShortUrl = mongoose.model("Shortlink", { url: String, shortUrl: String });

const getDbConnection = () => {
  return mongoose.connect(uri.toString());
};

const addShortUrl = async (url, shortUrl) => {
  try {
    await getDbConnection();
    console.log(`************ connected`);
    const shortUrlToAdd = new ShortUrl({ url: url, shortUrl: shortUrl });
    await shortUrlToAdd.save();
    console.log(`************ shortUrl saved`);
    return "shortUrl saved";
  } catch (e) {
    console.log(`************ e ${e}`);
    return false;
  }
};
const getShortUrl = url => {};

module.exports = { addShortUrl, getShortUrl };
