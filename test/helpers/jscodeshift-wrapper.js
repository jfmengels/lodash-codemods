/* eslint-disable ava/no-ignored-test-files */
'use strict';
var test = require('ava');
var jscodeshift = require('jscodeshift');

function noop() {}

// simulate the fileInfo parameter
function fileInfo(path, source) {
  if (!source) {
    source = path;
    path = 'test.js';
  }

  return {
    path: path,
    source: source
  };
}

// simulate the jscodeshift api
function api() {
  return {
    jscodeshift: jscodeshift,
    stats: noop
  };
}

function runPlugin(plugin, path, source) {
  return plugin(fileInfo(path, source), api());
}

function testPlugin(plugin) {
  return function (input, expected) {
    test(input, t => t.is(runPlugin(plugin, input), expected));
  };
}

module.exports = testPlugin;
