/*jshint esversion: 6*/

const request = require('request');
const darkKey = process.env.DARK_KEY;

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${darkKey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemp: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather');
        }
    });
};

module.exports = {
    getWeather
};