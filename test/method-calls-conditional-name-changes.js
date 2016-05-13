import plugin from '../lib/method-calls-conditional-name-changes';
import testPlugin from './helpers/jscodeshift-wrapper';

const test = testPlugin(plugin);
const with_ = (input) => `var _ = require('lodash');\n${input}`;

const testUnchanged = (input) => test(input, input);

test(with_('_.assign(foo, bar, customizer)'), with_('_.assignWith(foo, bar, customizer)'));
testUnchanged(with_('_.assign(foo, bar)'));

test(with_('_.clone(foo, customizer)'), with_('_.cloneWith(foo, customizer)'));
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
