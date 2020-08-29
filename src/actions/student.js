import { Student } from '../services/student';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'student/list',
  SELECT: `student/select`,
  AVAILABLE_SUBJECTS: `student/subjects_inscription`,
  INSCRIBED_SCHOOL_PERIODS: `student/inscribed_school_periods`,
  UPDATE: `student/update`,
  CLEAN_SELECTED_STUDENT: `student/clean-selected`,
  SELECTED_STUDENT_SCHOOL_PERIOD: `student/selected_student_school_period`,
  SELECTED_SCHOOL_PROGRAM: `student/selected_school_program`,
};

export const getList = () => async (dispatch) => {
  return Student.getStudentList()
    .then((response) => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
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
      show(error.message, 'error')(dispatch);
      return false;
    });
};

export const loadSchoolProgram = (schoolProgram) => async (dispatch) => {
  dispatch({
    type: ACTIONS.SELECTED_SCHOOL_PROGRAM,
    payload: { selectedSchoolProgram: schoolProgram },
  });
  return true;
};

export const cleanSchoolProgram = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.SELECTED_SCHOOL_PROGRAM,
    payload: { selectedSchoolProgram: {} },
  });
};

export const updateSchoolProgram = (student) => async (dispatch) => {
  console.log('entro', student.equivalences);
  const payload = {
    identification: student.identification,
    first_name: student.first_name,
    second_name: student.second_name,
    first_surname: student.first_surname,
    second_surname: student.second_surname,
    telephone: student.telephone,
    mobile: student.mobile,
    work_phone: student.work_phone,
    email: student.email,
    level_instruction: student.level_instruction,
    active: student.active,
    with_disabilities: student.with_disabilities,
    sex: student.sex,
    nationality: student.nationality,
    student_id: student.idStudent,
    guide_teacher_id: student.guideTeacherId,
    student_type: student.studentType,
    home_university: student.homeUniversity,
    current_postgraduate: student.currentPostgraduate,
    type_income: student.typeIncome,
    is_ucv_teacher: student.isUcvTeacher,
    is_available_final_work: student.isAvailableFinalWork,
    credits_granted: student.creditsGranted,
    with_work: student.withWork,
    test_period: student.testPeriod,
    current_status: student.currentStatus,
    equivalences: student.equivalences,
  };

  return Student.updateSchoolProgram(payload, student.idUser)
    .then((response) => {
      dispatch({
        type: ACTIONS.SELECTED_SCHOOL_PROGRAM,
        payload: {
          selectedSchoolProgram: response.student.find((item) => item.id === student.idStudent),
        },
      });
      show('Programa escolar de estudiante actualizado', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};

export const saveSchoolProgram = (student) => async (dispatch) => {
  const payload = {
    identification: student.identification,
    first_name: student.first_name,
    second_name: student.second_name,
    first_surname: student.first_surname,
    second_surname: student.second_surname,
    telephone: student.telephone,
    mobile: student.mobile,
    work_phone: student.work_phone,
    email: student.email,
    level_instruction: student.level_instruction,
    active: student.active,
    with_disabilities: student.with_disabilities,
    sex: student.sex,
    nationality: student.nationality,
    guide_teacher_id: student.guideTeacherId,
    student_type: student.studentType,
    school_program_id: student.schoolProgramId,
    home_university: student.homeUniversity,
    current_postgraduate: student.currentPostgraduate,
    type_income: student.typeIncome,
    is_ucv_teacher: student.isUcvTeacher,
    is_available_final_work: student.isAvailableFinalWork,
    credits_granted: student.creditsGranted,
    with_work: student.withWork,
    test_period: student.testPeriod,
    current_status: student.currentStatus,
    equivalences: student.equivalences,
  };
  console.log(payload);

  return Student.saveSchoolProgram(payload, student.idUser)
    .then((response) => {
      console.log(response);
      /* dispatch({
        type: ACTIONS.SELECTED_SCHOOL_PROGRAM,
        payload: {
          selectedSchoolProgram: response.student.find((item) => item.id === student.idStudent),
        },
      }); */
      show('Programa escolar de estudiante actualizado', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};

export const deleteSchoolProgram = (userId, studentId) => async (dispatch) => {
  return Student.deleteSchoolProgram(userId, studentId)
    .then(() => {
      show('Programa escolar de estudiante, eliminado!', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};
export const cleanSelectedStudent = () => async (dispatch) => {
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
    level_instruction: student.levelInstruction,
    active: student.active,
    with_disabilities: student.withDisabilities,
    sex: student.sex,
    nationality: student.nationality,
    student_id: student.studentId,
    guide_teacher_id: student.guideTeacherId,
    student_type: student.studentType,
    home_university: student.homeUniversity,
    current_postgraduate: student.currentPostgraduate,
    type_income: student.typeIncome,
    is_ucv_teacher: student.isUcvTeacher,
    is_available_final_work: student.isAvailableFinalWork,
    credits_granted: student.creditsGranted,
    with_work: student.withWork,
    test_period: student.testPeriod,
    current_status: student.currentStatus,
    //degrees:student.degrees,
    equivalences: student.equivalence.map((item) => ({
      subject_id: item.subject_id,
      qualification: item.qualification,
    })),
  };
  console.log(payload);
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
      show(error.message, 'error')(dispatch);
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
    level_instruction: student.levelInstruction,
    with_disabilities: student.withDisabilities,
    sex: student.sex,
    nationality: student.nationality,
    school_program_id: student.schoolProgram,
    //guide_teacher_id:student.guideTeacher,
    student_type: student.studentType,
    home_university: student.homeUniversity,
    //current_postgraduate:student.currentPostgraduate,
    type_income: student.typeIncome,
    is_ucv_teacher: student.isUcvTeacher,
    credits_granted: student.creditsGranted,
    with_work: student.withWork,
    //degrees:student.degrees,
    equivalences: student.equivalence.map((item) => ({
      subject_id: item.subjectId,
      qualification: item.qualification,
    })),
  };

  return Student.saveStudent(payload)
    .then((res) => {
      show('Estudiante guardado', 'success')(dispatch);
      return res.id;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};

export const deleteStudent = (studentId) => async (dispatch) => {
  return Student.delete(studentId)
    .then(() => {
      show('Estudiante eliminado', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};

export const getAvailableSubjects = (studentId, schoolPeriodId) => async (dispatch) => {
  return Student.getAvailableSubjects(studentId, schoolPeriodId)
    .then((response) => {
      dispatch({
        type: ACTIONS.AVAILABLE_SUBJECTS,
        payload: { availableSubjects: response.available_subjects },
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
    pay_ref: value.payRef,
    subjects: value.subjects.map((subject) => ({
      school_period_subject_teacher_id: subject.subjectId,
      qualification: parseInt(subject.nota, 10),
      status: subject.status,
    })),
  };
  return Student.addStudentPeriodSchool(payload)
    .then(() => {
      show('Inscripcion sastifactoria', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};

export const editStudentPeriodSchool = (value) => async (dispatch) => {
  const payload = {
    id: value.id,
    student_id: value.studentId,
    school_period_id: `${value.schoolPeriodId}`,
    pay_ref: value.payRef,
    subjects: value.subjects.map((subject) => ({
      school_period_subject_teacher_id: subject.subjectId,
      qualification: parseInt(subject.nota, 10),
      status: subject.status,
    })),
  };
  return Student.editStudentPeriodSchool(payload)
    .then(() => {
      show('Inscripcion modificada sastifactoriamente', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};

export const getInscribedSchoolPeriods = (studentId, idSchoolPeriod = null) => async (dispatch) => {
  return Student.getInscribedSchoolPeriods(studentId)
    .then((response) => {
      const res = response.enrolled_subjects.map((item) => ({
        ...item.school_period,
        inscriptions: item.enrolled_subjects,
      }));
      dispatch({
        type: ACTIONS.INSCRIBED_SCHOOL_PERIODS,
        payload: {
          inscribedSchoolPeriods: res,
        },
      });

      if (idSchoolPeriod) {
        console.log('entroo aca');
        const data = res.find((item) => parseInt(item.id, 10) === parseInt(idSchoolPeriod, 10));
        console.log(data);
        let data2 = data.inscriptions;
        /*      if (Array.isArray(data2))
          data2 = data.inscriptions.find(
            (item) => parseInt(item.student_id, 10) === parseInt(studentId, 10)
          ); */

        const inscription = {
          ...data2,
          ...data,
          // idInscription: data2.id,
        };
        console.log('fsdfdsfdsfdsf', inscription);
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

export const cleanSelectedInscribedSchoolPeriods = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.SELECTED_STUDENT_SCHOOL_PERIOD,
    payload: { selectedStudentSchoolPeriod: {} },
  });
};

export const cleanSelectedInscriptionSchoolPeriods = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.INSCRIBED_SCHOOL_PERIODS,
    payload: { inscribedSchoolPeriods: [] },
  });
};
