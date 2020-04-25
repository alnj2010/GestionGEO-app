import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  findTeacherById,
  updateTeacher,
  deleteTeacher,
  cleanSelectedTeacher,
  saveTeacher,
} from '../../actions/teacher';
import { getList } from '../../actions/schoolProgram';
import TeacherDetail from '../../components/Teachers/detail';
import { define, cleanDialog } from '../../actions/dialog';

export class TeacherDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findTeacherByIdDispatch, defineDispatch, getListDispatch } = this.props;
    if (match.params.id) findTeacherByIdDispatch(match.params.id);
    getListDispatch();
    defineDispatch('profesor');
  };

  componentWillUnmount = () => {
    const { cleanSelectedTeacherDispatch, cleanDialogDispatch } = this.props;
    cleanSelectedTeacherDispatch();
    cleanDialogDispatch();
  };

  saveTeacher = (values) => {
    const {
      match,
      updateTeacherDispatch,
      findTeacherByIdDispatch,
      saveTeacherDispatch,
      history,
    } = this.props;
    const payload = { ...values };
    if (match.params.id) updateTeacherDispatch({ ...payload, ...match.params });
    else
      saveTeacherDispatch({ ...payload }).then((response) => {
        if (response) {
          findTeacherByIdDispatch(response).then(() => history.push(`edit/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleTeacherDelete = () => {
    const { deleteTeacherDispatch, history, match } = this.props;
    deleteTeacherDispatch(match.params.id).then(() => history.push('/profesores'));
  };

  render() {
    const { teacher, schoolPrograms } = this.props;
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
  schoolPrograms: PropTypes.shape({}).isRequired,

  teacher: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,

  findTeacherByIdDispatch: PropTypes.func.isRequired,
  updateTeacherDispatch: PropTypes.func.isRequired,
  saveTeacherDispatch: PropTypes.func.isRequired,
  deleteTeacherDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  cleanSelectedTeacherDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  getListDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  teacher: state.teacherReducer.selectedTeacher,
  schoolPrograms: state.schoolProgramReducer.list,
});

const mD = {
  findTeacherByIdDispatch: findTeacherById,
  updateTeacherDispatch: updateTeacher,
  saveTeacherDispatch: saveTeacher,
  deleteTeacherDispatch: deleteTeacher,
  defineDispatch: define,
  cleanSelectedTeacherDispatch: cleanSelectedTeacher,
  cleanDialogDispatch: cleanDialog,
  getListDispatch: getList,
};

export default connect(mS, mD)(TeacherDetailContainer);
