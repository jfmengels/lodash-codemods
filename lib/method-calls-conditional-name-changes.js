'use strict';

function migrateMethod(method, j, ast) {
  ast.find(j.CallExpression, {
    callee: {
      object: {name: '_'},
      property: {name: method.name}
    }
  })
  .filter(function (p) {
    return method.conditions.every(function (cond) {
      return cond(p.value);
    });
  })
  .forEach(function (p) {
    method.actions.reduce(function (res, action) {
      return action(j, res);
    }, p);
  });
}

function minArgs(n) {
  return function (p) {
    return p.arguments.length >= n;
  };
}

function condArg(index, condFn) {
  return function (p) {
    return p &&
      p.arguments &&
      Boolean(p.arguments[index]) &&
      condFn(p.arguments[index]);
  };
}

function isLiteral(value) {
  return function (arg) {
    return arg &&
      arg.type === 'Literal' &&
      arg.value === value;
  };
}

function removeArg(index) {
  return function (j, node) {
    node.value.arguments.splice(index, 1);
    return node;
  };
}

function renameTo(name) {
  return function (j, node) {
    node.get('callee').get('property').replace(j.identifier(name));
  };
}

var methods = [
  {
    name: 'assign',
    conditions: [minArgs(3)],
    actions: [renameTo('assignWith')]
  },
  {
    name: 'clone',
    conditions: [minArgs(2), condArg(1, isLiteral(true))],
    actions: [removeArg(1), renameTo('cloneDeep')]
  },
  {
    name: 'clone',
    conditions: [minArgs(2), condArg(1, isLiteral(false))],
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
    migrateMethod(method, j, ast);
  });

  return ast.toSource();
};
