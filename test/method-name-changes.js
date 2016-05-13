import plugin from '../lib/method-name-changes';
import testPlugin from './helpers/jscodeshift-wrapper';

const test = testPlugin(plugin);
const with_ = (input) => `var _ = require('lodash');\n${input}`;

const testUnchanged = (input) => test(input, input);

test(with_('_.pluck(foo, bar)'), with_('_.map(foo, bar)'));

test(with_('_.findWhere(foo, bar)'), with_('_.find(foo, bar)'));

test(with_('_.where(foo, bar)'), with_('_.filter(foo, bar)'));

test(with_('_.partial(_.pluck, bar)'), with_('_.partial(_.map, bar)'));

testUnchanged(with_('_.map(foo, bar)'));
testUnchanged(with_('pluck(foo, bar)'));
