[![Build Status](https://travis-ci.org/VinSpee/mq-array-sizes.svg?branch=master)](https://travis-ci.org/VinSpee/mq-array-sizes)
[![Coverage Status](https://coveralls.io/repos/github/VinSpee/mq-array-sizes/badge.svg?branch=master)](https://coveralls.io/github/VinSpee/mq-array-sizes?branch=master)

# Media Query Props

## INSTALL

`yarn add mq-props`

## USAGE

`mqProps(sizes: Array<MediaQuery: string>)(property: string)(value: string)`

### Basic

```js
import mqProps from 'mq-props';

// Set your media queries
const SIZES = ['min-width: 320px', 'min-width: 480px', 'min-width: 768px'];

// pass them to mq-props
const sized = mqProps(SIZES);

sized('color')([
  'cyan',
  'magenta',
  'yellow',
  'black'
]);

/**
 * returns:
 *  {
 *   color: 'cyan',
 *   '@media (min-width: 320px)': {
 *     propertyToSet: 'magenta'
 *   },
 *   '@media (min-width: 480px)': {
 *     propertyToSet: 'yellow'
 *   },
 *   '@media (min-width: 768px)': {
 *     propertyToSet: 'black'
 *   }
 * };
 *
 **/
```

### Skipping a value
```js
import mqProps from 'mq-props';

// Set your media queries
const SIZES = ['min-width: 320px', 'min-width: 480px', 'min-width: 768px'];

// pass them to mq-props
const sized = mqProps(SIZES);

sized('color')([
  'cyan',
  null,
  'yellow',
  'black'
]);

/**
 * returns:
 *  {
 *   color: 'cyan',
 *   '@media (min-width: 480px)': {
 *     propertyToSet: 'yellow'
 *   },
 *   '@media (min-width: 768px)': {
 *     propertyToSet: 'black'
 *   }
 * };
 *
 **/
```
