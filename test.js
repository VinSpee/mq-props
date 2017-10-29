const test = require('ava');
const mq = require('./index');

const SIZES = ['min-width: 320px', 'min-width: 480px', 'min-width: 768px'];

const sized = mq(SIZES);

test('when not given sizes, or val, return null', t => {
  const expected = null;

  const actual = mq()('foo')(null);

  t.deepEqual(expected, actual);
});

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

test('returns val if not given sizes or a prop', t => {
  const actual = mq()()('foo');

  const expected = 'foo';

  t.deepEqual(actual, expected);
});

test('returns an object if not given a property', t => {
  const actual = sized()([
    {foo: 'foo', bar: 'bar'},
    {bar: 'foo', baz: 'buzz'}
  ]);

  const expected = {
    '@media (min-width: 320px)': {
      baz: 'buzz',
      bar: 'foo'
    },
    bar: 'bar',
    foo: 'foo'
  };

  t.deepEqual(actual, expected);
});

test('returns nothing for any non-numeric falsy value', t => {
  const nu = sized('prop')(null);

  t.deepEqual(nu, null);

  const empty = sized('prop')('');

  t.deepEqual(empty, null);
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

  t.is(actual.message, `You provided more values than sizes:
🤡 3 sizes.
🌎 5 values. (4 including the default value)
`);
});

test('ignores missing values in the array', t => {
  const expected = {
    propertyToSet: 'foo',
    '@media (min-width: 320px)': {
      propertyToSet: 'bar'
    },
    '@media (min-width: 768px)': {
      propertyToSet: 'qux'
    }
  };

  const actual = sized('propertyToSet')([
    'foo',
    'bar',
    null,
    'qux'
  ]);

  t.deepEqual(expected, actual);
});
