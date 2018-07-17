/*jshint esversion: 6*/

const yargs = require('yargs');
var inputOpts = {
    demand: true,
    alias: 'a',
    describe: 'Address to fetch weather for',
    string: true // always parse 'a' i.e. address as a string
};
const yargv = yargs
    .options({
        address: inputOpts
    })
    .help()
    .alias('h')
    .argv;

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

// Callback chaining, a good place to use async
geocode.geocodeAddress(yargv.a, (err, res) => {
    if (err){
        console.log(err);
    } else{
        console.log(JSON.stringify(res, undefined, 4));
        weather.getWeather(res.latitude, res.longitude, (err, weatherObj) => {
            if (err){
                console.log(err);
            } else{
                console.log(`Temp: ${weatherObj.temperature}, feels like: ${weatherObj.apparentTemp}`);
            }
        });
    }
});
