import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentHome from '../../components/Home/student';
import { findMiPerfil } from '../../actions/miPerfil';

import { getCurrentEnrolledSubjects } from '../../actions/studentInscription';

import { getSessionStudentId } from '../../storage/sessionStorage';

export class StudentHomeContainer extends Component {
  componentDidMount = () => {
    const { getCurrentEnrolledSubjects, findMiPerfil } = this.props;
    const id = getSessionStudentId();
    getCurrentEnrolledSubjects(id);
    findMiPerfil();
    const weekDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
    document.querySelectorAll('.rbc-header').forEach((column, index) => {
      column.innerText = weekDays[index];
    });
  };

  render() {
    const { miPerfil, currentSubjects } = this.props;

    return <StudentHome miPerfil={miPerfil} currentSubjects={currentSubjects} />;
  }
}

StudentHomeContainer.propTypes = {};

const mS = (state) => ({
  miPerfil: state.miPerfilReducer.selectedMiPerfil,
  currentSubjects: state.studentInscriptionReducer.currentEnrolledSubjects.enrolled_subjects,
});

const mD = {
  findMiPerfil,
  getCurrentEnrolledSubjects,
};

StudentHomeContainer = connect(mS, mD)(StudentHomeContainer);

export default StudentHomeContainer;
