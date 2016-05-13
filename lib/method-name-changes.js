'use strict';

function renameMethod(name, newName, j, ast) {
  ast.find(j.MemberExpression, {
    object: {name: '_'},
    property: {name: name}
  })
  .forEach(function (p) {
    p.get('property').replace(j.identifier(newName));
  });
}

var nameChanges = [
  {prevName: 'pluck', newName: 'map'},
  {prevName: 'findWhere', newName: 'find'},
  {prevName: 'where', newName: 'filter'},
  {prevName: 'first', newName: 'head'},
  {prevName: 'indexBy', newName: 'keyBy'},
  {prevName: 'invoke', newName: 'invokeMap'},
  {prevName: 'modArgs', newName: 'overArgs'},
  {prevName: 'padLeft', newName: 'padStart'},
  {prevName: 'padRight', newName: 'padEnd'},
  {prevName: 'pairs', newName: 'toPairs'},
  {prevName: 'rest', newName: 'tail'},
  {prevName: 'restParam', newName: 'rest'},
  {prevName: 'sortByOrder', newName: 'orderBy'},
  {prevName: 'trimLeft', newName: 'trimStart'},
  {prevName: 'trimRight', newName: 'trimEnd'},
  {prevName: 'trunc', newName: 'truncate'}
];

module.exports = function transformer(file, api) {
  var j = api.jscodeshift;
  var ast = j(file.source);

  nameChanges.forEach(function (method) {
    renameMethod(method.prevName, method.newName, j, ast);
  });

  return ast.toSource();
};
