import test from 'ava';
import jscodeshift from 'jscodeshift';
import testPlugin from 'jscodeshift-ava-tester';
import codemod from '../lib/remove-category-from-import';

const {testChanged, testUnchanged} = testPlugin(jscodeshift, test, codemod);

testChanged('var chunk = require("lodash/array/chunk")', 'var chunk = require("lodash/chunk")');
testChanged('import "lodash/array/chunk";', 'import "lodash/chunk";');
testChanged('import chunk from "lodash/array/chunk";', 'import chunk from "lodash/chunk";');
testChanged('require("lodash/array/chunk")', 'require("lodash/chunk")');
testChanged('require("lodash/collection/foo")', 'require("lodash/foo")');
testChanged('require("lodash/date/foo")', 'require("lodash/foo")');
testChanged('require("lodash/function/foo")', 'require("lodash/foo")');
testChanged('require("lodash/lang/foo")', 'require("lodash/foo")');
testChanged('require("lodash/math/foo")', 'require("lodash/foo")');
testChanged('require("lodash/number/foo")', 'require("lodash/foo")');
testChanged('require("lodash/object/foo")', 'require("lodash/foo")');
testChanged('require("lodash/string/foo")', 'require("lodash/foo")');
testChanged('require("lodash/utility/foo")', 'require("lodash/foo")');
testChanged('require("lodash/methods/foo")', 'require("lodash/foo")');

testUnchanged('require("lodash")');
testUnchanged('var _ = require("lodash")');
testUnchanged('require("./lodash/array/chunk")');
testUnchanged('require("lodash/fp/chunk")');
testUnchanged('require("foo")');
testUnchanged('require(3)');
testUnchanged('require([])');
testUnchanged('import "foo";');
testUnchanged('import chunk from "lodash/fp/chunk";');
