module.exports = sizes => property => val => {
  if (!property) {
    throw new Error('You must provide a property');
  }

  if (!val) {
    throw new Error('You must provide a value');
  }

  if (!sizes) {
    return {
      [property]: val
    };
  }

  if (!Array.isArray(val)) {
    return {
      [property]: val
    };
  }

  if ((Object.keys(sizes).length) < (val.length - 1)) {
    throw new Error(`You provided more values than sizes:
🤡 ${Object.keys(sizes).length} sizes.
🌎 ${val.length} values. (${val.length - 1} including the default value)
`);
  }

  const entries = Object.entries(sizes);

  return val.reduce((acc, size, i) => {
    if (
      typeof val[i] === 'undefined' ||
      val[i] === null ||
      val[i] === false
    ) {
      return acc;
    }
    if (i === 0) {
      return Object.assign({},
        acc,
        {
          [property]: val[i]
        }
      );
    }
    return Object.assign({},
      acc,
      {
        [`@media (${entries[i - 1][1]})`]: {
          [property]: val[i]
        }
      },
    );
  }, {});
};
