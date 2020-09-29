import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog } from '../../actions/dialog';
import { getCoursesList } from '../../actions/myCourse';
import MyCoursesList from '../../components/MyCourses';

class MisCursosContainer extends Component {
  componentDidMount = () => {
    const { getCoursesListDispatch, defineDispatch } = this.props;
    getCoursesListDispatch();
    defineDispatch('cursos');
  };

  componentWillUnmount = () => {
    const { cleanDialogDispatch } = this.props;
    cleanDialogDispatch();
  };

  render() {
    const { myCourses, history } = this.props;
    return <MyCoursesList history={history} myCourses={myCourses} />;
  }
}

MisCursosContainer.propTypes = {
  myCourses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  getCoursesListDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  myCourses: state.myCourseReducer.list,
});

const mD = {
  getCoursesListDispatch: getCoursesList,
  cleanDialogDispatch: cleanDialog,
  defineDispatch: define,
};

export default connect(mS, mD)(MisCursosContainer);
