import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StudentHome from '../../components/Home/student';
import { findMiPerfil } from '../../actions/miPerfil';

import { getCurrentEnrolledSubjects } from '../../actions/studentInscription';

import { getSessionStudentId } from '../../storage/sessionStorage';
import { WEEKDAYS } from '../../services/constants';

class StudentHomeContainer extends Component {
  componentDidMount = () => {
    const { getCurrentEnrolledSubjectsDispatch, findMiPerfilDispatch } = this.props;
    const id = getSessionStudentId();
    getCurrentEnrolledSubjectsDispatch(id);
    findMiPerfilDispatch();
    document.querySelectorAll('.rbc-header').forEach((column, index) => {
      // eslint-disable-next-line no-param-reassign
      column.innerText = WEEKDAYS[index];
    });
  };

  render() {
    const { miPerfil, currentSubjects, codSchoolPeriod, finalWorks } = this.props;

    return (
      <StudentHome
        miPerfil={miPerfil}
        currentSubjects={currentSubjects}
        finalWorks={finalWorks}
        codSchoolPeriod={codSchoolPeriod}
      />
    );
  }
}

StudentHomeContainer.propTypes = {
  miPerfil: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  currentSubjects: PropTypes.arrayOf(PropTypes.shape({})),

  findMiPerfilDispatch: PropTypes.func.isRequired,
  getCurrentEnrolledSubjectsDispatch: PropTypes.func.isRequired,
};
StudentHomeContainer.defaultProps = {
  currentSubjects: null,
};

const mS = (state) => ({
  miPerfil: state.miPerfilReducer.selectedMiPerfil,
  currentSubjects: state.studentInscriptionReducer.currentEnrolledSubjects.enrolled_subjects,
  finalWorks:
    state.studentInscriptionReducer.currentEnrolledSubjects.final_work ||
    state.studentInscriptionReducer.currentEnrolledSubjects.project ||
    [],
  codSchoolPeriod: state.studentInscriptionReducer.currentEnrolledSubjects.school_period
    ? state.studentInscriptionReducer.currentEnrolledSubjects.school_period.cod_school_period
    : '',
});

const mD = {
  findMiPerfilDispatch: findMiPerfil,
  getCurrentEnrolledSubjectsDispatch: getCurrentEnrolledSubjects,
};

export default connect(mS, mD)(StudentHomeContainer);
