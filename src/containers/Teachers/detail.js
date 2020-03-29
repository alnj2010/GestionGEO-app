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
import { getList as getSchoolProgramList } from '../../actions/schoolProgram';
import TeacherDetail from '../../components/Teachers/detail';
import { define, cleanDialog } from '../../actions/dialog';
export class TeacherDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findTeacherById, define } = this.props;
    if (match.params.id) findTeacherById(match.params.id);
    this.props.getSchoolProgramList();
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
      teacher,
      schoolPrograms
    } = this.props;
    return (
      <TeacherDetail
        schoolPrograms={schoolPrograms}
        saveTeacher={this.saveTeacher}
        goBack={this.goBack}
        teacherId={teacher.id}
        teacher={teacher}
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
  schoolPrograms: state.schoolProgramReducer.list,
});

const mD = {
  findTeacherById,
  updateTeacher,
  saveTeacher,
  deleteTeacher,
  define,
  cleanSelectedTeacher,
  cleanDialog,
  getSchoolProgramList
};

TeacherDetailContainer = connect(
  mS,
  mD,
)(TeacherDetailContainer);

export default TeacherDetailContainer;
