import test from 'ava';
import jscodeshift from 'jscodeshift';
import testPlugin from 'jscodeshift-ava-tester';
import codemod from '../lib/method-name-changes';
import {with_} from './helpers/jscodeshift-wrapper';

const {testChanged, testUnchanged} = testPlugin(jscodeshift, test, codemod);

testChanged(with_('_.all(foo, bar)'), with_('_.every(foo, bar)'));
testChanged(with_('_.any(foo, bar)'), with_('_.some(foo, bar)'));
testChanged(with_('_.backflow(foo, bar)'), with_('_.flowRight(foo, bar)'));
testChanged(with_('_.callback(foo, bar)'), with_('_.iteratee(foo, bar)'));
testChanged(with_('_.collect(foo, bar)'), with_('_.map(foo, bar)'));
testChanged(with_('_.compose(foo, bar)'), with_('_.flowRight(foo, bar)'));
testChanged(with_('_.contains(foo, bar)'), with_('_.includes(foo, bar)'));
testChanged(with_('_.detect(foo, bar)'), with_('_.find(foo, bar)'));
testChanged(with_('_.eq(foo, bar)'), with_('_.isEqual(foo, bar)'));
testChanged(with_('_.findWhere(foo, bar)'), with_('_.find(foo, bar)'));
testChanged(with_('_.first(foo, bar)'), with_('_.head(foo, bar)'));
testChanged(with_('_.foldl(foo, bar)'), with_('_.reduce(foo, bar)'));
testChanged(with_('_.foldr(foo, bar)'), with_('_.reduceRight(foo, bar)'));
testChanged(with_('_.include(foo, bar)'), with_('_.includes(foo, bar)'));
testChanged(with_('_.indexBy(foo, bar)'), with_('_.keyBy(foo, bar)'));
testChanged(with_('_.inject(foo, bar)'), with_('_.reduce(foo, bar)'));
testChanged(with_('_.invoke(foo, bar)'), with_('_.invokeMap(foo, bar)'));
testChanged(with_('_.methods(foo, bar)'), with_('_.functions(foo, bar)'));
testChanged(with_('_.modArgs(foo, bar)'), with_('_.overArgs(foo, bar)'));
testChanged(with_('_.padLeft(foo, bar)'), with_('_.padStart(foo, bar)'));
testChanged(with_('_.padRight(foo, bar)'), with_('_.padEnd(foo, bar)'));
testChanged(with_('_.pairs(foo, bar)'), with_('_.toPairs(foo, bar)'));
testChanged(with_('_.partial(_.pluck, bar)'), with_('_.partial(_.map, bar)'));
testChanged(with_('_.pluck(foo, bar)'), with_('_.map(foo, bar)'));
testChanged(with_('_.rest(foo, bar)'), with_('_.tail(foo, bar)'));
testChanged(with_('_.restParam(foo, bar)'), with_('_.rest(foo, bar)'));
testChanged(with_('_.select(foo, bar)'), with_('_.filter(foo, bar)'));
testChanged(with_('_.sortByAll(foo, bar)'), with_('_.sortBy(foo, bar)'));
testChanged(with_('_.sortByOrder(foo, bar)'), with_('_.orderBy(foo, bar)'));
testChanged(with_('_.trimLeft(foo, bar)'), with_('_.trimStart(foo, bar)'));
testChanged(with_('_.trimRight(foo, bar)'), with_('_.trimEnd(foo, bar)'));
testChanged(with_('_.trunc(foo, bar)'), with_('_.truncate(foo, bar)'));
testChanged(with_('_.unique(foo, bar)'), with_('_.uniq(foo, bar)'));
testChanged(with_('_.where(foo, bar)'), with_('_.filter(foo, bar)'));

testChanged(with_('_.chain(foo).first()'), with_('_.chain(foo).head()'));
testChanged(with_('_.chain(foo).map(fn).first()'), with_('_.chain(foo).map(fn).head()'));
testChanged(with_('_.chain(foo).map(fn).foldl(a, b)'), with_('_.chain(foo).map(fn).reduce(a, b)'));

testChanged(with_('_(foo).first()'), with_('_(foo).head()'));
testChanged(with_('_(foo).map(fn).first()'), with_('_(foo).map(fn).head()'));
testChanged(with_('_(foo).map(fn).foldl(a, b)'), with_('_(foo).map(fn).reduce(a, b)'));

testUnchanged(with_('_.map(foo, bar)'));
testUnchanged(with_('a.first(foo, bar)'));
testUnchanged(with_('pluck(foo, bar)'));
