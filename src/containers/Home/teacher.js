import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeacherHome from '../../components/Home/teacher';
import { getCoursesList, cleanGetCoursesList } from '../../actions/myCourse';
import { findMiPerfil, cleanSelectedMiPerfil } from '../../actions/miPerfil';
import { getSessionTeacherId } from '../../storage/sessionStorage';
import { WEEKDAYS } from '../../services/constants';

class TeacherHomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const { getCoursesListDispatch } = this.props;
    const id = getSessionTeacherId();
    getCoursesListDispatch(id)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false }));
    document.querySelectorAll('.rbc-header').forEach((column, index) => {
      // eslint-disable-next-line no-param-reassign
      column.innerText = WEEKDAYS[index];
    });
  };

  componentWillUnmount = () => {
    const { cleanGetCoursesListDispatch } = this.props;
    cleanGetCoursesListDispatch();
  };

  render() {
    const { myCourses, codSchoolPeriod } = this.props;
    const { isLoading } = this.state;

    return (
      <TeacherHome myCourses={myCourses} codSchoolPeriod={codSchoolPeriod} isLoading={isLoading} />
    );
  }
}

TeacherHomeContainer.propTypes = {};

const mS = (state) => ({
  myCourses: state.myCourseReducer.list,
  codSchoolPeriod: state.schoolPeriodReducer.selectedSchoolPeriod.cod_school_period,
});

const mD = {
  getCoursesListDispatch: getCoursesList,
  findMiPerfilDispatch: findMiPerfil,
  cleanGetCoursesListDispatch: cleanGetCoursesList,
  cleanSelectedMiPerfilDispatch: cleanSelectedMiPerfil,
};

export default connect(mS, mD)(TeacherHomeContainer);
