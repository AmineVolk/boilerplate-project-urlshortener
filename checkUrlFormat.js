var urlExists = require("url-exists");
const isUrlValid = async url => {
  return new Promise((resolve, reject) => {
    urlExists(url, function(err, exists) {
      if (err != null) {
        reject(err);
      } else {
        resolve(exists);
      }
    });
  });
};
module.exports = { isUrlValid };
