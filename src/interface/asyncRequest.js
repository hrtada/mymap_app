const request = require(`request`);

function doRequest(options) {
  return new Promise(function(resolve, reject) {
    request(options, function(error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}
module.exports = {
  doRequest: doRequest
};
