export const jsonToOptions = (options) =>
  Object.entries(options).map((entry) => {
    return {
      key: entry[0],
      value: entry[1],
    };
  });
