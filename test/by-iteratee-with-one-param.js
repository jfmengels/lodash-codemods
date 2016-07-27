import test from 'ava';
import jscodeshift from 'jscodeshift';
import testPlugin from 'jscodeshift-ava-tester';
import codemod from '../lib/by-iteratee-with-one-param';
import {with_} from './helpers/jscodeshift-wrapper';

const {testChanged, testUnchanged} = testPlugin(jscodeshift, test, codemod);

testChanged(with_('_.sortBy(foo, function(a, b) {})'), with_('_.sortBy(foo, function(a) {})'));
testChanged(with_('_.countBy(foo, function(a, b) {})'), with_('_.countBy(foo, function(a) {})'));
testChanged(with_('_.countBy(foo, function(a, b) {}, this)'), with_('_.countBy(foo, function(a) {}, this)'));

testUnchanged(with_('_.sortBy(foo, function() {})'));
testUnchanged(with_('_.sortBy(foo, function(a) {})'));
testUnchanged(with_('_.sortBy(foo, () => {})'));
testUnchanged(with_('_.sortBy(foo, (a) => {})'));
testUnchanged(with_('_.sortBy()'));
testUnchanged(with_('_.sortBy(foo, "key")'));
testUnchanged(with_('_.foo()'));
testUnchanged(with_('_.foo(foo)'));
testUnchanged(with_('_.foo(foo, function(a, b) {})'));

// This can potentially be an error, so it will be reported in the console.
testUnchanged(with_('_.sortBy(foo, bar)'));
