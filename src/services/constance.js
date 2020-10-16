import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';
import { handleErrorMsg } from '../helpers';

export const Constance = {
  getConstance(id, userType, constanceType) {
    return AXIOS({
      url: `${URL.CONSTANCE}/${constanceType}?${userType}_id=${id}`,
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
        link.setAttribute('download', 'Constancia.pdf');
        link.click();
      })
      .catch(handleErrorMsg);
  },

  getReport(initial, final) {
    return AXIOS({
      url: `${URL.ANNUALREPORT}?first_school_period_id=${initial}&last_school_period_id=${final}`,
      method: 'GET',
      headers: headers('xlsx'),
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
        link.setAttribute('download', 'Reporte_Anual.xlsx');
        link.click();
      })
      .catch(handleErrorMsg);
  },
};

export default Constance;
