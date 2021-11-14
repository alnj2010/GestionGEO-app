import { Subject } from '../services/subject';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'subject/list',
  LISTBYSCHOOLPROGRAM: 'subject/listBySchoolProgram',
  SELECT: `subject/select`,
  UPDATE: `subject/update`,
  CLEAN_SELECTED_SUBJECT: `subject/clean-selected`,
};

export const getList = () => async (dispatch) => {
  return Subject.getSubjectList()
    .then((response) => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch((error) => {
      dispatch({ type: ACTIONS.LIST, payload: { list: [] } });
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const cleanGetList = () => async (dispatch) => {
  dispatch({ type: ACTIONS.LIST, payload: { list: [] } });
};
export const getSubjectBySchoolProgram = (id) => async (dispatch) => {
  return Subject.getSubjectBySchoolProgram(id)
    .then((response) => {
      dispatch({ type: ACTIONS.LISTBYSCHOOLPROGRAM, payload: { listBySchoolPeriod: response } });
      return true;
    })
    .catch((error) => {
      dispatch({ type: ACTIONS.LISTBYSCHOOLPROGRAM, payload: { listBySchoolPeriod: [] } });
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const findSubjectById = (id) => async (dispatch) => {
  return Subject.findSubjectById(id)
    .then((response) => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedSubject: response },
      });
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const cleanSelectedSubject = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_SUBJECT,
    payload: {},
  });
};

export const cleanSubjectBySchoolProgram = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.LISTBYSCHOOLPROGRAM,
    payload: { listBySchoolPeriod: [] },
  });
};

export const updateSubject = (subject) => async (dispatch) => {
  const payload = {
    id: subject.id,
    uc: subject.uc,
    code: subject.subjectCode,
    name: subject.subjectName,
    laboratory_hours: subject.laboratoryHours,
    practical_hours: subject.practicalHours,
    theoretical_hours: subject.theoreticalHours,
    is_final_subject: subject.isFinalSubject,
    is_project_subject: subject.isProjectSubject,
    school_programs: subject.schoolPrograms,
  };
  return Subject.update(payload)
    .then((response) => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedSubject: response },
      });
      show('Asignatura actualizada', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const saveSubject = (subject) => async (dispatch) => {
  const payload = {
    uc: subject.uc,
    code: subject.subjectCode,
    name: subject.subjectName,
    laboratory_hours: subject.laboratoryHours,
    practical_hours: subject.practicalHours,
    theoretical_hours: subject.theoreticalHours,
    is_final_subject: subject.isFinalSubject,
    is_project_subject: subject.isProjectSubject,
    school_programs: subject.schoolPrograms,
  };
  return Subject.saveSubject(payload)
    .then((res) => {
      show('Asignatura guardada', 'success')(dispatch);
      return res.id;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const deleteSubject = (subjectId) => async (dispatch) => {
  return Subject.delete(subjectId)
    .then(() => {
      show('Asignatura eliminada', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};
