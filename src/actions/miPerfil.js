import { MiPerfil } from '../services/miPerfil';
import { show } from './snackbar';

export const ACTIONS = {
  SELECT: `perfil/select`,  
  CLEAN_SELECTED_PERFIL: `perfil/clean-selected`,

};

export const findMiPerfil = () => dispatch => {
  console.log(MiPerfil.findMiPerfil())
  dispatch({
    type: ACTIONS.SELECT,
    payload: { selectedMiPerfil: MiPerfil.findMiPerfil() },
  });
  return true;
};

export const cleanSelectedMiPerfil = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_PERFIL,
    payload: {},
  });
};

export const updateMiPerfil = student => async dispatch => {
  const payload = {
    id:student.id,
    identification:student.identification,
    first_name:student.firstName,
    second_name: student.secondName, 
    first_surname:student.firstSurname,
    second_surname: student.secondSurname, 
    mobile:student.mobile,
    telephone: student.telephone, 
    work_phone: student.workPhone, 
    email:student.email,
    school_program_id:student.schoolProgram,
    student_type:student.studentType,
    home_university:student.homeUniversity,
    sex:student.sex,
    nationality:student.nationality,
    is_ucv_teacher:student.isUcvTeacher,
    is_available_final_work:student.isAvailableFinalWork,
    repeat_approved_subject:student.repeatApprovedSubject,
    repeat_reprobated_subject:student.repeatApprovedSubject,

  };
  return MiPerfil.update(payload)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedMiPerfil: response },
      });
      show('Pefil actualizado', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};
