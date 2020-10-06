import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
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
    const { myCourses, history, showDispatch } = this.props;
    return <MyCoursesList history={history} myCourses={myCourses} show={showDispatch} />;
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
  showDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  myCourses: state.myCourseReducer.list,
});

const mD = {
  getCoursesListDispatch: getCoursesList,
  cleanDialogDispatch: cleanDialog,
  defineDispatch: define,
  showDispatch: show,
};

export default connect(mS, mD)(MisCursosContainer);
