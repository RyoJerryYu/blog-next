// return a new object that is the merge of all the objects passed as arguments
// the object later in the list will overwrite the values of the object earlier in the list
// all the undefined values will be ignored
export const mergeObjectIgnoreUndefined = <T>(...objects: Partial<T>[]): T => {
  const result: Partial<T> = {};
  for (const obj of objects) {
    for (const key in obj) {
      if (obj[key] !== undefined) {
        result[key] = obj[key];
      }
    }
  }
  return result as T;
};
