/**
 * This function prepares a correct search string
 * from a given currentParams and paramsToUpdate.
 */
export function getSearchWith(
  currentParams,
  paramsToUpdate, // it's our custom type
) {
  // copy currentParams by creating new object from a string
  const newParams = new URLSearchParams(
    currentParams.toString(),
  );

  // - params with the `null` value are deleted;
  // - string value is set to given param key;
  // - array of strings adds several params with the same key;

  Object.entries(paramsToUpdate)
    .forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        // we delete the key to remove old values
        newParams.delete(key);

        value.forEach(part => {
          newParams.append(key, part);
        });
      } else {
        newParams.set(key, value);
      }
    });

  // we return a string to use it inside links
  return newParams.toString();
}
