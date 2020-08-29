import { Subject } from '../services/subject';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'subject/list',
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
      show(error.message, 'error')(dispatch);
      return false;
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
      return false;
    });
};

export const cleanSelectedSubject = (id) => async (dispatch) => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_SUBJECT,
    payload: {},
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
      show('Materia actualizada', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
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
      show('Materia guardada', 'success')(dispatch);
      return res.id;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};

export const deleteSubject = (subjectId) => async (dispatch) => {
  return Subject.delete(subjectId)
    .then((response) => {
      show('Materia eliminada', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};
