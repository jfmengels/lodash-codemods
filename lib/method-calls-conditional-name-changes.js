'use strict';

function renameMethod(method, j, ast) {
  ast.find(j.CallExpression, {
    callee: {
      object: {name: '_'},
      property: {name: method.prevName}
    }
  })
  .filter(function (p) {
    return method.conditions.every(function (cond) {
      return cond(p.value);
    });
  })
  .forEach(function (p) {
    p.get('callee').get('property').replace(j.identifier(method.newName));
  });
}

function minArgs(n) {
  return function (p) {
    return p.arguments.length >= n;
  };
}

var methods = [
  {prevName: 'assign', newName: 'assignWith', conditions: [minArgs(3)]},
  {prevName: 'clone', newName: 'cloneWith', conditions: [minArgs(2)]},
  {prevName: 'cloneDeep', newName: 'cloneDeepWith', conditions: [minArgs(2)]},
  {prevName: 'isEqual', newName: 'isEqualWith', conditions: [minArgs(3)]},
  {prevName: 'isMatch', newName: 'isMatchWith', conditions: [minArgs(3)]},
  {prevName: 'max', newName: 'maxBy', conditions: [minArgs(2)]},
  {prevName: 'min', newName: 'minBy', conditions: [minArgs(2)]}
];

module.exports = function transformer(file, api) {
  var j = api.jscodeshift;
  var ast = j(file.source);

  methods.forEach(function (method) {
    renameMethod(method, j, ast);
  });

  return ast.toSource();
};
