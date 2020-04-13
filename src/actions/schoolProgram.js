import { SchoolProgram } from '../services/schoolProgram';
import { show } from './snackbar';

export const ACTIONS = {
    LIST: 'schoolProgram/list',
    SELECT: `schoolProgram/select`,
    UPDATE: `schoolProgram/update`,
    CLEAN_SELECTED_SCHOOL_PROGRAM: `schoolProgram/clean-selected`,
};

export const getList = () => async (dispatch) => {
    return SchoolProgram.getSchoolProgramList()
        .then((response) => {
            dispatch({ type: ACTIONS.LIST, payload: { list: response } });
            return true;
        })
        .catch((error) => {
            show(error, 'error')(dispatch);
            return false;
        });
};

export const findSchoolProgramById = (id) => async (dispatch) => {
    return SchoolProgram.findSchoolProgramById(id)
        .then((response) => {
            dispatch({
                type: ACTIONS.SELECT,
                payload: { selectedSchoolProgram: response },
            });
            return true;
        })
        .catch((error) => {
            show(error, 'error')(dispatch);
            return false;
        });
};

export const cleanSelectedSchoolProgram = (id) => async (dispatch) => {
    dispatch({
        type: ACTIONS.CLEAN_SELECTED_SCHOOL_PROGRAM,
        payload: {},
    });
};

export const updateSchoolProgram = (schoolProgram) => async (dispatch) => {
    const payload = {
        id: schoolProgram.id,
        school_program_name: schoolProgram.schoolProgramName,
        num_cu: parseInt(schoolProgram.numCu),
        duration: parseInt(schoolProgram.duration),
        min_num_cu_final_work: parseInt(schoolProgram.minNumCuFinalWork),
        min_duration: parseInt(schoolProgram.minDuration),
        grant_certificate: schoolProgram.grantCertificate,
        conducive_to_degree: schoolProgram.conduciveToDegree,
        doctoral_exam: schoolProgram.doctoralExam,
    };
    return SchoolProgram.update(payload)
        .then((response) => {
            dispatch({
                type: ACTIONS.SELECT,
                payload: { selectedSchoolProgram: response },
            });
            show('Programa academico actualizado', 'success')(dispatch);
            return true;
        })
        .catch((error) => {
            show(error, 'error')(dispatch);
            return false;
        });
};

export const saveSchoolProgram = (schoolProgram) => async (dispatch) => {
    const payload = {
        school_program_name: schoolProgram.schoolProgramName,
        num_cu: parseInt(schoolProgram.numCu),
        duration: parseInt(schoolProgram.duration),
        min_num_cu_final_work: parseInt(schoolProgram.minNumCuFinalWork),
        min_duration: parseInt(schoolProgram.minDuration),
        grant_certificate: schoolProgram.grantCertificate,
        conducive_to_degree: schoolProgram.conduciveToDegree,
        doctoral_exam: schoolProgram.doctoralExam,
    };

    return SchoolProgram.saveSchoolProgram(payload)
        .then((res) => {
            show('Programa academico guardado', 'success')(dispatch);
            return res.id;
        })
        .catch((error) => {
            show(error, 'error')(dispatch);
            return false;
        });
};

export const deleteSchoolProgram = (schoolProgramId) => async (dispatch) => {
    return SchoolProgram.delete(schoolProgramId)
        .then((response) => {
            show('Programa academico eliminado', 'success')(dispatch);
            return true;
        })
        .catch((error) => {
            show(error, 'error')(dispatch);
            return false;
        });
};
