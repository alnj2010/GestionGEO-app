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
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const cleanGetList = () => async (dispatch) => {
  dispatch({ type: ACTIONS.LIST, payload: { list: [] } });
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
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const cleanSelectedSchoolProgram = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_SCHOOL_PROGRAM,
    payload: {},
  });
};

export const updateSchoolProgram = (schoolProgram) => async (dispatch) => {
  const payload = {
    id: schoolProgram.id,
    school_program_name: schoolProgram.schoolProgramName,
    num_cu: parseInt(schoolProgram.numCu, 10),
    duration: parseInt(schoolProgram.duration, 10) || undefined,
    min_num_cu_final_work: parseInt(schoolProgram.minNumCuFinalWork, 10),
    num_cu_to_doctoral_exam: parseInt(schoolProgram.numCuToDoctoralExam, 10),
    min_duration: parseInt(schoolProgram.minDuration, 10),
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
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const saveSchoolProgram = (schoolProgram) => async (dispatch) => {
  const payload = {
    school_program_name: schoolProgram.schoolProgramName,
    num_cu: parseInt(schoolProgram.numCu, 10),
    duration: parseInt(schoolProgram.duration, 10) || undefined,
    min_num_cu_final_work: parseInt(schoolProgram.minNumCuFinalWork, 10),
    num_cu_to_doctoral_exam: parseInt(schoolProgram.numCuToDoctoralExam, 10),
    min_duration: parseInt(schoolProgram.minDuration, 10),
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
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const deleteSchoolProgram = (schoolProgramId) => async (dispatch) => {
  return SchoolProgram.delete(schoolProgramId)
    .then(() => {
      show('Programa academico eliminado', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};
