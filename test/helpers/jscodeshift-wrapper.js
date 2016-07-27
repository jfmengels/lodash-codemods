/* eslint-disable ava/no-ignored-test-files */
'use strict';

function with_(input) {
  return 'var _ = require("lodash"); ' + input;
}

module.exports = {
  with_: with_
};
