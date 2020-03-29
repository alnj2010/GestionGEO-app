import AXIOS, { headers } from "../config/axios.config";
import { URL } from "./constants";

export const SchoolProgram = {
  getSchoolProgramList() {
    return AXIOS.get(`${URL.SCHOOL_PROGRAM}`, {
      headers: headers()
    })
      .then(response => {
        if (response.status && response.status !== 200) {
          let error = { response: response };
          throw error;
        }
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject("Ups! Al parecer hay un error desconocido.");
      });
  },
  findSchoolProgramById(id) {
    return AXIOS.get(`${URL.SCHOOL_PROGRAM}/${id}`, {
      headers: headers()
    })
      .then(response => {
        if (response.status && response.status !== 200) {
          let error = { response: response };
          throw error;
        }
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject("Ups! Al parecer hay un error desconocido.");
      });
  },
  update(schoolProgram) {
    return AXIOS.put(
      `${URL.SCHOOL_PROGRAM}/${schoolProgram.id}`,
      schoolProgram,
      {
        headers: headers()
      }
    )
      .then(response => {
        if (response.status && response.status !== 200) {
          let error = { response: response };
          throw error;
        }
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject("Ups! Al parecer hay un error desconocido.");
      });
  },

  saveSchoolProgram(schoolProgram) {
    return AXIOS.post(`${URL.SCHOOL_PROGRAM}`, schoolProgram, {
      headers: headers()
    })
      .then(response => {
        if (response.status && response.status !== 200) {
          let error = { response: response };
          throw error;
        }
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject("Ups! Al parecer hay un error desconocido.");
      });
  },
  delete(schoolProgramId) {
    return AXIOS.delete(`${URL.SCHOOL_PROGRAM}/${schoolProgramId}`, {
      headers: headers()
    })
      .then(response => {
        if (response.status && response.status !== 200) {
          let error = { response: response };
          throw error;
        }
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject("Ups! Al parecer hay un error desconocido.");
      });
  }
};

export default SchoolProgram;
