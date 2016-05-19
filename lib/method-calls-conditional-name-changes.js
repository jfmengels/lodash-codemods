'use strict';

var _ = require('lodash/fp');
var utils = require('./utils');

var minArgs = _.curry(function (n, p, isInChain) {
  return p.arguments.length >= n - (isInChain ? 1 : 0);
});

var maxArgs = _.curry(function (n, p, isInChain) {
  return p.arguments.length <= n - (isInChain ? 1 : 0);
});

var condArg = _.curry(function (index, condFn, p, isInChain) {
  return _.has(['arguments', index - (isInChain ? 1 : 0)], p) &&
    condFn(p.arguments[index - (isInChain ? 1 : 0)]);
});

var removeArg = _.curry(function (index, j, node, isInChain) {
  node.value.arguments.splice(index - (isInChain ? 1 : 0), 1);
  return node;
});

var renameTo = _.curry(function (name, j, node, isInChain) { // eslint-disable-line no-unused-vars
  node.get('callee').get('property').replace(j.identifier(name));
});

var methods = [
  {
    name: 'assign',
    conditions: [_.overSome([
      _.overEvery([minArgs(3), utils.isArgFunction(-1)]),
      _.overEvery([minArgs(4), utils.isArgFunction(-2)])
    ])],
    actions: [renameTo('assignWith')]
  },
  {
    name: 'merge',
    conditions: [_.overSome([
      _.overEvery([minArgs(3), utils.isArgFunction(-1)]),
      _.overEvery([minArgs(4), utils.isArgFunction(-2)])
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
    name: 'sum',
    conditions: [minArgs(2)],
    actions: [renameTo('sumBy')]
  },
  {
    name: 'omit',
    conditions: [_.overSome([
      _.overEvery([minArgs(2), utils.isArgFunction(-1)]),
      _.overEvery([minArgs(3), utils.isArgFunction(-2)])
    ])],
    actions: [renameTo('omitBy')]
  },
  {
    name: 'sample',
    conditions: [minArgs(2)],
    actions: [renameTo('sampleSize')]
  },
  {
    name: 'sortedIndex',
    conditions: [minArgs(3)],
    actions: [renameTo('sortedIndexBy')]
  },
  {
    name: 'sortedLastIndex',
    conditions: [minArgs(3)],
    actions: [renameTo('sortedLastIndexBy')]
  },
  {
    name: 'uniq',
    conditions: [minArgs(2), condArg(1, utils.isLiteral(true))],
    actions: [removeArg(1), renameTo('sortedUniq')]
  },
  {
    name: 'uniq',
    conditions: [minArgs(2), condArg(1, utils.isLiteral(false))],
    actions: [removeArg(1)]
  },
  {
    name: 'uniq',
    conditions: [minArgs(2)],
    actions: [renameTo('uniqBy')]
  },
  {
    name: 'sortedUniq',
    conditions: [minArgs(2)],
    actions: [renameTo('sortedUniqBy')]
  },
  {
    name: 'zipObject',
    conditions: [maxArgs(1)],
    actions: [renameTo('fromPairs')]
  },
  {
    name: 'flatten',
    conditions: [minArgs(2), condArg(1, utils.isLiteral(true))],
    actions: [removeArg(1), renameTo('flattenDeep')]
  },
  {
    name: 'flatten',
    conditions: [minArgs(2)],
    actions: [removeArg(1)]
  }
];

function isLodashChain(node) {
  if (node.type === 'CallExpression') {
    if (node.callee.type !== 'Identifier') {
      return isLodashChain(node.callee);
    }
    return node.callee.name === '_';
  }
  if (node.type === 'MemberExpression') {
    if (node.object.type !== 'Identifier') {
      return isLodashChain(node.object);
    }
    return node.object.name === '_' &&
      node.property.type === 'Identifier' &&
      node.property.name === 'chain';
  }
  return false;
}

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

    ast.find(selector.type, {callee: {property: {name: method.name}}})
    .filter(function (p) {
      return isLodashChain(p.value.callee.object);
    })
    .filter(function (p) {
      var conditions = method.conditions || [];
      return conditions.every(function (cond) {
        return cond(p.value, true);
      });
    })
    .forEach(function (p) {
      method.actions.reduce(function (res, action) {
        return action(j, res, true);
      }, p);
    });
  });

  return ast.toSource();
};
