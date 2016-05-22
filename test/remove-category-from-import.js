import plugin from '../lib/remove-category-from-import';
import {testPlugin} from './helpers/jscodeshift-wrapper';

const {test, testUnchanged} = testPlugin(plugin);

test('var chunk = require("lodash/array/chunk")', 'var chunk = require("lodash/chunk")');
test('import "lodash/array/chunk";', 'import "lodash/chunk";');
test('import chunk from "lodash/array/chunk";', 'import chunk from "lodash/chunk";');
test('require("lodash/array/chunk")', 'require("lodash/chunk")');
test('require("lodash/collection/foo")', 'require("lodash/foo")');
test('require("lodash/date/foo")', 'require("lodash/foo")');
test('require("lodash/function/foo")', 'require("lodash/foo")');
test('require("lodash/lang/foo")', 'require("lodash/foo")');
test('require("lodash/math/foo")', 'require("lodash/foo")');
test('require("lodash/number/foo")', 'require("lodash/foo")');
test('require("lodash/object/foo")', 'require("lodash/foo")');
test('require("lodash/string/foo")', 'require("lodash/foo")');
test('require("lodash/utility/foo")', 'require("lodash/foo")');
test('require("lodash/methods/foo")', 'require("lodash/foo")');

testUnchanged('require("lodash")');
testUnchanged('var _ = require("lodash")');
testUnchanged('require("./lodash/array/chunk")');
testUnchanged('require("lodash/fp/chunk")');
testUnchanged('require("foo")');
testUnchanged('require(3)');
testUnchanged('require([])');
testUnchanged('import "foo";');
