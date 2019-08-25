import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import {
  findStudentById,
  updateStudent,
  deleteStudent,
  cleanSelectedStudent,
  saveStudent,
} from '../../actions/student';
import { getList as getPostgraduateList } from '../../actions/postgraduate';
import StudentDetail from '../../components/Students/detail';
import { define, cleanDialog } from '../../actions/dialog';
export class StudentDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findStudentById, define } = this.props;
    if (match.params.id) findStudentById(match.params.id);
    this.props.getPostgraduateList();
    define('estudiante');
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedStudent();
    this.props.cleanDialog();
    
  };

  saveStudent = values => {
    const {
      match,
      updateStudent,
      findStudentById,
      saveStudent,
      history,
    } = this.props;
    const payload = { ...values };
    if (match.params.id) updateStudent({ ...payload, ...match.params });
    else
      saveStudent({ ...payload }).then(response => {
        if (response) {
          findStudentById(response).then(res => history.push(`edit/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleStudentDelete = () => {
    const { deleteStudent, history, match } = this.props;
    deleteStudent(match.params.id).then(res => history.push('/estudiantes'));
  };


  render() {
    const {
      student: { id },
      postgraduates
    } = this.props;
    return (
      <StudentDetail
        postgraduates={postgraduates}
        saveStudent={this.saveStudent}
        goBack={this.goBack}
        studentId={id}
        handleStudentDelete={this.handleStudentDelete}
      />
    );
  }
}

StudentDetailContainer.propTypes = {
  deleteStudent: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  updateStudent: func.isRequired,
  findStudentById: func.isRequired,
  saveStudent: func.isRequired,
};

const mS = state => ({
  student: state.studentReducer.selectedStudent,
  postgraduates: state.postgraduateReducer.list,
});

const mD = {
  findStudentById,
  updateStudent,
  saveStudent,
  deleteStudent,
  define,
  cleanSelectedStudent,
  cleanDialog,
  getPostgraduateList
};

StudentDetailContainer = connect(
  mS,
  mD,
)(StudentDetailContainer);

export default StudentDetailContainer;
