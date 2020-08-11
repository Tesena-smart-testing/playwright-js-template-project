/**
 * Devices module.
 * @module Devices
 * @requires playwright.devices
 */

const devices = require("playwright").devices;

/**
 * Devices selected from playwright list of mobile devices available for browser emulation
 * @constant
 * @memberof Devices
 */
const devicesToTest = {
  "Galaxy S5": devices["Galaxy S5"],
  "Galaxy S5 landscape": devices["Galaxy S5 landscape"],
  "iPhone X": devices["iPhone X"],
  "iPhone X landscape": devices["iPhone X landscape"],
};
module.exports = devicesToTest;
