'use strict';

var _ = require('lodash/fp');
var utils = require('./utils');

var isByMethod = _.flow(
  _.get('value.callee.property.name'),
  _.endsWith('By')
);

var isByMethodWithFunctionArg = _.curry(function (file, p) {
  if (!isByMethod(p)) {
    return false;
  }
  if (p.value.arguments.length <= 1) {
    return false;
  }
  // All xyzBy methods in v3 had iteratee at index 1
  if (utils.isArgFunction(1, p.value)) {
    return true;
  }

  // There is something at the position of the iteratee that is not a function
  // (maybe an identifier, maybe an expression). Anyway, we can't improve it much,
  // so let's just print a warning in the console.
  var methodName = p.value.callee.property.name;
  var position = [file.path, p.value.loc.start.line, p.value.loc.start.column].join(':');
  console.warn('WARNING: In file `' + position + '`, please check that the iteratee passed to `_.' + methodName + '` only uses its first argument `value`.');
  return false;
});

module.exports = function transformer(file, api) {
  var j = api.jscodeshift;
  var ast = j(file.source);
  ast.find(j.CallExpression, {
    callee: {
      object: {name: '_'}
    }
  })
  .filter(isByMethodWithFunctionArg(file))
  .forEach(function (p) {
    p.value.arguments[1].params = p.value.arguments[1].params.slice(0, 1);
  });

  return ast.toSource();
};
