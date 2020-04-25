import React, { Component } from 'react';
import StudentConstanceContainer from '../../containers/Constance/student';
import TeacherConstanceContainer from '../../containers/Constance/teacher';
import { getSessionUserRol } from '../../storage/sessionStorage';

class Constance extends Component {
  render() {
    const rol = getSessionUserRol();

    switch (rol) {
      case 'T':
        return <TeacherConstanceContainer />;

      case 'S':
        return <StudentConstanceContainer />;

      default:
        return null;
    }
  }
}

Constance.propTypes = {};

export default Constance;
