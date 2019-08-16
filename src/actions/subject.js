import { Subject } from '../services/subject';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'subject/list',
  SELECT: `subject/select`,
  UPDATE: `subject/update`,
  CLEAN_SELECTED_SUBJECT: `subject/clean-selected`,
};

export const getList = () => async dispatch => {
  return Subject.getSubjectList()
    .then(response => {
      console.log('action',response)
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findSubjectById = id => async dispatch => {
  return Subject.findSubjectById(id)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedSubject: response },
      });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedSubject = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_SUBJECT,
    payload: {},
  });
};

export const updateSubject = subject => async dispatch => {
  const payload = {
    subject_name:subject.subjectName,
    num_cu:parseInt(subject.numCu),
  };
  return Subject.update(payload)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedSubject: response },
      });
      show('Materia actualizada', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveSubject = subject => async dispatch => {
  const payload = {
   subject_name:subject.subjectName,
   num_cu:subject.numCu,
  };
  return Subject.saveSubject(payload)
    .then(res => {
      show('Materia guardada', 'success')(dispatch);
      return res.id;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteSubject = subjectId => async dispatch => {
  return Subject.delete(subjectId)
    .then(response => {
      show('Materia eliminada', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};
