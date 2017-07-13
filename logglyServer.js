
console.log('Loading winston backend for Loggly');

if (!Meteor.settings.loggly) {
  console.error("Loggly not found in settings.json");
  return;
}

import './imports/logglyMeteorMethods.js';
import winston from 'winston';

/**
 * Basic setup of Loggly class
 */

const Loggly = function(options) {
  this.client = winston;
};

/**
 * Native wrapper for log method - just pass the arguments
 */
Loggly.prototype.log = function (param, tag) {
  this.client.log(param, tag);
};

/**
 * Set of useful methods to log with the tag
 *
 * @example: Loggly.warn("error message") will add tag `warn` to the `error message`
 */

Loggly.prototype._applyArguments = function (args, tag) {
  if (args && args.length === 1) {
    this.client.log(args[0], tag);
  } else {
    this.client.log(args, tag);
  }
};

Loggly.prototype.trace = function () {
  this._applyArguments(arguments, 'trace');
};

Loggly.prototype.info = function () {
  this._applyArguments(arguments, 'info');
};

Loggly.prototype.warn = function () {
  this._applyArguments(arguments, 'warn');
};

Loggly.prototype.error = function () {
  this._applyArguments(arguments, 'error');
};

/**
 * Logger export
 */

export default const Logger = new Loggly(Meteor.settings.loggly);
