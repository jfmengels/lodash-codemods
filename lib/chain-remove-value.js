'use strict';

var _ = require('lodash/fp');

var endingMethods = [
  'times',
  'forEach', 'forEachRight',
  'each', 'eachRight',
  'forIn', 'forInRight',
  'forOwn', 'forOwnRight'
];

function isChainEndingMethod(node) {
  return _.contains(node.value.callee.object.callee.property.name, endingMethods);
}

function isLodash(node) {
  return node.type === 'Identifier' && node.name === '_';
}

function isLodashChain(node) {
  if (isLodash(node)) {
    return true;
  }
  if (node.type === 'CallExpression') {
    return isLodashChain(node.callee);
  }
  if (node.type === 'MemberExpression') {
    if (isLodash(node.object)) {
      return node.property.type === 'Identifier' && node.property.name === 'chain';
    }
    return isLodashChain(node.object);
  }
  return false;
}

module.exports = function transformer(file, api) {
  var j = api.jscodeshift;
  var ast = j(file.source);
  ast.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      property: {
        name: 'value'
      },
      object: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          property: {
            type: 'Identifier'
          }
        }
      }
    }
  })
  .filter(isChainEndingMethod)
  .filter(function (p) {
    if (isLodashChain(p.value.callee)) {
      return true;
    }

    // This looks like a Lodash method call, but we can't be sure it is or isn't a Lodash chain.
    // so let's just print a warning in the console.
    var position = [file.path, p.value.loc.start.line, p.value.loc.start.column].join(':');
    console.warn(
      'WARNING: In file `' + position +
      '`, please check that the object calling `value()` is not a Lodash chain. If it is, please remove the call to `value()`, as calls to `' +
      endingMethods.join(', ') +
      '` now end the chain. See bulletpoint 3 of https://github.com/lodash/lodash/wiki/Changelog#jan-12-2016--diff--docs'
    );
    return false;
  })
  .replaceWith(function (p) {
    return p.value.callee.object;
  });

  return ast.toSource();
};
