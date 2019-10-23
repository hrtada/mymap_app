/* eslint-disable no-console */
const request = require('request');

export default class MymapUserServiceMysql {
  sendtoUser(userUid) {
    const options = {
      url: "http://192.168.56.1:8000/",
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