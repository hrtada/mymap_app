/* eslint-disable no-console */
const request = require('request');

export default class MymapUserServiceMysql {
    requestTest(userUid) {
        const options = {
          url: "https://airy-quicksand.glitch.me/",
          method: "POST",
          timeout: 5000,
          form: { userUid: userUid }
        };
        request(options, (error, response, body) => {
          console.log(error);
          console.log(response);
          console.log(body);
        });
      }


}