/* eslint-disable no-console */
//const request = require('request');
const doRequest = require('../../../interface/asyncRequest');
//const svUrl = 'http://192.168.56.1:8000/';
const svUrl = 'https://achieved-property.glitch.me/';

export default class MymapUserServiceMysql {
  async sendtoUser(userUid) {
    const options = {
      url: svUrl,
      method: "POST",
      timeout: 5000,
      form: { userUid: userUid }
    };
    try {
      await doRequest.doRequest(options);
      return true;
    } catch (error) {
      throw error;
    }
  }

}