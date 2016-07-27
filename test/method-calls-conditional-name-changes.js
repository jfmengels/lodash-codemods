import test from 'ava';
import jscodeshift from 'jscodeshift';
import testPlugin from 'jscodeshift-ava-tester';
import codemod from '../lib/method-calls-conditional-name-changes';
import {with_} from './helpers/jscodeshift-wrapper';

const {testChanged, testUnchanged} = testPlugin(jscodeshift, test, codemod);

testChanged(with_('_.assign(foo, bar, function() {})'), with_('_.assignWith(foo, bar, function() {})'));
testChanged(with_('_.assign(foo, bar, function() {}, this)'), with_('_.assignWith(foo, bar, function() {}, this)'));
testChanged(with_('_.assign(foo, bar, () => {})'), with_('_.assignWith(foo, bar, () => {})'));
testUnchanged(with_('_.assign(foo, bar)'));
testUnchanged(with_('_.assign(foo, bar, baz)'));

testChanged(with_('_.merge(foo, bar, function() {})'), with_('_.mergeWith(foo, bar, function() {})'));
testChanged(with_('_.merge(foo, bar, function() {}, this)'), with_('_.mergeWith(foo, bar, function() {}, this)'));
testChanged(with_('_.merge(foo, bar, () => {})'), with_('_.mergeWith(foo, bar, () => {})'));
testUnchanged(with_('_.merge(foo, bar)'));
testUnchanged(with_('_.merge(foo, bar, baz)'));

testChanged(with_('_.clone(foo, false)'), with_('_.clone(foo)'));
testChanged(with_('_.clone(foo, true)'), with_('_.cloneDeep(foo)'));
testChanged(with_('_.clone(foo, false, customizer)'), with_('_.cloneWith(foo, customizer)'));
testChanged(with_('_.clone(foo, true, customizer)'), with_('_.cloneDeepWith(foo, customizer)'));
testUnchanged(with_('_.clone(foo)'));

testChanged(with_('_.cloneDeep(foo, customizer)'), with_('_.cloneDeepWith(foo, customizer)'));
testUnchanged(with_('_.cloneDeep(foo)'));

testChanged(with_('_.isEqual(foo, bar, customizer)'), with_('_.isEqualWith(foo, bar, customizer)'));
testUnchanged(with_('_.isEqual(foo, bar)'));

testChanged(with_('_.isMatch(foo, bar, customizer)'), with_('_.isMatchWith(foo, bar, customizer)'));
testUnchanged(with_('_.isMatch(foo, bar)'));

testChanged(with_('_.max(foo, iteratee)'), with_('_.maxBy(foo, iteratee)'));
testUnchanged(with_('_.max(foo)'));

testChanged(with_('_.min(foo, iteratee)'), with_('_.minBy(foo, iteratee)'));
testUnchanged(with_('_.min(foo)'));

testChanged(with_('_.sum(foo, iteratee)'), with_('_.sumBy(foo, iteratee)'));
testUnchanged(with_('_.sum(foo)'));

testChanged(with_('_.omit(foo, () => {})'), with_('_.omitBy(foo, () => {})'));
testChanged(with_('_.omit(foo, () => {}, this)'), with_('_.omitBy(foo, () => {}, this)'));
testUnchanged(with_('_.omitBy(foo, "a")'));
testUnchanged(with_('_.omitBy(foo, ["a", "b"])'));

testChanged(with_('_.sample(foo, n)'), with_('_.sampleSize(foo, n)'));
testUnchanged(with_('_.sample(foo)'));

testChanged(with_('_.sortedIndex(foo, bar, iteratee)'), with_('_.sortedIndexBy(foo, bar, iteratee)'));
testChanged(with_('_.sortedIndex(foo, bar, iteratee, this)'), with_('_.sortedIndexBy(foo, bar, iteratee, this)'));
testUnchanged(with_('_.sortedIndex(foo, bar)'));

testChanged(with_('_.sortedLastIndex(foo, bar, iteratee)'), with_('_.sortedLastIndexBy(foo, bar, iteratee)'));
testChanged(with_('_.sortedLastIndex(foo, bar, iteratee, this)'), with_('_.sortedLastIndexBy(foo, bar, iteratee, this)'));
testUnchanged(with_('_.sortedLastIndex(foo, bar)'));

testChanged(with_('_.uniq(foo, false)'), with_('_.uniq(foo)'));
testChanged(with_('_.uniq(foo, true)'), with_('_.sortedUniq(foo)'));
testChanged(with_('_.uniq(foo, false, customizer)'), with_('_.uniqBy(foo, customizer)'));
testChanged(with_('_.uniq(foo, true, customizer)'), with_('_.sortedUniqBy(foo, customizer)'));
testUnchanged(with_('_.uniq(foo)'));

testChanged(with_('_.zipObject(foo)'), with_('_.fromPairs(foo)'));
testChanged(with_('_.object(foo)'), with_('_.fromPairs(foo)'));
testChanged(with_('_.object(foo, bar)'), with_('_.zipObject(foo, bar)'));
testUnchanged(with_('_.zipObject(foo, bar)'));

testChanged(with_('_.flatten(foo, false)'), with_('_.flatten(foo)'));
testChanged(with_('_.flatten(foo, true)'), with_('_.flattenDeep(foo)'));
testUnchanged(with_('_.flatten(foo)'));

testChanged(with_('_.chain(foo).flatten(false)'), with_('_.chain(foo).flatten()'));
testChanged(with_('_.chain(foo).flatten(true)'), with_('_.chain(foo).flattenDeep()'));
testUnchanged(with_('_.chain(foo).flatten()'));

testChanged(with_('_(foo).flatten(false)'), with_('_(foo).flatten()'));
testChanged(with_('_(foo).flatten(true)'), with_('_(foo).flattenDeep()'));
testUnchanged(with_('_(foo).flatten()'));

testUnchanged(with_('a.flatten(foo)'));
testUnchanged(with_('a.chain(foo).flatten()'));
testUnchanged(with_('a(foo).flatten()'));
