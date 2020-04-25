import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeacherHome from '../../components/Home/teacher';

class TeacherHomeContainer extends Component {
  componentDidMount = () => {};

  componentWillUnmount = () => {};

  render() {
    // const {
    // } = this.props;

    return <TeacherHome />;
  }
}

TeacherHomeContainer.propTypes = {};

const mS = (state) => ({});

const mD = {};

TeacherHomeContainer = connect(mS, mD)(TeacherHomeContainer);

export default TeacherHomeContainer;
