#!/usr/bin/env node
"use strict";
const _ = require('lodash');
const util = require('util');
const rest = require('restler');
const argv = require('optimist')
        .default('interval', 2000)
        .usage('Store your hue lights state and restore them after power off\nUsage: $0 --host [string] --username [string]')
        .demand(['host','username'])
        .argv;

let baseUrl = `http://${argv.host}/api/${argv.username}`
let prevStates = {};

function resetLamp(lampName, state) {
  util.log(`going to reset lamp ${lampName}`);
  // only pick the brithness and hue if present in state
  let updatePayload = _.pick(state, ['bri', 'hue', 'sat']);
  util.log(updatePayload);
  rest.putJson(`${baseUrl}/lights/${lampName}/state`, updatePayload).on('complete', (data, response) => {
    // TODO handle failure
  });
};

function checkStates() {
  rest.get(baseUrl + '/lights').on('complete', result => {
    if (result instanceof Error) {
      util.log('Error:', result.message);
    } else {
      let states = _.mapValues(result, v => v.state);
      // detect a newly reachable lamp
      _.each(states, (state, lampName) => {
        if (state.reachable && prevStates[lampName] && !prevStates[lampName].reachable) {
          resetLamp(lampName, prevStates[lampName]);
        }
      });
      // replace prev states with current
      prevStates = states;
    }
  });
};

util.log('started hue state deamon');
setInterval(checkStates, argv.interval);
