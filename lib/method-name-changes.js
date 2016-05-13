'use strict';

var utils = require('./utils');

function renameTo(name) {
  return function (j, node) {
    node.get('property').replace(j.identifier(name));
  };
}

var methods = [
  {
    name: 'pluck',
    actions: [renameTo('map')]
  },
  {
    name: 'findWhere',
    actions: [renameTo('find')]
  },
  {
    name: 'where',
    actions: [renameTo('filter')]
  },
  {
    name: 'first',
    actions: [renameTo('head')]
  },
  {
    name: 'indexBy',
    actions: [renameTo('keyBy')]
  },
  {
    name: 'invoke',
    actions: [renameTo('invokeMap')]
  },
  {
    name: 'modArgs',
    actions: [renameTo('overArgs')]
  },
  {
    name: 'padLeft',
    actions: [renameTo('padStart')]
  },
  {
    name: 'padRight',
    actions: [renameTo('padEnd')]
  },
  {
    name: 'pairs',
    actions: [renameTo('toPairs')]
  },
  {
    name: 'rest',
    actions: [renameTo('tail')]
  },
  {
    name: 'restParam',
    actions: [renameTo('rest')]
  },
  {
    name: 'sortByOrder',
    actions: [renameTo('orderBy')]
  },
  {
    name: 'trimLeft',
    actions: [renameTo('trimStart')]
  },
  {
    name: 'trimRight',
    actions: [renameTo('trimEnd')]
  },
  {
    name: 'trunc',
    actions: [renameTo('truncate')]
  }
];

module.exports = function transformer(file, api) {
  var j = api.jscodeshift;
  var ast = j(file.source);

  methods.forEach(function (method) {
    var selector = {
      type: j.MemberExpression,
      properties: {
        object: {name: '_'},
        property: {name: method.name}
      }
    };

    utils.migrateMethod(selector, method, j, ast);
  });

  return ast.toSource();
};
