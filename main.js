#!/usr/bin/env node
"use strict";
const _ = require('lodash');
const rest = require('restler');
const argv = require('optimist')
    .default('interval', 1000)
    .argv;

let baseUrl = `http://${argv.host}/api/${argv.username}`
let currentStates = {};


rest.get(baseUrl + '/lights').on('complete', result => {
  if (result instanceof Error) {
    console.log('Error:', result.message);
  } else {
    let newStates = _.mapValues(result, v => v.state);
    //let newStates = _.map(result, (v, k) => { return { name : k, state: v.state } });
    console.log(newStates);
  }
});

// TODO avoid overloading the bridge, so thinking of something different then interval ( setTimeout on done )
// setInterval(function() {
//   api.fullState().then(displayResult).done();
// }, argv.interval);
