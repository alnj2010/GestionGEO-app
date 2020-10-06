import { Teacher } from '../services/teacher';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'teacher/list',
  SELECT: `teacher/select`,
  UPDATE: `teacher/update`,
  CLEAN_SELECTED_TEACHER: `teacher/clean-selected`,
};

export const getList = () => async (dispatch) => {
  return Teacher.getTeacherList()
    .then((response) => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};

export const findTeacherById = (id) => async (dispatch) => {
  return Teacher.findTeacherById(id)
    .then((response) => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedTeacher: response },
      });
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedTeacher = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_TEACHER,
    payload: {},
  });
};

export const updateTeacher = (teacher) => async (dispatch) => {
  const payload = {
    id: teacher.id,
    identification: teacher.identification,
    first_name: teacher.firstName,
    second_name: teacher.secondName,
    first_surname: teacher.firstSurname,
    second_surname: teacher.secondSurname,
    mobile: teacher.mobile,
    telephone: teacher.telephone,
    work_phone: teacher.workPhone,
    email: teacher.email,
    teacher_type: teacher.teacherType,
    category: teacher.category,
    nationality: teacher.nationality,
    sex: teacher.sex,
    level_instruction: teacher.levelInstruction,
    dedication: teacher.dedication,
    home_institute: teacher.homeInstitute,
    country: teacher.country,
    with_disabilities: teacher.withDisabilities,
    active: teacher.active,
  };
  return Teacher.update(payload)
    .then((response) => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedTeacher: response },
      });
      show('Profesor actualizado', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};

export const saveTeacher = (teacher) => async (dispatch) => {
  const payload = {
    identification: teacher.identification,
    first_name: teacher.firstName,
    second_name: teacher.secondName,
    first_surname: teacher.firstSurname,
    second_surname: teacher.secondSurname,
    mobile: teacher.mobile,
    telephone: teacher.telephone,
    work_phone: teacher.workPhone,
    email: teacher.email,
    teacher_type: teacher.teacherType,
    nationality: teacher.nationality,
    sex: teacher.sex,
    level_instruction: teacher.levelInstruction,
    dedication: teacher.dedication,
    home_institute: teacher.homeInstitute,
    country: teacher.country,
    with_disabilities: teacher.withDisabilities,
    category: teacher.category,
    active: teacher.active,
  };
  return Teacher.saveTeacher(payload)
    .then((res) => {
      show('Profesor guardado', 'success')(dispatch);
      return res.id;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};

export const deleteTeacher = (teacherId) => async (dispatch) => {
  return Teacher.delete(teacherId)
    .then(() => {
      show('Profesor eliminado', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};
