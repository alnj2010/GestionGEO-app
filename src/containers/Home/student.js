import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentHome from '../../components/Home/student'

export class StudentHomeContainer extends Component {
  componentDidMount = () => {
  };
  componentWillUnmount = () => {
  };

  render() {
    const {
    } = this.props;

    return (
        <StudentHome/>
    );
  }
}

StudentHomeContainer.propTypes = {

};

const mS = state => ({
});

const mD = {

};

StudentHomeContainer = connect(
  mS,
  mD,
)(StudentHomeContainer);

export default StudentHomeContainer;
