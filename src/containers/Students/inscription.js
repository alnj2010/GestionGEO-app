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
} from '../../actions/student';

import { getList as getTeachersList } from '../../actions/teacher';
import { getList as getSubjectsList } from '../../actions/subject';

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
      getSubjectsListDispatch,
    } = this.props;
    findStudentByIdDispatch(userId);
    getSchoolPeriodsListDispatch();
    getTeachersListDispatch();
    getInscribedSchoolPeriodsDispatch(studentId, idSchoolPeriod);
    getSubjectsListDispatch();
    defineDispatch('inscripcion');
  };

  componentWillUnmount = () => {
    const {
      cleanSelectedInscribedSchoolPeriodsDispatch,
      cleanDialogDispatch,
      cleanSelectedStudentDispatch,
      cleanAvailableSubjectsDispatch,
    } = this.props;
    cleanSelectedInscribedSchoolPeriodsDispatch();
    cleanDialogDispatch();
    cleanSelectedStudentDispatch();
    cleanAvailableSubjectsDispatch();
  };

  saveInscription = (values) => {
    const {
      addStudentPeriodSchoolDispatch,
      editStudentPeriodSchoolDispatch,
      idInscription,
      finalWorkSubjects,
      finalWorkData,
      match: {
        params: { studentId, idSchoolPeriod },
      },
    } = this.props;

    let isProjectSubject = null;
    if (finalWorkSubjects && finalWorkSubjects.length) {
      isProjectSubject = finalWorkSubjects[0].is_project_subject;
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
      });
  };

  goBack = () => {
    const {
      history,
      match: {
        params: { studentId, userId },
      },
    } = this.props;
    history.push(`/estudiantes/inscripciones/${userId}/${studentId}`);
  };

  render() {
    const {
      schoolPeriods,
      subjects,
      allSubjects,
      match: {
        params: { studentId, idSchoolPeriod },
      },
      getAvailableSubjectsDispatch,
      availableSubjects,
      inscriptedSP,
      student,
      finalWorkSubjects,
      approvedProjects,
      availableDoctoralExam,
      teachers,
      finalWorkData,
    } = this.props;

    const fullname = `${student.first_name} ${student.second_name || ''} ${student.first_surname} ${
      student.second_surname || ''
    }`;
    console.log(finalWorkSubjects, finalWorkData);
    return (
      <StudentInscription
        teachers={teachers}
        schoolPeriods={schoolPeriods.filter(
          (sp) =>
            !inscriptedSP.some(
              (isp) => isp.id === sp.id && parseInt(isp.id, 10) !== parseInt(idSchoolPeriod, 10)
            )
        )}
        saveInscription={this.saveInscription}
        goBack={this.goBack}
        studentId={studentId}
        idSchoolPeriod={idSchoolPeriod}
        finalWorkSubjects={finalWorkSubjects}
        approvedProjects={approvedProjects}
        availableDoctoralExam={availableDoctoralExam}
        allSubjects={allSubjects}
        subjects={
          subjects
            ? subjects.map((item) => ({
                id: item.school_period_subject_teacher_id,
                subject_name: item.data_subject.subject.name,
                duty: item.data_subject.duty,
                subject: { uc: item.data_subject.subject.uc },
              }))
            : []
        }
        getAvailableSubjects={getAvailableSubjectsDispatch}
        availableSubjects={availableSubjects}
        fullname={fullname}
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
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      school_period_subject_teacher_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      data_subject: PropTypes.shape({
        subject: PropTypes.shape({
          subject_name: PropTypes.string,
          uc: PropTypes.number,
        }),
        duty: PropTypes.number,
      }),
    })
  ),
  student: PropTypes.shape({
    first_name: PropTypes.string,
    second_name: PropTypes.string,
    first_surname: PropTypes.string,
    second_surname: PropTypes.string,
  }).isRequired,
  availableSubjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  inscriptedSP: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
  getTeachersListDispatch: PropTypes.func.isRequired,
};

StudentInscriptionContainer.defaultProps = {
  subjects: [],
  idInscription: null,
  finalWorkSubjects: [],
  approvedProjects: [],
  availableDoctoralExam: false,
};

const mS = (state) => ({
  allSubjects: state.subjectReducer.list,
  subjects: state.studentReducer.selectedStudentSchoolPeriod.enrolled_subjects,
  finalWorkData: state.studentReducer.selectedStudentSchoolPeriod.final_work_data,
  idInscription: state.studentReducer.selectedStudentSchoolPeriod.id,
  schoolPeriods: state.schoolPeriodReducer.list,
  availableSubjects: state.studentReducer.availableSubjects,
  finalWorkSubjects: state.studentReducer.finalWorkSubjects,
  approvedProjects: state.studentReducer.approvedProjects,
  availableDoctoralExam: state.studentReducer.availableDoctoralExam,
  inscriptedSP: state.studentReducer.inscribedSchoolPeriods,
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
  getSubjectsListDispatch: getSubjectsList,
};

export default connect(mS, mD)(StudentInscriptionContainer);
