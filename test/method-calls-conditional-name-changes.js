import plugin from '../lib/method-calls-conditional-name-changes';
import {testPlugin, with_} from './helpers/jscodeshift-wrapper';

const {test, testUnchanged} = testPlugin(plugin);

test(with_('_.assign(foo, bar, function() {})'), with_('_.assignWith(foo, bar, function() {})'));
test(with_('_.assign(foo, bar, function() {}, this)'), with_('_.assignWith(foo, bar, function() {}, this)'));
test(with_('_.assign(foo, bar, () => {})'), with_('_.assignWith(foo, bar, () => {})'));
testUnchanged(with_('_.assign(foo, bar)'));
testUnchanged(with_('_.assign(foo, bar, baz)'));

test(with_('_.merge(foo, bar, function() {})'), with_('_.mergeWith(foo, bar, function() {})'));
test(with_('_.merge(foo, bar, function() {}, this)'), with_('_.mergeWith(foo, bar, function() {}, this)'));
test(with_('_.merge(foo, bar, () => {})'), with_('_.mergeWith(foo, bar, () => {})'));
testUnchanged(with_('_.merge(foo, bar)'));
testUnchanged(with_('_.merge(foo, bar, baz)'));

test(with_('_.clone(foo, false)'), with_('_.clone(foo)'));
test(with_('_.clone(foo, true)'), with_('_.cloneDeep(foo)'));
test(with_('_.clone(foo, false, customizer)'), with_('_.cloneWith(foo, customizer)'));
test(with_('_.clone(foo, true, customizer)'), with_('_.cloneDeepWith(foo, customizer)'));
testUnchanged(with_('_.clone(foo)'));

test(with_('_.cloneDeep(foo, customizer)'), with_('_.cloneDeepWith(foo, customizer)'));
testUnchanged(with_('_.cloneDeep(foo)'));

test(with_('_.isEqual(foo, bar, customizer)'), with_('_.isEqualWith(foo, bar, customizer)'));
testUnchanged(with_('_.isEqual(foo, bar)'));

test(with_('_.isMatch(foo, bar, customizer)'), with_('_.isMatchWith(foo, bar, customizer)'));
testUnchanged(with_('_.isMatch(foo, bar)'));

test(with_('_.max(foo, iteratee)'), with_('_.maxBy(foo, iteratee)'));
testUnchanged(with_('_.max(foo)'));

test(with_('_.min(foo, iteratee)'), with_('_.minBy(foo, iteratee)'));
testUnchanged(with_('_.min(foo)'));

test(with_('_.omit(foo, () => {})'), with_('_.omitBy(foo, () => {})'));
test(with_('_.omit(foo, () => {}, this)'), with_('_.omitBy(foo, () => {}, this)'));
testUnchanged(with_('_.omitBy(foo, "a")'));
testUnchanged(with_('_.omitBy(foo, ["a", "b"])'));

test(with_('_.sample(foo, n)'), with_('_.sampleSize(foo, n)'));
testUnchanged(with_('_.sample(foo)'));
