import plugin from '../lib/method-name-changes';
import {testPlugin, with_} from './helpers/jscodeshift-wrapper';

const {test, testUnchanged} = testPlugin(plugin);

test(with_('_.all(foo, bar)'), with_('_.every(foo, bar)'));
test(with_('_.any(foo, bar)'), with_('_.some(foo, bar)'));
test(with_('_.backflow(foo, bar)'), with_('_.flowRight(foo, bar)'));
test(with_('_.callback(foo, bar)'), with_('_.iteratee(foo, bar)'));
test(with_('_.collect(foo, bar)'), with_('_.map(foo, bar)'));
test(with_('_.compose(foo, bar)'), with_('_.flowRight(foo, bar)'));
test(with_('_.contains(foo, bar)'), with_('_.includes(foo, bar)'));
test(with_('_.detect(foo, bar)'), with_('_.find(foo, bar)'));
test(with_('_.eq(foo, bar)'), with_('_.isEqual(foo, bar)'));
test(with_('_.findWhere(foo, bar)'), with_('_.find(foo, bar)'));
test(with_('_.first(foo, bar)'), with_('_.head(foo, bar)'));
test(with_('_.foldl(foo, bar)'), with_('_.reduce(foo, bar)'));
test(with_('_.foldr(foo, bar)'), with_('_.reduceRight(foo, bar)'));
test(with_('_.include(foo, bar)'), with_('_.includes(foo, bar)'));
test(with_('_.indexBy(foo, bar)'), with_('_.keyBy(foo, bar)'));
test(with_('_.inject(foo, bar)'), with_('_.reduce(foo, bar)'));
test(with_('_.invoke(foo, bar)'), with_('_.invokeMap(foo, bar)'));
test(with_('_.methods(foo, bar)'), with_('_.functions(foo, bar)'));
test(with_('_.modArgs(foo, bar)'), with_('_.overArgs(foo, bar)'));
test(with_('_.padLeft(foo, bar)'), with_('_.padStart(foo, bar)'));
test(with_('_.padRight(foo, bar)'), with_('_.padEnd(foo, bar)'));
test(with_('_.pairs(foo, bar)'), with_('_.toPairs(foo, bar)'));
test(with_('_.partial(_.pluck, bar)'), with_('_.partial(_.map, bar)'));
test(with_('_.pluck(foo, bar)'), with_('_.map(foo, bar)'));
test(with_('_.rest(foo, bar)'), with_('_.tail(foo, bar)'));
test(with_('_.restParam(foo, bar)'), with_('_.rest(foo, bar)'));
test(with_('_.select(foo, bar)'), with_('_.filter(foo, bar)'));
test(with_('_.sortByAll(foo, bar)'), with_('_.sortBy(foo, bar)'));
test(with_('_.sortByOrder(foo, bar)'), with_('_.orderBy(foo, bar)'));
test(with_('_.trimLeft(foo, bar)'), with_('_.trimStart(foo, bar)'));
test(with_('_.trimRight(foo, bar)'), with_('_.trimEnd(foo, bar)'));
test(with_('_.trunc(foo, bar)'), with_('_.truncate(foo, bar)'));
test(with_('_.unique(foo, bar)'), with_('_.uniq(foo, bar)'));
test(with_('_.where(foo, bar)'), with_('_.filter(foo, bar)'));

test(with_('_.chain(foo).first()'), with_('_.chain(foo).head()'));
test(with_('_.chain(foo).map(fn).first()'), with_('_.chain(foo).map(fn).head()'));
test(with_('_.chain(foo).map(fn).foldl(a, b)'), with_('_.chain(foo).map(fn).reduce(a, b)'));

test(with_('_(foo).first()'), with_('_(foo).head()'));
test(with_('_(foo).map(fn).first()'), with_('_(foo).map(fn).head()'));
test(with_('_(foo).map(fn).foldl(a, b)'), with_('_(foo).map(fn).reduce(a, b)'));

testUnchanged(with_('_.map(foo, bar)'));
testUnchanged(with_('a.first(foo, bar)'));
testUnchanged(with_('pluck(foo, bar)'));
