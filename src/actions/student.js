import { Student } from '../services/student';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'student/list',
  SELECT: `student/select`,
  SUBJECTS_INSCRIPTION: `student/subjects_inscription`,
  UPDATE: `student/update`,
  CLEAN_SELECTED_STUDENT: `student/clean-selected`,
};

export const getList = () => async dispatch => {
  return Student.getStudentList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findStudentById = id => async dispatch => {
  return Student.findStudentById(id)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedStudent: response },
      });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedStudent = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_STUDENT,
    payload: {},
  });
};

export const updateStudent = student => async dispatch => {
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
    postgraduate_id:student.postgraduate,
    student_type:student.studentType,
    home_university:student.homeUniversity,
  };
  return Student.update(payload)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedStudent: response },
      });
      show('Estudiante actualizado', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveStudent = student => async dispatch => {
  const payload = {
    identification:student.identification,
    first_name:student.firstName,
    second_name: student.secondName, 
    first_surname:student.firstSurname,
    second_surname: student.secondSurname, 
    mobile:student.mobile,
    telephone: student.telephone, 
    work_phone: student.workPhone, 
    email:student.email,
    postgraduate_id:student.postgraduate,
    student_type:student.studentType,
    home_university:student.homeUniversity,
  };
  return Student.saveStudent(payload)
    .then(res => {
      show('Estudiante guardado', 'success')(dispatch);
      return res.id;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteStudent = studentId => async dispatch => {
  return Student.delete(studentId)
    .then(response => {
      show('Estudiante eliminado', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const availableSubjects = (studentId,schoolPeriodId) => async dispatch => {
  return Student.availableSubjects(studentId,schoolPeriodId)
    .then(response => {
      dispatch({
        type: ACTIONS.SUBJECTS_INSCRIPTION,
        payload: { subjectsInscription: response },
      });
    })
    .catch(error => {
      return error;
    });
};

export const addStudentPeriodSchool = value => async dispatch => {
  let payload={
      student_id: value.studentId,
      school_period_id: value.schoolPeriodId,
      status:value.schoolPeriodStatus,
      subjects: value.subjects.map(subject=>({
        school_period_subject_teacher_id:subject.subjectId,
        qualification:parseInt(subject.nota),
        status:subject.status,
      }))
    }
  console.log(payload);

  return Student.addStudentPeriodSchool(payload)
    .then(res => {
      console.log(res);
      show(res.message, 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};
