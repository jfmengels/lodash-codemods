import plugin from '../lib/chain-remove-value';
import {testPlugin, with_} from './helpers/jscodeshift-wrapper';

const {test, testUnchanged} = testPlugin(plugin);

test(with_('_([1, 2, 3]).times().value()'), with_('_([1, 2, 3]).times()'));
test(with_('_([1, 2, 3]).times(3).value()'), with_('_([1, 2, 3]).times(3)'));
test(with_('_([1, 2, 3]).forEach(fn).value()'), with_('_([1, 2, 3]).forEach(fn)'));
test(with_('_([1, 2, 3]).each(fn).value()'), with_('_([1, 2, 3]).each(fn)'));
test(with_('_([1, 2, 3]).forIn(fn).value()'), with_('_([1, 2, 3]).forIn(fn)'));
test(with_('_([1, 2, 3]).forOwn(fn).value()'), with_('_([1, 2, 3]).forOwn(fn)'));
test(with_('_([1, 2, 3]).forEachRight(fn).value()'), with_('_([1, 2, 3]).forEachRight(fn)'));
test(with_('_([1, 2, 3]).eachRight(fn).value()'), with_('_([1, 2, 3]).eachRight(fn)'));
test(with_('_([1, 2, 3]).forInRight(fn).value()'), with_('_([1, 2, 3]).forInRight(fn)'));
test(with_('_([1, 2, 3]).forOwnRight(fn).value()'), with_('_([1, 2, 3]).forOwnRight(fn)'));
test(with_('_([1, 2, 3]).times().value().concat(3)'), with_('_([1, 2, 3]).times().concat(3)'));
test(with_(`
  _([1, 2, 3])
    .times()
    .value()
    .concat(3)
`), with_(`
  _([1, 2, 3])
    .times()
    .concat(3)
`));
test(with_('_.chain([1, 2, 3]).times(3).value()'), with_('_.chain([1, 2, 3]).times(3)'));
test(with_('_.chain([1, 2, 3]).forEach(fn).value()'), with_('_.chain([1, 2, 3]).forEach(fn)'));

testUnchanged(with_('_([1, 2, 3]).value()'));
testUnchanged(with_('_([1, 2, 3]).map(fn).value()'));
testUnchanged(with_('_([1, 2, 3]).times(fn)'));
testUnchanged(with_('_([1, 2, 3]).forEach(fn)'));
testUnchanged(with_('_([1, 2, 3]).each(fn)'));
testUnchanged(with_('_([1, 2, 3]).forIn(fn)'));
testUnchanged(with_('_([1, 2, 3]).forOwn(fn)'));
testUnchanged(with_('_([1, 2, 3]).forEachRight(fn)'));
testUnchanged(with_('_([1, 2, 3]).eachRight(fn)'));
testUnchanged(with_('_([1, 2, 3]).forInRight(fn)'));
testUnchanged(with_('_([1, 2, 3]).forOwnRight(fn)'));
testUnchanged(with_('_.chain([1, 2, 3]).value()'));
testUnchanged(with_('_.chain([1, 2, 3]).map(fn).value()'));
testUnchanged(with_('_.chain([1, 2, 3]).times(fn)'));
testUnchanged(with_('_.get(object, path).forEach(fn).value()'));

// This can potentially be an error, so it will be reported in the console.
testUnchanged(with_('foreignAPI([1, 2, 3]).forEach(fn).value()'));
