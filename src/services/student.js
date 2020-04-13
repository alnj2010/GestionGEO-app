import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';

export const Student = {
    getStudentList() {
        return AXIOS.get(`${URL.STUDENT}`, {
            headers: headers(),
        })
            .then((response) => {
                if (response.status && response.status !== 200) {
                    let error = { response: response };
                    throw error;
                }
                return response.data;
            })
            .catch((error) => {
                if (error && error.response && error.response.data)
                    return Promise.reject(error.response.data.error);
                return Promise.reject(
                    'Ups! Al parecer hay un error desconocido.'
                );
            });
    },
    findStudentById(id) {
        return AXIOS.get(`${URL.STUDENT}/${id}`, {
            headers: headers(),
        })
            .then((response) => {
                if (response.status && response.status !== 200) {
                    let error = { response: response };
                    throw error;
                }
                return response.data;
            })
            .catch((error) => {
                if (error && error.response && error.response.data)
                    return Promise.reject(error.response.data.error);
                return Promise.reject(
                    'Ups! Al parecer hay un error desconocido.'
                );
            });
    },
    update(student) {
        return AXIOS.put(`${URL.STUDENT}/${student.id}`, student, {
            headers: headers(),
        })
            .then((response) => {
                if (response.status && response.status !== 200) {
                    let error = { response: response };
                    throw error;
                }
                return response.data;
            })
            .catch((error) => {
                if (error && error.response && error.response.data)
                    return Promise.reject(error.response.data.error);
                return Promise.reject(
                    'Ups! Al parecer hay un error desconocido.'
                );
            });
    },

    saveStudent(student) {
        return AXIOS.post(`${URL.STUDENT}`, student, {
            headers: headers(),
        })
            .then((response) => {
                if (response.status && response.status !== 200) {
                    let error = { response: response };
                    throw error;
                }
                return response.data;
            })
            .catch((error) => {
                if (error && error.response && error.response.data)
                    return Promise.reject(error.response.data.error);
                return Promise.reject(
                    'Ups! Al parecer hay un error desconocido.'
                );
            });
    },
    delete(studentId) {
        return AXIOS.delete(`${URL.STUDENT}/${studentId}`, {
            headers: headers(),
        })
            .then((response) => {
                if (response.status && response.status !== 200) {
                    let error = { response: response };
                    throw error;
                }
                return response.data;
            })
            .catch((error) => {
                if (error && error.response && error.response.data)
                    return Promise.reject(error.response.data.error);
                return Promise.reject(
                    'Ups! Al parecer hay un error desconocido.'
                );
            });
    },

    getAvailableSubjects(studentId, schoolPeriodId) {
        return AXIOS.get(
            `${URL.INSCRIPTION}/availableSubjects?student_id=${studentId}&school_period_id=${schoolPeriodId}`,
            {
                headers: headers(),
            }
        )
            .then((response) => {
                if (response.status && response.status !== 200) {
                    let error = { response: response };
                    throw error;
                }
                return response.data;
            })
            .catch((error) => {
                if (error && error.response && error.response.data)
                    return Promise.reject(error.response.data.error);
                return Promise.reject(
                    'Ups! Al parecer hay un error desconocido.'
                );
            });
    },

    addStudentPeriodSchool(payload) {
        return AXIOS.post(`${URL.INSCRIPTION}`, payload, {
            headers: headers(),
        })
            .then((response) => {
                if (response.status && response.status !== 200) {
                    let error = { response: response };
                    throw error;
                }
                return response.data;
            })
            .catch((error) => {
                if (error && error.response && error.response.data)
                    return Promise.reject(error.response.data.error);
                return Promise.reject(
                    'Ups! Al parecer hay un error desconocido.'
                );
            });
    },
    editStudentPeriodSchool(payload) {
        return AXIOS.put(`${URL.INSCRIPTION}/${payload.id}`, payload, {
            headers: headers(),
        })
            .then((response) => {
                if (response.status && response.status !== 200) {
                    let error = { response: response };
                    throw error;
                }
                return response.data;
            })
            .catch((error) => {
                if (error && error.response && error.response.data)
                    return Promise.reject(error.response.data.error);
                return Promise.reject(
                    'Ups! Al parecer hay un error desconocido.'
                );
            });
    },
    getInscribedSchoolPeriods(studentId) {
        return AXIOS.get(
            `${URL.CONSTANCE}/studentHistorical?student_id=${studentId}`,
            {
                headers: headers(),
            }
        )
            .then((response) => {
                if (response.status && response.status !== 200) {
                    let error = { response: response };
                    throw error;
                }
                return response.data;
            })
            .catch((error) => {
                if (error && error.response && error.response.data)
                    return Promise.reject(error.response.data.error);
                return Promise.reject(
                    'Ups! Al parecer hay un error desconocido.'
                );
            });
    },
};

export default Student;
