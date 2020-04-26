export const jsonToOptions = (options) =>
  Object.entries(options).map((entry) => {
    return {
      key: entry[0],
      value: entry[1],
    };
  });

export const handleErrorMsg = (error) => {
  if (error && error.response && error.response.data)
    return Promise.reject(new Error(error.response.data.error));
  return Promise.reject(new Error('Ups! Al parecer hay un error desconocido.'));
};

export const handleResponseService = (response) => {
  if (response.status && response.status !== 200) {
    const error = { response };
    throw error;
  }
  return response.data;
};
