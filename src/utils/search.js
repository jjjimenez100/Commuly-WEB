const findMatchingObjectProperty = (object, query) => {
  return (
    object !== null &&
    (typeof object === 'object'
      ? Object.keys(object).some(key => findMatchingObjectProperty(object[key], query))
      : String(object)
          .toLowerCase()
          .includes(query))
  );
};

const filterMatchingObjectProperties = (array, query) => {
  return array.filter(element => findMatchingObjectProperty(element, query));
};

export { findMatchingObjectProperty, filterMatchingObjectProperties };
