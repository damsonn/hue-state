#!/usr/bin/env node
var argv = require('optimist')
    .default('interval', 1000)
    .argv;
var HueApi = require("node-hue-api").HueApi;

var api = new HueApi(argv.host, argv.username);


var displayResult = function(result) {
  console.log(JSON.stringify(result, null, 2));
};

// show bridge config
//api.config().then(displayResult).done();

// get small light state
//api.lights()
//    .then(displayResult)
//    .done();

// TODO avoid overloading the bridge, so thinking of something different then interval ( setTimeout after done )
setInterval(function() {
  api.fullState().then(displayResult).done();
}, argv.interval);
