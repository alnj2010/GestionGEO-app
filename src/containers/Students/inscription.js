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
} from '../../actions/student';

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
    } = this.props;
    findStudentByIdDispatch(userId);
    getSchoolPeriodsListDispatch();
    getInscribedSchoolPeriodsDispatch(studentId, idSchoolPeriod);
    defineDispatch('estudiante');
  };

  componentWillUnmount = () => {
    const {
      cleanSelectedInscribedSchoolPeriodsDispatch,
      cleanDialogDispatch,
      cleanSelectedStudentDispatch,
    } = this.props;
    cleanSelectedInscribedSchoolPeriodsDispatch();
    cleanDialogDispatch();
    cleanSelectedStudentDispatch();
  };

  saveInscription = (values) => {
    const {
      addStudentPeriodSchoolDispatch,
      editStudentPeriodSchoolDispatch,
      idInscription,
      match: {
        params: { studentId, idSchoolPeriod },
      },
    } = this.props;
    if (!idSchoolPeriod)
      addStudentPeriodSchoolDispatch({ ...values, studentId }).then(() => this.goBack());
    else
      editStudentPeriodSchoolDispatch({
        ...values,
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
      match: {
        params: { studentId, idSchoolPeriod },
      },
      getAvailableSubjectsDispatch,
      subjectInscriptions,
      inscriptedSP,
      student,
    } = this.props;

    const fullname = `${student.first_name} ${student.second_name || ''} ${student.first_surname} ${
      student.second_surname || ''
    }`;

    return (
      <StudentInscription
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
        subjectInscriptions={subjectInscriptions}
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
  subjectInscriptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

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
};

StudentInscriptionContainer.defaultProps = {
  subjects: [],
  idInscription: null,
};

const mS = (state) => ({
  subjects: state.studentReducer.selectedStudentSchoolPeriod.enrolled_subjects,
  idInscription: state.studentReducer.selectedStudentSchoolPeriod.id,
  schoolPeriods: state.schoolPeriodReducer.list,
  subjectInscriptions: state.studentReducer.availableSubjects,
  inscriptedSP: state.studentReducer.inscribedSchoolPeriods,
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
  cleanSelectedStudentDispatch: cleanSelectedStudent,
};

export default connect(mS, mD)(StudentInscriptionContainer);
