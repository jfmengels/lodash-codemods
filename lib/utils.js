'use strict';

var _ = require('lodash/fp');

function migrateMethod(selector, method, j, ast) {
  ast.find(selector.type, selector.properties)
  .filter(function (p) {
    var conditions = method.conditions || [];
    return conditions.every(function (cond) {
      return cond(p.value);
    });
  })
  .forEach(function (p) {
    method.actions.reduce(function (res, action) {
      return action(j, res);
    }, p);
  });
}

function isLiteral(value, arg) {
  return arg &&
    arg.type === 'Literal' &&
    arg.value === value;
}

module.exports = {
  migrateMethod: migrateMethod,
  isLiteral: _.curry(isLiteral)
};
