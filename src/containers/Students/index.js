import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteStudent } from '../../actions/student';
import StudentsList from '../../components/Students';

export class StudentsListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const { getList, define } = this.props;
    getList().then(() => this.setState({ isLoading: false }));
    define('Estudiante');
  };

  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  handleDeleteStudent = (id) => {
    const { getList, deleteStudent } = this.props;
    deleteStudent(id).then((res) => getList());
  };

  render() {
    const { students, history, show } = this.props;
    const { isLoading } = this.state;
    return (
      <StudentsList
        students={students}
        isLoading={isLoading}
        history={history}
        handleStudentDetail={this.handleStudentDetail}
        handleDeleteStudent={this.handleDeleteStudent}
        show={show}
      />
    );
  }
}

StudentsListContainer.propTypes = {
  students: array,
  history: object.isRequired,
  getList: func.isRequired,
  deleteStudent: func.isRequired,
};

const mS = (state) => ({
  students: state.studentReducer.list,
});

const mD = {
  getList,
  deleteStudent,
  cleanDialog,
  define,
  show,
};

StudentsListContainer = connect(mS, mD)(StudentsListContainer);

export default StudentsListContainer;
