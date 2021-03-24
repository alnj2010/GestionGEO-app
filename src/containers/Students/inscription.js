import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getAvailableSubjects,
  addStudentPeriodSchool,
  editStudentPeriodSchool,
  getInscribedSchoolPeriods,
  cleanSelectedInscribedSchoolPeriods,
  findStudentById,
  cleanSelectedStudent,
  cleanAvailableSubjects,
  cleanStudentReducer,
} from '../../actions/student';

import { getList as getTeachersList } from '../../actions/teacher';

import { getList as getSchoolPeriodsList } from '../../actions/schoolPeriod';

import StudentInscription from '../../components/Students/inscription';
import { define, cleanDialog } from '../../actions/dialog';

class StudentInscriptionContainer extends Component {
  componentDidMount = () => {
    const {
      match: {
        params: { userId, studentId, idSchoolPeriod },
      },
      defineDispatch,
      getSchoolPeriodsListDispatch,
      getInscribedSchoolPeriodsDispatch,
      findStudentByIdDispatch,
      getTeachersListDispatch,
      getAvailableSubjectsDispatch,
    } = this.props;
    if (idSchoolPeriod) {
      getAvailableSubjectsDispatch(studentId, idSchoolPeriod);
    }
    getInscribedSchoolPeriodsDispatch(studentId, idSchoolPeriod);
    findStudentByIdDispatch(userId);

    getSchoolPeriodsListDispatch();
    getTeachersListDispatch();
    defineDispatch('inscripcion');
  };

  componentWillUnmount = () => {
    const {
      cleanSelectedInscribedSchoolPeriodsDispatch,
      cleanDialogDispatch,
      cleanSelectedStudentDispatch,
      cleanAvailableSubjectsDispatch,
      cleanStudentReducerDispatch,
    } = this.props;
    cleanSelectedInscribedSchoolPeriodsDispatch();
    cleanDialogDispatch();
    cleanSelectedStudentDispatch();
    cleanAvailableSubjectsDispatch();
    cleanStudentReducerDispatch();
  };

  saveInscription = (values) => {
    const {
      addStudentPeriodSchoolDispatch,
      editStudentPeriodSchoolDispatch,
      idInscription,
      finalWorkSubjects,
      finalWorkData,
      getAvailableSubjectsDispatch,
      match: {
        params: { studentId, idSchoolPeriod },
      },
    } = this.props;
    let isProjectSubject = null;
    if (finalWorkSubjects && finalWorkSubjects.length) {
      isProjectSubject = finalWorkSubjects[0].isProject;
    } else if (finalWorkData && finalWorkData[0]) {
      isProjectSubject = finalWorkData[0].final_work.is_project;
    }
    let payload = { ...values };
    if (isProjectSubject) {
      payload = { ...values, projects: values.finalWorks, finalWorks: [] };
    }

    if (!idSchoolPeriod)
      addStudentPeriodSchoolDispatch({ ...payload, studentId }).then(() => this.goBack());
    else
      editStudentPeriodSchoolDispatch({
        ...payload,
        studentId,
        id: idInscription,
      }).then(() => getAvailableSubjectsDispatch(studentId, idSchoolPeriod));
  };

  goBack = () => {
    const {
      history,
      match: {
        params: { studentId, userId, idSchoolPeriod },
      },
    } = this.props;
    history.push(`/usuarios/estudiantes/inscripciones/${userId}/${studentId}`);
  };

  render() {
    const {
      schoolPeriods,
      match: {
        params: { studentId, idSchoolPeriod },
      },
      getAvailableSubjectsDispatch,
      availableSubjects,
      schoolPeriodsInscripted,
      student,
      finalWorkSubjects,
      approvedProjects,
      availableDoctoralExam,
      teachers,
    } = this.props;
    const fullname = student.first_name
      ? `${student.first_name} ${student.second_name || ''} ${student.first_surname} ${
          student.second_surname || ''
        }`
      : 'Cargando...';
    const schoolPeriodInscripted = schoolPeriodsInscripted.find(
      (sp) => sp.school_period_id === parseInt(idSchoolPeriod, 10)
    );
    let finalWorkEnrolled = [];

    if (schoolPeriodInscripted) {
      finalWorkEnrolled = schoolPeriodInscripted.final_work_data.map(
        (item) => item.final_work.subject
      );
    }

    const schoolPeriodByStudent =
      student.student.find((item) => item.school_program_id === parseInt(studentId, 10)) || {};
    return (
      <StudentInscription
        teachers={teachers}
        schoolPeriods={schoolPeriods.filter(
          (sp) =>
            !schoolPeriodsInscripted.some(
              (isp) =>
                isp.school_period_id === sp.id &&
                parseInt(isp.school_period_id, 10) !== parseInt(idSchoolPeriod, 10)
            )
        )}
        saveInscription={this.saveInscription}
        goBack={this.goBack}
        studentId={studentId}
        idSchoolPeriod={idSchoolPeriod}
        finalWorkSubjects={finalWorkSubjects.concat(
          finalWorkEnrolled
            ? finalWorkEnrolled.map((item) => ({
                id: idSchoolPeriod,
                value: item.id,
                key: item.name,
              }))
            : []
        )}
        finalWorkEnrolled={finalWorkEnrolled}
        approvedProjects={approvedProjects}
        availableDoctoralExam={availableDoctoralExam}
        getAvailableSubjects={getAvailableSubjectsDispatch}
        availableSubjects={availableSubjects}
        fullname={fullname}
        {...schoolPeriodByStudent}
      />
    );
  }
}

StudentInscriptionContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      studentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      idSchoolPeriod: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  }).isRequired,

  schoolPeriods: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) })
  ).isRequired,
  finalWorkSubjects: PropTypes.arrayOf(PropTypes.shape({})),
  approvedProjects: PropTypes.arrayOf(PropTypes.shape({})),
  availableDoctoralExam: PropTypes.bool,
  finalWorkData: PropTypes.arrayOf(
    PropTypes.shape({
      is_project_subject: PropTypes.bool,
    })
  ).isRequired,
  student: PropTypes.shape({
    first_name: PropTypes.string,
    second_name: PropTypes.string,
    first_surname: PropTypes.string,
    second_surname: PropTypes.string,
  }).isRequired,
  availableSubjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  schoolPeriodsInscripted: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  idInscription: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defineDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func, push: PropTypes.func }).isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  getSchoolPeriodsListDispatch: PropTypes.func.isRequired,
  getAvailableSubjectsDispatch: PropTypes.func.isRequired,
  getInscribedSchoolPeriodsDispatch: PropTypes.func.isRequired,
  cleanSelectedInscribedSchoolPeriodsDispatch: PropTypes.func.isRequired,
  addStudentPeriodSchoolDispatch: PropTypes.func.isRequired,
  editStudentPeriodSchoolDispatch: PropTypes.func.isRequired,
  findStudentByIdDispatch: PropTypes.func.isRequired,
  cleanSelectedStudentDispatch: PropTypes.func.isRequired,
  cleanAvailableSubjectsDispatch: PropTypes.func.isRequired,
  cleanStudentReducerDispatch: PropTypes.func.isRequired,
  getTeachersListDispatch: PropTypes.func.isRequired,
};

StudentInscriptionContainer.defaultProps = {
  idInscription: null,
  finalWorkSubjects: [],
  approvedProjects: [],
  availableDoctoralExam: false,
};

const mS = (state) => ({
  finalWorkData: state.studentReducer.selectedStudentSchoolPeriod.final_work_data,
  idInscription: state.studentReducer.selectedStudentSchoolPeriod.id,
  schoolPeriods: state.schoolPeriodReducer.list,
  availableSubjects: state.studentReducer.availableSubjects
    .map((item) => {
      return {
        id: state.form.inscripcion.values.schoolPeriodId,
        key: item.subject.name,
        value: item.id,
        duty: item.duty,
        uc: item.subject.uc,
      };
    })
    .concat(
      state.studentReducer.selectedStudentSchoolPeriod.enrolled_subjects
        ? state.studentReducer.selectedStudentSchoolPeriod.enrolled_subjects.map((item) => ({
            id: state.form.inscripcion.values.schoolPeriodId,
            key: item.data_subject.subject.name,
            value: item.school_period_subject_teacher_id,
            duty: item.data_subject.duty,
            uc: item.data_subject.subject.uc,
          }))
        : []
    ),
  finalWorkSubjects:
    state.studentReducer.finalWorkSubjects &&
    state.studentReducer.finalWorkSubjects
      .map((item) => ({
        id: state.form.inscripcion.values.schoolPeriodId,
        key: item.name,
        value: item.id,
        is_final_subject: item.is_final_subject,
        isProject: item.is_project_subject,
      }))
      .concat([]),
  approvedProjects: state.studentReducer.approvedProjects,
  availableDoctoralExam: state.studentReducer.availableDoctoralExam,
  schoolPeriodsInscripted: state.studentReducer.inscribedSchoolPeriods,
  teachers: state.teacherReducer.list,
  student: state.studentReducer.selectedStudent,
});

const mD = {
  defineDispatch: define,
  cleanDialogDispatch: cleanDialog,
  getSchoolPeriodsListDispatch: getSchoolPeriodsList,
  getAvailableSubjectsDispatch: getAvailableSubjects,
  getInscribedSchoolPeriodsDispatch: getInscribedSchoolPeriods,
  cleanSelectedInscribedSchoolPeriodsDispatch: cleanSelectedInscribedSchoolPeriods,
  addStudentPeriodSchoolDispatch: addStudentPeriodSchool,
  editStudentPeriodSchoolDispatch: editStudentPeriodSchool,
  findStudentByIdDispatch: findStudentById,
  getTeachersListDispatch: getTeachersList,
  cleanSelectedStudentDispatch: cleanSelectedStudent,
  cleanAvailableSubjectsDispatch: cleanAvailableSubjects,
  cleanStudentReducerDispatch: cleanStudentReducer,
};

export default connect(mS, mD)(StudentInscriptionContainer);
