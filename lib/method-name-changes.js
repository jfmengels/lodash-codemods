'use strict';

function renameMethod(name, newName, j, ast) {
  ast.find(j.CallExpression, {
    callee: {
      object: {name: '_'},
      property: {name: name}
    }
  })
  .forEach(function (p) {
    p.get('callee').get('property').replace(j.identifier(newName));
  });
}

var nameChanges = [
  {prevName: 'pluck', newName: 'map'},
  {prevName: 'findWhere', newName: 'find'},
  {prevName: 'where', newName: 'filter'}
];

module.exports = function transformer(file, api) {
  var j = api.jscodeshift;
  var ast = j(file.source);

  nameChanges.forEach(function (method) {
    renameMethod(method.prevName, method.newName, j, ast);
  });

  return ast.toSource();
};
