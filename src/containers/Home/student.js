import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StudentHome from '../../components/Home/student';
import { findMiPerfil, cleanSelectedMiPerfil } from '../../actions/miPerfil';
import { define, cleanDialog, show } from '../../actions/dialog';
import {
  getCurrentEnrolledSubjects,
  cleanGetCurrentEnrolledSubjects,
  withdrawSubjects,
} from '../../actions/studentInscription';

import { getSessionStudentId } from '../../storage/sessionStorage';
import { WEEKDAYS } from '../../services/constants';

class StudentHomeContainer extends Component {
  componentDidMount = () => {
    const { getCurrentEnrolledSubjectsDispatch, findMiPerfilDispatch, defineDispatch } = this.props;
    const id = getSessionStudentId();
    getCurrentEnrolledSubjectsDispatch(id);
    findMiPerfilDispatch();
    document.querySelectorAll('.rbc-header').forEach((column, index) => {
      // eslint-disable-next-line no-param-reassign
      column.innerText = WEEKDAYS[index];
    });
    defineDispatch('asignatura');
  };

  componentWillUnmount = () => {
    const {
      cleanDialogDispatch,
      cleanSelectedMiPerfilDispatch,
      cleanGetCurrentEnrolledSubjectsDispatch,
    } = this.props;
    cleanSelectedMiPerfilDispatch();
    cleanGetCurrentEnrolledSubjectsDispatch();
    cleanDialogDispatch();
  };

  handleRetireSubject = (id) => {
    const { getCurrentEnrolledSubjectsDispatch, withdrawSubjectsDispatch } = this.props;
    const idStudent = getSessionStudentId();
    withdrawSubjectsDispatch(id, idStudent).then(() =>
      getCurrentEnrolledSubjectsDispatch(idStudent)
    );
  };

  render() {
    const {
      miPerfil,
      currentSubjects,
      codSchoolPeriod,
      finalWorks,
      withdrawalDeadline,
      showDispatch,
    } = this.props;
    return (
      <StudentHome
        miPerfil={miPerfil}
        currentSubjects={currentSubjects}
        finalWorks={finalWorks}
        codSchoolPeriod={codSchoolPeriod}
        withdrawalDeadline={withdrawalDeadline}
        show={showDispatch}
        handleRetireSubject={this.handleRetireSubject}
      />
    );
  }
}

StudentHomeContainer.propTypes = {
  miPerfil: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  currentSubjects: PropTypes.arrayOf(PropTypes.shape({})),
  withdrawSubjectsDispatch: PropTypes.func.isRequired,
  findMiPerfilDispatch: PropTypes.func.isRequired,
  getCurrentEnrolledSubjectsDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  cleanSelectedMiPerfilDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  cleanGetCurrentEnrolledSubjectsDispatch: PropTypes.func.isRequired,
  showDispatch: PropTypes.func.isRequired,
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
  withdrawalDeadline: state.schoolPeriodReducer.selectedSchoolPeriod.withdrawal_deadline,
});

const mD = {
  findMiPerfilDispatch: findMiPerfil,
  getCurrentEnrolledSubjectsDispatch: getCurrentEnrolledSubjects,
  withdrawSubjectsDispatch: withdrawSubjects,
  cleanDialogDispatch: cleanDialog,
  cleanSelectedMiPerfilDispatch: cleanSelectedMiPerfil,
  cleanGetCurrentEnrolledSubjectsDispatch: cleanGetCurrentEnrolledSubjects,
  defineDispatch: define,
  showDispatch: show,
};

export default connect(mS, mD)(StudentHomeContainer);
