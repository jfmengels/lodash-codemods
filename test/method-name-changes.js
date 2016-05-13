import plugin from '../lib/method-name-changes';
import {testPlugin, with_} from './helpers/jscodeshift-wrapper';

const {test, testUnchanged} = testPlugin(plugin);

test(with_('_.pluck(foo, bar)'), with_('_.map(foo, bar)'));

test(with_('_.findWhere(foo, bar)'), with_('_.find(foo, bar)'));

test(with_('_.where(foo, bar)'), with_('_.filter(foo, bar)'));

test(with_('_.partial(_.pluck, bar)'), with_('_.partial(_.map, bar)'));

test(with_('_.first(foo, bar)'), with_('_.head(foo, bar)'));
test(with_('_.indexBy(foo, bar)'), with_('_.keyBy(foo, bar)'));
test(with_('_.invoke(foo, bar)'), with_('_.invokeMap(foo, bar)'));
test(with_('_.modArgs(foo, bar)'), with_('_.overArgs(foo, bar)'));
test(with_('_.padLeft(foo, bar)'), with_('_.padStart(foo, bar)'));
test(with_('_.padRight(foo, bar)'), with_('_.padEnd(foo, bar)'));
test(with_('_.pairs(foo, bar)'), with_('_.toPairs(foo, bar)'));
test(with_('_.rest(foo, bar)'), with_('_.tail(foo, bar)'));
test(with_('_.restParam(foo, bar)'), with_('_.rest(foo, bar)'));
test(with_('_.sortByOrder(foo, bar)'), with_('_.orderBy(foo, bar)'));
test(with_('_.trimLeft(foo, bar)'), with_('_.trimStart(foo, bar)'));
test(with_('_.trimRight(foo, bar)'), with_('_.trimEnd(foo, bar)'));
test(with_('_.trunc(foo, bar)'), with_('_.truncate(foo, bar)'));

testUnchanged(with_('_.map(foo, bar)'));
testUnchanged(with_('pluck(foo, bar)'));
