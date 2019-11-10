import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentConstance from '../../components/Constance/student'


export class StudentConstanceContainer extends Component {

  render() {
    const id = sessionStorage.getItem('studentId');

    return (
        <StudentConstance id={id}/>
    );
  }
}

StudentConstanceContainer.propTypes = {

};
const mS = state => ({
});

const mD = {
};
StudentConstanceContainer = connect(
  mS,
  mD,
)(StudentConstanceContainer);

export default StudentConstanceContainer;
