import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getCoursesList } from '../../actions/myCourse';
import MyCoursesList from '../../components/MyCourses';

class MisCursosContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const { getCoursesList, define } = this.props;
    getCoursesList();
    define('cursos');
  };

  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  render() {
    const { myCourses, history } = this.props;
    return <MyCoursesList history={history} myCourses={myCourses} />;
  }
}

MisCursosContainer.propTypes = {
  myCourses: array,
  history: object.isRequired,
  getCoursesList: func.isRequired,
};

const mS = (state) => ({
  myCourses: state.myCourseReducer.list,
});

const mD = {
  getCoursesList,
  cleanDialog,
  define,
  show,
};

MisCursosContainer = connect(mS, mD)(MisCursosContainer);

export default MisCursosContainer;
