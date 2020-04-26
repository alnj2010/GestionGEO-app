import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';
import { handleErrorMsg } from '../helpers';

export const Constance = {
  getStudyConstance(id) {
    return AXIOS({
      url: `${URL.CONSTANCE}/study?student_id=${id}`,
      method: 'GET',
      headers: headers('pdf'),
      responseType: 'blob', // important
    })
      .then((response) => {
        if (response.status && response.status !== 200) {
          const error = { response };
          throw error;
        }
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Constancia_de_estudio.pdf');
        link.click();
      })
      .catch(handleErrorMsg);
  },
  getStudyHistoricalConstance(id) {
    return AXIOS({
      url: `${URL.CONSTANCE}/studentHistoricalDownload?student_id=${id}`,
      method: 'GET',
      headers: headers('pdf'),
      responseType: 'blob', // important
    })
      .then((response) => {
        if (response.status && response.status !== 200) {
          const error = { response };
          throw error;
        }
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Constancia_de_estudio.pdf');
        link.click();
      })
      .catch(handleErrorMsg);
  },
};

export default Constance;
