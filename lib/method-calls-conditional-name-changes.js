'use strict';

var _ = require('lodash/fp');
var utils = require('./utils');

var minArgs = _.curry(function (n, p) {
  return p.arguments.length >= n;
});

var condArg = _.curry(function (index, condFn, p) {
  return _.has(['arguments', index], p) &&
    condFn(p.arguments[index]);
});

var removeArg = _.curry(function (index, j, node) {
  node.value.arguments.splice(index, 1);
  return node;
});

var renameTo = _.curry(function (name, j, node) {
  node.get('callee').get('property').replace(j.identifier(name));
});

var methods = [
  {
    name: 'assign',
    conditions: [minArgs(3)],
    actions: [renameTo('assignWith')]
  },
  {
    name: 'clone',
    conditions: [minArgs(2), condArg(1, utils.isLiteral(true))],
    actions: [removeArg(1), renameTo('cloneDeep')]
  },
  {
    name: 'clone',
    conditions: [minArgs(2), condArg(1, utils.isLiteral(false))],
    actions: [removeArg(1)]
  },
  {
    name: 'clone',
    conditions: [minArgs(2)],
    actions: [renameTo('cloneWith')]
  },
  {
    name: 'cloneDeep',
    conditions: [minArgs(2)],
    actions: [renameTo('cloneDeepWith')]
  },
  {
    name: 'isEqual',
    conditions: [minArgs(3)],
    actions: [renameTo('isEqualWith')]
  },
  {
    name: 'isMatch',
    conditions: [minArgs(3)],
    actions: [renameTo('isMatchWith')]
  },
  {
    name: 'max',
    conditions: [minArgs(2)],
    actions: [renameTo('maxBy')]
  },
  {
    name: 'min',
    conditions: [minArgs(2)],
    actions: [renameTo('minBy')]
  }
];

module.exports = function transformer(file, api) {
  var j = api.jscodeshift;
  var ast = j(file.source);

  methods.forEach(function (method) {
    var selector = {
      type: j.CallExpression,
      properties: {
        callee: {
          object: {name: '_'},
          property: {name: method.name}
        }
      }
    };

    utils.migrateMethod(selector, method, j, ast);
  });

  return ast.toSource();
};
