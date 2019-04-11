var mongo = require("mongodb");
var mongoose = require("mongoose");
var uri = process.env.MONGOLAB_URI;
console.log("************ MONGOLAB_URI : " + uri.toString());
const ShortUrl = mongoose.model("Shortlink", { url: String, shortUrl: String });

let connection;

const getDbConnection = () => {
  if (!connection) {
    connection = mongoose.connect(uri.toString(), { useNewUrlParser: true });
  }
  return connection;
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
const getShortUrl = async shortUrl => {
  let result;
  await getDbConnection();
  await ShortUrl.find({ shortUrl: shortUrl }, (err, data) => {
    if (err) {
      console.log(`************ error in getShortUrl ${e}`);
      return "Error";
    } else {
      result = data;
    }
  });

  return result[0];
};

module.exports = { addShortUrl, getShortUrl };
