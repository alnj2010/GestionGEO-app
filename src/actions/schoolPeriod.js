import { SchoolPeriod } from '../services/schoolPeriod';
import { show } from './snackbar';
import Subject from '../services/subject';
import { startOfHour } from 'date-fns';

export const ACTIONS = {
  LIST: 'schoolPeriod/list',
  SELECT: `schoolPeriod/select`,
  UPDATE: `schoolPeriod/update`,
  CLEAN_SELECTED_SCHOOL_PERIOD: `schoolPeriod/clean-selected`,
  CURRENT:`schoolPeriod/current`
};

export const getList = () => async dispatch => {
  return SchoolPeriod.getSchoolPeriodList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findCurrentSchoolPeriod = () => async dispatch => {
  return SchoolPeriod.findCurrentSchoolPeriod()
    .then(response => {
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

export const findSchoolPeriodById = id => async dispatch => {
  return SchoolPeriod.findSchoolPeriodById(id)
    .then(response => {
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
  console.log(schoolPeriod);
  const payload = {
    id:schoolPeriod.id,
    inscription_visible:!!schoolPeriod.inscriptionVisible,
    end_school_period:!!schoolPeriod.endSchoolPeriod,
    load_notes:!!schoolPeriod.loadNotes,
    cod_school_period:schoolPeriod.codSchoolPeriod,
    end_date:schoolPeriod.endDate,
    start_date:schoolPeriod.startDate,
    subjects: schoolPeriod.subjects.map(subject =>({

      subject_id:subject.subjectId,
      teacher_id:subject.teacherId,
      duty:subject.duty,
      limit:subject.limit,
      schedules:subject.schedules.map(schedule =>({
        school_period_subject_teacher_id:schedule.schoolPeriodSubjectTeacherId,
        day:schedule.day,
        start_hour:schedule.startHour,
        end_hour:schedule.endHour,
        classroom:schedule.classroom
      }))
    }))
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
    inscription_visible:false,
    end_school_period:false,
    load_notes:false,
    cod_school_period:schoolPeriod.codSchoolPeriod,
    end_date:schoolPeriod.endDate,
    start_date:schoolPeriod.startDate,
    subjects: schoolPeriod.subjects.map(subject =>({

      subject_id:subject.subjectId,
      teacher_id:subject.teacherId,
      duty:subject.duty,
      limit:subject.limit,
      schedules:subject.schedules.map(schedule =>({

        day:schedule.day,
        start_hour:schedule.startHour,
        end_hour:schedule.endHour,
        classroom:schedule.classroom
      }))
    }))
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
