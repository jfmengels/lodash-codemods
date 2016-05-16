'use strict';

var _ = require('lodash/fp');

var methodsThisPos = {
  callback: 2,
  clone: 4,
  cloneDeep: 3,
  countBy: 3,
  dropRightWhile: 3,
  dropWhile: 3,
  every: 3,
  filter: 3,
  find: 3,
  findIndex: 3,
  findKey: 3,
  findLast: 3,
  findLastIndex: 3,
  findLastKey: 3,
  forEach: 3,
  forEachRight: 3,
  forIn: 3,
  forInRight: 3,
  forOwn: 3,
  forOwnRight: 3,
  groupBy: 3,
  indexBy: 3,
  isEqual: 4,
  isMatch: 4,
  map: 3,
  mapKeys: 3,
  mapValues: 3,
  max: 3,
  min: 3,
  partition: 3,
  reduce: 4,
  reduceRight: 4,
  reject: 3,
  remove: 3,
  some: 3,
  sortBy: 3,
  sortedIndex: 4,
  sortedLastIndex: 4,
  sum: 3,
  takeRightWhile: 3,
  takeWhile: 3,
  tap: 3,
  thru: 3,
  times: 3,
  transform: 4,
  uniq: 4,
  unzipWith: 3
};

var getName = _.get('value.callee.property.name');

var isMethodWithThisArg = _.flow(
  getName,
  _.includes(_, _.keys(methodsThisPos))
);

module.exports = function transformer(file, api) {
  var j = api.jscodeshift;
  var ast = j(file.source);
  ast.find(j.CallExpression, {
    callee: {
      object: {name: '_'}
    }
  })
  .filter(isMethodWithThisArg)
  .forEach(function (p) {
    var thisPos = methodsThisPos[getName(p)];
    var args = p.value.arguments;
    if (args.length < thisPos) {
      return;
    }
    p.value.arguments = args.slice(0, thisPos - 2).concat([
      j.callExpression(
        j.memberExpression(j.identifier('_'), j.identifier('bind')),
        [args[thisPos - 2], args[thisPos - 1]]
      )
    ]);
  });

  return ast.toSource();
};

// def("CallExpression")
//     .bases("Expression")
//     .build("callee", "arguments")
//     .field("callee", def("Expression"))
//     // See comment for NewExpression above.
//     .field("arguments", [def("Expression")]);
