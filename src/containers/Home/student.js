import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentHome from '../../components/Home/student'
import {
    findStudentById,
  } from '../../actions/student';

export class StudentHomeContainer extends Component {
  componentDidMount = () => {
    const { findStudentById } = this.props;
    const id = sessionStorage.getItem('id');
    if (id) findStudentById(id);
  };
  componentWillUnmount = () => {
  };

  render() {
    const {
        student
    } = this.props;

    console.log(student)
    return (
        <StudentHome/>
    );
  }
}

StudentHomeContainer.propTypes = {

};

const mS = state => ({
    student: state.studentReducer.selectedStudent,
});

const mD = {
    findStudentById
};

StudentHomeContainer = connect(
  mS,
  mD,
)(StudentHomeContainer);

export default StudentHomeContainer;
