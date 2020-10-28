/* eslint-disable no-restricted-syntax */
export const jsonToOptions = (options) =>
  Object.entries(options).map((entry) => {
    return {
      key: entry[0],
      value: entry[1],
    };
  });

export const reverseJson = (json) => {
  const reverse = {};
  // eslint-disable-next-line guard-for-in
  // eslint-disable-next-line no-restricted-syntax
  // eslint-disable-next-line guard-for-in
  // eslint-disable-next-line no-restricted-syntax
  // eslint-disable-next-line guard-for-in
  for (const p in json) {
    reverse[json[p]] = p;
  }
  return reverse;
};

export const handleErrorMsg = (error) => {
  if (error && error.response && error.response.data) {
    if (typeof error.response.data.text === 'function') {
      return error.response.data.text().then((msg) => Promise.reject(JSON.parse(msg)));
    }
    const err = {
      message: error.response.data.error,
      status: error.response.status,
      statusText: error.response.statusText,
    };
    throw err;
  }

  return Promise.reject(new Error('Hubo un error, intente mas tarde.'));
};

export const handleResponseService = (response) => {
  if (response.status && response.status !== 200) {
    const error = { response };
    throw error;
  }
  return response.data;
};
