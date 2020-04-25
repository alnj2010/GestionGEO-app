import { Student } from '../services/student';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'student/list',
  SELECT: `student/select`,
  AVAILABLE_SUBJECTS: `student/subjects_inscription`,
  INSCRIBED_SCHOOL_PERIODS: `student/inscribed_school_periods`,
  UPDATE: `student/update`,
  CLEAN_SELECTED_STUDENT: `student/clean-selected`,
  SELECTED_STUDENT_SCHOOL_PERIOD: `student/elected_student_school_period`,
};

export const getList = () => async (dispatch) => {
  return Student.getStudentList()
    .then((response) => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch((error) => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findStudentById = (id) => async (dispatch) => {
  return Student.findStudentById(id)
    .then((response) => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedStudent: response },
      });
      return true;
    })
    .catch((error) => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedStudent = (id) => async (dispatch) => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_STUDENT,
    payload: {},
  });
};

export const updateStudent = (student) => async (dispatch) => {
  const payload = {
    id: student.id,
    identification: student.identification,
    first_name: student.firstName,
    second_name: student.secondName,
    first_surname: student.firstSurname,
    second_surname: student.secondSurname,
    mobile: student.mobile,
    telephone: student.telephone,
    work_phone: student.workPhone,
    email: student.email,
    school_program_id: student.schoolProgram,
    student_type: student.studentType,
    home_university: student.homeUniversity,
    sex: student.sex,
    nationality: student.nationality,
    is_ucv_teacher: student.isUcvTeacher,
    is_available_final_work: student.isAvailableFinalWork,
    repeat_approved_subject: student.repeatApprovedSubject,
    repeat_reprobated_subject: student.repeatApprovedSubject,
  };
  return Student.update(payload)
    .then((response) => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedStudent: response },
      });
      show('Estudiante actualizado', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveStudent = (student) => async (dispatch) => {
  const payload = {
    identification: student.identification,
    first_name: student.firstName,
    second_name: student.secondName,
    first_surname: student.firstSurname,
    second_surname: student.secondSurname,
    mobile: student.mobile,
    telephone: student.telephone,
    work_phone: student.workPhone,
    email: student.email,
    school_program_id: student.schoolProgram,
    student_type: student.studentType,
    home_university: student.homeUniversity,
    sex: student.sex,
    nationality: student.nationality,
    is_ucv_teacher: student.isUcvTeacher,
    is_available_final_work: student.isAvailableFinalWork,
    repeat_approved_subject: student.repeatApprovedSubject,
    repeat_reprobated_subject: student.repeatApprovedSubject,
  };
  return Student.saveStudent(payload)
    .then((res) => {
      show('Estudiante guardado', 'success')(dispatch);
      return res.id;
    })
    .catch((error) => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteStudent = (studentId) => async (dispatch) => {
  return Student.delete(studentId)
    .then((response) => {
      show('Estudiante eliminado', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const getAvailableSubjects = (studentId, schoolPeriodId) => async (dispatch) => {
  return Student.getAvailableSubjects(studentId, schoolPeriodId)
    .then((response) => {
      dispatch({
        type: ACTIONS.AVAILABLE_SUBJECTS,
        payload: { availableSubjects: response },
      });
    })
    .catch((error) => {
      return error;
    });
};

export const addStudentPeriodSchool = (value) => async (dispatch) => {
  const payload = {
    student_id: value.studentId,
    school_period_id: value.schoolPeriodId,
    status: value.schoolPeriodStatus,
    pay_ref: value.payRef,
    subjects: value.subjects.map((subject) => ({
      school_period_subject_teacher_id: subject.subjectId,
      qualification: parseInt(subject.nota),
      status: subject.status,
    })),
  };
  return Student.addStudentPeriodSchool(payload)
    .then((res) => {
      show('Inscripcion sastifactoria', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const editStudentPeriodSchool = (value) => async (dispatch) => {
  const payload = {
    id: value.id,
    student_id: value.studentId,
    school_period_id: `${value.schoolPeriodId}`,
    status: value.schoolPeriodStatus,
    pay_ref: value.payRef,
    subjects: value.subjects.map((subject) => ({
      school_period_subject_teacher_id: subject.subjectId,
      qualification: parseInt(subject.nota),
      status: subject.status,
    })),
  };
  return Student.editStudentPeriodSchool(payload)
    .then((res) => {
      show('Inscripcion modificada sastifactoriamente', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const getInscribedSchoolPeriods = (studentId, idSchoolPeriod = null) => async (dispatch) => {
  return Student.getInscribedSchoolPeriods(studentId)
    .then((response) => {
      dispatch({
        type: ACTIONS.INSCRIBED_SCHOOL_PERIODS,
        payload: { inscribedSchoolPeriods: response },
      });

      if (idSchoolPeriod) {
        const data = response.find((item) => parseInt(item.id) === parseInt(idSchoolPeriod));
        let data2 = data.inscriptions;
        if (Array.isArray(data2))
          data2 = data.inscriptions.find(
            (item) => parseInt(item.student_id) === parseInt(studentId)
          );

        const inscription = {
          ...data2,
          ...data,
          idInscription: data2.id,
        };
        dispatch({
          type: ACTIONS.SELECTED_STUDENT_SCHOOL_PERIOD,
          payload: { selectedStudentSchoolPeriod: inscription },
        });
      }
    })
    .catch((error) => {
      return error;
    });
};

export const cleanSelectedInscribedSchoolPeriods = (id) => async (dispatch) => {
  dispatch({
    type: ACTIONS.SELECTED_STUDENT_SCHOOL_PERIOD,
    payload: { selectedStudentSchoolPeriod: {} },
  });
};

export const cleanSelectedInscriptionSchoolPeriods = (id) => async (dispatch) => {
  dispatch({
    type: ACTIONS.INSCRIBED_SCHOOL_PERIODS,
    payload: { inscribedSchoolPeriods: [] },
  });
};
