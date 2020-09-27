import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getAvailableSubjects,
  addStudentPeriodSchool,
  editStudentPeriodSchool,
  getInscribedSchoolPeriods,
  cleanSelectedInscribedSchoolPeriods,
} from '../../actions/student';

import { getList as getSchoolPeriodsList } from '../../actions/schoolPeriod';

import StudentInscription from '../../components/Students/inscription';
import { define, cleanDialog } from '../../actions/dialog';

class StudentInscriptionContainer extends Component {
  componentDidMount = () => {
    const {
      match: {
        params: { id, idSchoolPeriod },
      },
      defineDispatch,
      getSchoolPeriodsListDispatch,
      getInscribedSchoolPeriodsDispatch,
    } = this.props;
    getSchoolPeriodsListDispatch();
    getInscribedSchoolPeriodsDispatch(id, idSchoolPeriod);
    defineDispatch('estudiante');
  };

  componentWillUnmount = () => {
    const { cleanSelectedInscribedSchoolPeriodsDispatch, cleanDialogDispatch } = this.props;
    cleanSelectedInscribedSchoolPeriodsDispatch();
    cleanDialogDispatch();
  };

  saveInscription = (values) => {
    const {
      addStudentPeriodSchoolDispatch,
      editStudentPeriodSchoolDispatch,
      idInscription,
      match: {
        params: { id, idSchoolPeriod },
      },
    } = this.props;
    if (!idSchoolPeriod)
      addStudentPeriodSchoolDispatch({ ...values, studentId: id }).then(() => this.goBack());
    else
      editStudentPeriodSchoolDispatch({
        ...values,
        studentId: id,
        id: idInscription,
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const {
      schoolPeriods,
      subjects,
      match: {
        params: { id, idSchoolPeriod },
      },
      getAvailableSubjectsDispatch,
      subjectInscriptions,
      location: {
        state: { inscriptedSP, fullname },
      },
    } = this.props;
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
        studentId={id}
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
      id: PropTypes.string,
      idSchoolPeriod: PropTypes.number,
    }),
  }).isRequired,

  schoolPeriods: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })).isRequired,

  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      school_period_subject_teacher_id: PropTypes.number,
      data_subject: PropTypes.shape({
        subject: PropTypes.shape({
          subject_name: PropTypes.string,
          uc: PropTypes.number,
        }),
        duty: PropTypes.number,
      }),
    })
  ).isRequired,

  subjectInscriptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  location: PropTypes.shape({
    state: PropTypes.shape({
      inscriptedSP: PropTypes.string,
      fullname: PropTypes.string,
    }),
  }).isRequired,

  idInscription: PropTypes.number.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func }).isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  getSchoolPeriodsListDispatch: PropTypes.func.isRequired,
  getAvailableSubjectsDispatch: PropTypes.func.isRequired,
  getInscribedSchoolPeriodsDispatch: PropTypes.func.isRequired,
  cleanSelectedInscribedSchoolPeriodsDispatch: PropTypes.func.isRequired,
  addStudentPeriodSchoolDispatch: PropTypes.func.isRequired,
  editStudentPeriodSchoolDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  subjects: state.studentReducer.selectedStudentSchoolPeriod.enrolled_subjects,
  idInscription: state.studentReducer.selectedStudentSchoolPeriod.id,
  schoolPeriods: state.schoolPeriodReducer.list,
  subjectInscriptions: state.studentReducer.availableSubjects,
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
};

export default connect(mS, mD)(StudentInscriptionContainer);
