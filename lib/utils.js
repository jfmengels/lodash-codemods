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

var typeOfArgAt = _.curry(function (_index, p) {
  var index = _index >= 0 ? _index : p.arguments.length + _index;
  return _.get(['arguments', index, 'type'], p);
});

function isArgFunction(index, p) {
  return _.flow(
    typeOfArgAt(index),
    _.includes(_, ['FunctionExpression', 'ArrowFunctionExpression'])
  )(p);
}

module.exports = {
  typeOfArgAt: typeOfArgAt,
  migrateMethod: migrateMethod,
  isLiteral: _.curry(isLiteral),
  isArgFunction: _.curry(isArgFunction)
};
