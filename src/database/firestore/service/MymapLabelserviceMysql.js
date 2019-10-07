/* eslint-disable no-console */

const request = require('request');

export default class MymapLabelService {

//ラベルの取得
getLabel(){
    let mapLabels = [];
    const option = {
        url: 'https://airy-quicksand.glitch.me/label',
        method: 'GET',
        json: true
    }
    request(option, function (error, res, body) {
        for(let i=0; i<body.length; i++){
            mapLabels.push({id:body[i].labelId, name:body[i].labelName});
        }
    });
    return(mapLabels);  
}


}