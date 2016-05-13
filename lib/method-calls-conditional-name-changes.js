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

var isArgFunction = _.curry(function (_index, p) {
  var index = _index >= 0 ? _index : p.arguments.length + _index;
  return _.flow(
    _.get(['arguments', index, 'type']),
    _.includes(_, ['FunctionExpression', 'ArrowFunctionExpression'])
  )(p);
});

var methods = [
  {
    name: 'assign',
    conditions: [_.overSome([
      _.overEvery([minArgs(3), isArgFunction(-1)]),
      _.overEvery([minArgs(4), isArgFunction(-2)])
    ])],
    actions: [renameTo('assignWith')]
  },
  {
    name: 'merge',
    conditions: [_.overSome([
      _.overEvery([minArgs(3), isArgFunction(-1)]),
      _.overEvery([minArgs(4), isArgFunction(-2)])
    ])],
    actions: [renameTo('mergeWith')]
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
  },
  {
    name: 'omit',
    conditions: [_.overSome([
      _.overEvery([minArgs(2), isArgFunction(-1)]),
      _.overEvery([minArgs(3), isArgFunction(-2)])
    ])],
    actions: [renameTo('omitBy')]
  },
  {
    name: 'sample',
    conditions: [minArgs(2)],
    actions: [renameTo('sampleSize')]
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
