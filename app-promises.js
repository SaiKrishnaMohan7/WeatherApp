/*jshint esversion: 6*/
const axios = require('axios');
const yargs = require('yargs');
var inputOpts = {
    demand: true,
    alias: 'a',
    describe: 'Address to fetch weather for',
    string: true
};
const yargv = yargs
    .options({
        address: inputOpts
    })
    .help()
    .alias('h')
    .argv;
const key = process.env.API_KEY;
const darkKey = process.env.DARK_KEY;
var encodedAddress = encodeURIComponent(yargv.a);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`;

// axios call
axios.get(geocodeURL).then((response) => {
    if(response.data.status === 'ZERO_RESULTS')
        throw new Error('Unable to find address');

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/${darkKey}/${lat},${lng}`;

    return axios.get(weatherURL);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemp = response.data.currently.apparentTemperature;
    console.log(`Temp: ${weatherObj.temperature}, feels like: ${weatherObj.apparentTemp}`);
}).catch((error) => {
    if(error.code === 'ENOTFOUND')
        console.log('Can\'t connect to source');
    console.log(error.message);
});