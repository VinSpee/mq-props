const test = require('ava');
const mq = require('./index');

const SIZES = ['min-width: 320px', 'min-width: 480px', 'min-width: 768px'];

const sized = mq(SIZES);

test('when not given sizes, returns the property it was passed', t => {
  const expected = {
    propertyToSet: 'foo'
  };

  const actual = mq()('propertyToSet')('foo');

  t.deepEqual(expected, actual);
});

test('when given one value, returns the value it was passed', t => {
  const expected = {
    propertyToSet: 'foo'
  };

  const actual = sized('propertyToSet')('foo');

  t.deepEqual(expected, actual);
});

test('throws if not given a property', t => {
  const actual = t.throws(() => {
    sized()('foo');
  }, Error);

  t.is(actual.message, 'You must provide a property');
});

test('throws if not given a value', t => {
  const actual = t.throws(() => {
    sized('prop')();
  }, Error);

  t.is(actual.message, 'You must provide a value');
});

test('returns an object of media queries when given an array of values', t => {
  const expected = {
    propertyToSet: 'foo',
    '@media (min-width: 320px)': {
      propertyToSet: 'bar'
    },
    '@media (min-width: 480px)': {
      propertyToSet: 'baz'
    },
    '@media (min-width: 768px)': {
      propertyToSet: 'qux'
    }
  };

  const actual = sized('propertyToSet')([
    'foo',
    'bar',
    'baz',
    'qux'
  ]);

  t.deepEqual(expected, actual);
});

test('throws when given more values than sizes', t => {
  const actual = t.throws(() => {
    sized('propertyToSet')([
      'foo',
      'bar',
      'baz',
      'qux',
      'qin'
    ]);
  }, Error);

  t.is(actual.message, 'You provided more values than sizes');
});
