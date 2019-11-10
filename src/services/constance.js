import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';

export const Constance = {

  getStudyConstance(id) {
    return AXIOS({
      url: `${URL.CONSTANCE}/study?student_id=${id}`,
      method: 'GET',
      headers: headers('pdf'),
      responseType: 'blob', // important
    }).then(response => {
        if( response.status && response.status!==200){
          let error={response:response};
          throw error
        };
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Constancia_de_estudio.pdf');
        link.click();
      })
      .catch(error => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  getStudyHistoricalConstance(id) {
    return AXIOS({
      url: `${URL.CONSTANCE}/studentHistoricalDownload?student_id=${id}`,
      method: 'GET',
      headers: headers('pdf'),
      responseType: 'blob', // important
    }).then(response => {
        if( response.status && response.status!==200){
          let error={response:response};
          throw error
        };
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Constancia_de_estudio.pdf');
        link.click();
      })
      .catch(error => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },

};

export default Constance;
