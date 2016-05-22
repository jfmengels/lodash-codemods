'use strict';

var _ = require('lodash/fp');

var lodashRegex = /^(lodash\/)\w+\/(\w+)$/;

module.exports = function transformer(file, api) {
  var j = api.jscodeshift;
  var ast = j(file.source);
  ast.find(j.CallExpression, {
    callee: {name: 'require'}
  })
  .forEach(function (p) {
    var arg = _.get(['value', 'arguments', 0], p);
    if (arg.type !== 'Literal') {
      return;
    }
    var regRes = lodashRegex.exec(arg.value);
    if (!regRes || _.startsWith('lodash/fp', arg.value)) {
      return;
    }
    p.get('arguments').get(0).replace(j.literal(regRes[1] + regRes[2]));
  });

  ast.find(j.ImportDeclaration, {})
  .forEach(function (p) {
    var source = p.value.source.value;
    var regRes = lodashRegex.exec(source);
    if (!regRes) {
      return;
    }
    p.get('source').replace(j.literal(regRes[1] + regRes[2]));
  });

  return ast.toSource();
};
