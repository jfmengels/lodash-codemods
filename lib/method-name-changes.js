'use strict';

var _ = require('lodash/fp');
var utils = require('./utils');

function renameTo(name) {
  return function (j, node) {
    node.get('property').replace(j.identifier(name));
  };
}

var renames = {
  all: 'every',
  any: 'some',
  backflow: 'flowRight',
  callback: 'iteratee',
  collect: 'map',
  compose: 'flowRight',
  contains: 'includes',
  detect: 'find',
  findWhere: 'find',
  first: 'head',
  foldl: 'reduce',
  foldr: 'reduceRight',
  include: 'includes',
  indexBy: 'keyBy',
  inject: 'reduce',
  invoke: 'invokeMap',
  methods: 'functions',
  modArgs: 'overArgs',
  object: 'fromPairs',
  padLeft: 'padStart',
  padRight: 'padEnd',
  pairs: 'toPairs',
  pluck: 'map',
  rest: 'tail',
  restParam: 'rest',
  select: 'filter',
  sortByAll: 'sortBy',
  sortByOrder: 'orderBy',
  trimLeft: 'trimStart',
  trimRight: 'trimEnd',
  trunc: 'truncate',
  unique: 'uniq',
  where: 'filter'
};

var methods = _.toPairs(renames).map(function (pair) {
  return {
    name: pair[0],
    actions: [renameTo(pair[1])]
  };
});

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
