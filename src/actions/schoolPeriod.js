import { SchoolPeriod } from '../services/schoolPeriod';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'schoolPeriod/list',
  SELECT: `schoolPeriod/select`,
  UPDATE: `schoolPeriod/update`,
  CLEAN_SELECTED_SCHOOL_PERIOD: `schoolPeriod/clean-selected`,
};

export const getList = () => async dispatch => {
  return SchoolPeriod.getSchoolPeriodList()
    .then(response => {
      console.log('asdasd');
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findSchoolPeriodById = id => async dispatch => {
  return SchoolPeriod.findSchoolPeriodById(id)
    .then(response => {
      console.log(response);
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedSchoolPeriod: response },
      });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedSchoolPeriod = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_SCHOOL_PERIOD,
    payload: {},
  });
};

export const updateSchoolPeriod = schoolPeriod => async dispatch => {
  const payload = {
    id:schoolPeriod.id,
    identification:schoolPeriod.identification,
    first_name:schoolPeriod.firstName,
    second_name: schoolPeriod.secondName, 
    first_surname:schoolPeriod.firstSurname,
    second_surname: schoolPeriod.secondSurname, 
    mobile:schoolPeriod.mobile,
    telephone: schoolPeriod.telephone, 
    work_phone: schoolPeriod.workPhone, 
    email:schoolPeriod.email,
    schoolPeriod_type:schoolPeriod.schoolPeriodType,
  };
  return SchoolPeriod.update(payload)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedSchoolPeriod: response },
      });
      show('Periodo semestral actualizado', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveSchoolPeriod = schoolPeriod => async dispatch => {
  const payload = {
    identification:schoolPeriod.identification,
    first_name:schoolPeriod.firstName,
    second_name: schoolPeriod.secondName, 
    first_surname:schoolPeriod.firstSurname,
    second_surname: schoolPeriod.secondSurname, 
    mobile:schoolPeriod.mobile,
    telephone: schoolPeriod.telephone, 
    work_phone: schoolPeriod.workPhone, 
    email:schoolPeriod.email,
    schoolPeriod_type:schoolPeriod.schoolPeriodType,
  };
  return SchoolPeriod.saveSchoolPeriod(payload)
    .then(res => {
      show('Periodo semestral guardado', 'success')(dispatch);
      return res.id;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteSchoolPeriod = schoolPeriodId => async dispatch => {
  return SchoolPeriod.delete(schoolPeriodId)
    .then(response => {
      show('Periodo semestral eliminado', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};
