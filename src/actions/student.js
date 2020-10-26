import { Student } from '../services/student';
import { Constance } from '../services/constance';

import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'student/list',
  WARNING_STUDENTS: 'student/warning',
  SELECT: `student/select`,
  AVAILABLE_SUBJECTS: `student/subjects_inscription`,
  INSCRIBED_SCHOOL_PERIODS: `student/inscribed_school_periods`,
  UPDATE: `student/update`,
  CLEAN_SELECTED_STUDENT: `student/clean-selected`,
  SELECTED_STUDENT_SCHOOL_PERIOD: `student/selected_student_school_period`,
  SELECTED_SCHOOL_PROGRAM: `student/selected_school_program`,
  CLEAN_STUDENT_REDUCER: `student/clean_student_reducer`,
};

export const getList = () => async (dispatch) => {
  return Student.getStudentList()
    .then((response) => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const getWarningStudentsList = () => async (dispatch) => {
  return Student.getWarningStudentsList()
    .then((response) => {
      dispatch({ type: ACTIONS.WARNING_STUDENTS, payload: { warningStudents: response } });
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const findStudentById = (id) => async (dispatch) => {
  return Student.findStudentById(id)
    .then((response) => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedStudent: response },
      });
      return response;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
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
    payload: { selectedSchoolProgram: null },
  });
};

export const updateSchoolProgram = (student) => async (dispatch) => {
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
      throw error;
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

  return Student.saveSchoolProgram(payload, student.idUser)
    .then(() => {
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
      throw error;
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
      throw error;
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
    // degrees:student.degrees,
    equivalences: student.equivalence.length
      ? student.equivalence.map((item) => ({
          subject_id: item.subjectId,
          qualification: item.qualification,
        }))
      : undefined,
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
      show(error.message, 'error')(dispatch);
      throw error;
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
    guide_teacher_id: student.guideTeacherId,
    student_type: student.studentType,
    home_university: student.homeUniversity,
    // current_postgraduate:student.currentPostgraduate,
    type_income: student.typeIncome,
    is_ucv_teacher: student.isUcvTeacher,
    credits_granted: student.creditsGranted,
    with_work: student.withWork,
    // degrees:student.degrees,
    equivalences: student.equivalence.length
      ? student.equivalence.map((item) => ({
          subject_id: item.subjectId,
          qualification: item.qualification,
        }))
      : undefined,
  };

  return Student.saveStudent(payload)
    .then((res) => {
      show('Estudiante guardado', 'success')(dispatch);
      return res.id;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
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
      throw error;
    });
};

export const getAvailableSubjects = (studentId, schoolPeriodId) => async (dispatch) => {
  return Student.getAvailableSubjects(studentId, schoolPeriodId)
    .then((response) => {
      dispatch({
        type: ACTIONS.AVAILABLE_SUBJECTS,
        payload: {
          availableSubjects: response.available_subjects,
          finalWorkSubjects: response.final_work_subjects || response.project_subjects,
          availableDoctoralExam: response.available_doctoral_exam,
          approvedProjects: response.approved_projects,
        },
      });
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const cleanAvailableSubjects = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.AVAILABLE_SUBJECTS,
    payload: {
      availableSubjects: [],
      finalWorkSubjects: [],
      approvedProjects: [],
      availableDoctoralExam: false,
    },
  });
};

export const getConstance = (studentId, userType, constanceType) => async (dispatch) => {
  return Constance.getConstance(studentId, userType, constanceType)
    .then(() => {
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const addStudentPeriodSchool = (value) => async (dispatch) => {
  const payload = {
    student_id: value.studentId,
    school_period_id: value.schoolPeriodId,
    pay_ref: value.payRef,
    financing: value.financing,
    financing_description: value.financingDescription,
    amount_paid: value.amountPaid,
    doctoral_exam: value.doctoralExam
      ? {
          status: value.doctoralExam,
        }
      : undefined,
    final_works:
      value.finalWorks && value.finalWorks.length
        ? value.finalWorks.map((finalWork) => ({
            title: finalWork.title,
            status: finalWork.status,
            project_id: finalWork.projectId || undefined,
            subject_id: finalWork.subjectId,
            description_status: finalWork.descriptionStatus || undefined,
            approval_date: finalWork.approvalDate || undefined,
            advisors: finalWork.advisors ? [{ teacher_id: finalWork.advisors }] : undefined,
          }))
        : undefined,
    projects:
      value.projects && value.projects.length
        ? value.projects.map((project) => ({
            title: project.title,
            status: project.status,
            subject_id: project.subjectId,
            description_status: project.descriptionStatus || undefined,
            approval_date: project.approvalDate || undefined,
          }))
        : undefined,
    subjects: value.subjects.map((subject) => ({
      school_period_subject_teacher_id: subject.subjectId,
      qualification: subject.nota ? parseInt(subject.nota, 10) : undefined,
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
      throw error;
    });
};
export const deleteInscription = (id) => async (dispatch) => {
  return Student.deleteInscription(id)
    .then(() => {
      show('Inscripcion, eliminada!', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};
export const editStudentPeriodSchool = (value) => async (dispatch) => {
  const payload = {
    id: value.id,
    student_id: value.studentId,
    school_period_id: `${value.schoolPeriodId}`,
    pay_ref: value.payRef,
    financing: value.financing,
    financing_description: value.financingDescription,
    amount_paid: value.amountPaid,
    doctoral_exam: value.doctoralExam
      ? {
          status: value.doctoralExam,
        }
      : undefined,
    final_works:
      value.finalWorks && value.finalWorks.length
        ? value.finalWorks.map((finalWork) => ({
            title: finalWork.title,
            status: finalWork.status,
            description_status: finalWork.descriptionStatus || undefined,
            approval_date: finalWork.approvalDate || undefined,
            project_id: finalWork.projectId || undefined,
            subject_id: finalWork.subjectId,
            advisors: finalWork.advisors ? [{ teacher_id: finalWork.advisors }] : undefined,
          }))
        : undefined,
    projects:
      value.projects && value.projects.length
        ? value.projects.map((project) => ({
            description_status: project.descriptionStatus || undefined,
            approval_date: project.approvalDate || undefined,
            title: project.title,
            status: project.status,
            subject_id: project.subjectId,
          }))
        : undefined,
    subjects: value.subjects.map((subject) => ({
      school_period_subject_teacher_id: subject.subjectId,
      qualification: subject.nota ? parseInt(subject.nota, 10) : undefined,
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
      throw error;
    });
};

export const getInscribedSchoolPeriods = (studentId, idSchoolPeriod = null) => async (dispatch) => {
  return Student.getInscribedSchoolPeriods(studentId)
    .then((response) => {
      const res = response.enrolled_subjects;
      dispatch({
        type: ACTIONS.INSCRIBED_SCHOOL_PERIODS,
        payload: {
          inscribedSchoolPeriods: res,
        },
      });

      if (idSchoolPeriod) {
        const data = res.find(
          (item) => parseInt(item.school_period.id, 10) === parseInt(idSchoolPeriod, 10)
        );
        dispatch({
          type: ACTIONS.SELECTED_STUDENT_SCHOOL_PERIOD,
          payload: { selectedStudentSchoolPeriod: data },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: ACTIONS.INSCRIBED_SCHOOL_PERIODS,
        payload: {
          inscribedSchoolPeriods: [],
        },
      });
      show(error.message, 'error')(dispatch);
      return error;
    });
};

export const cleanSelectedInscribedSchoolPeriods = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.SELECTED_STUDENT_SCHOOL_PERIOD,
    payload: { selectedStudentSchoolPeriod: {} },
  });
};

export const cleanStudentReducer = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.CLEAN_STUDENT_REDUCER,
    payload: {},
  });
};

export const cleanSelectedInscriptionSchoolPeriods = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.INSCRIBED_SCHOOL_PERIODS,
    payload: { inscribedSchoolPeriods: [] },
  });
};
