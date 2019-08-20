import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import {
  findTeacherById,
  updateTeacher,
  deleteTeacher,
  cleanSelectedTeacher,
  saveTeacher,
} from '../../actions/teacher';
import { getList as getPostgraduateList } from '../../actions/postgraduate';
import TeacherDetail from '../../components/Teachers/detail';
import { define, cleanDialog } from '../../actions/dialog';
export class TeacherDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findTeacherById, define } = this.props;
    console.log(match.params.id);
    if (match.params.id) findTeacherById(match.params.id);
    this.props.getPostgraduateList();
    define('profesor');
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedTeacher();
    this.props.cleanDialog();
    
  };

  saveTeacher = values => {
    const {
      match,
      updateTeacher,
      findTeacherById,
      saveTeacher,
      history,
    } = this.props;
    const payload = { ...values };
    if (match.params.id) updateTeacher({ ...payload, ...match.params });
    else
      saveTeacher({ ...payload }).then(response => {
        if (response) {
          findTeacherById(response).then(res => history.push(`edit/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleTeacherDelete = () => {
    const { deleteTeacher, history, match } = this.props;
    deleteTeacher(match.params.id).then(res => history.push('/profesores'));
  };


  render() {
    const {
      teacher: { id },
      postgraduates
    } = this.props;
    console.log('dasdsad',id);
    return (
      <TeacherDetail
        postgraduates={postgraduates}
        saveTeacher={this.saveTeacher}
        goBack={this.goBack}
        teacherId={id}
        handleTeacherDelete={this.handleTeacherDelete}
      />
    );
  }
}

TeacherDetailContainer.propTypes = {
  deleteTeacher: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  updateTeacher: func.isRequired,
  findTeacherById: func.isRequired,
  saveTeacher: func.isRequired,
};

const mS = state => ({
  teacher: state.teacherReducer.selectedTeacher,
  postgraduates: state.postgraduateReducer.list,
});

const mD = {
  findTeacherById,
  updateTeacher,
  saveTeacher,
  deleteTeacher,
  define,
  cleanSelectedTeacher,
  cleanDialog,
  getPostgraduateList
};

TeacherDetailContainer = connect(
  mS,
  mD,
)(TeacherDetailContainer);

export default TeacherDetailContainer;
