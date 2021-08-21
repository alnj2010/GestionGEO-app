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
import { cleanUserToConvert, setUserToConvert } from '../../actions/userToConvert';
import TeacherDetail from '../../components/Teachers/detail';
import { define, cleanDialog } from '../../actions/dialog';

class TeacherDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findTeacherByIdDispatch, defineDispatch, getListDispatch } = this.props;
    if (match.params.id) findTeacherByIdDispatch(match.params.id);
    getListDispatch();
    defineDispatch('profesor');
  };

  componentWillUnmount = () => {
    const {
      cleanSelectedTeacherDispatch,
      cleanDialogDispatch,
      cleanUserToConvertDispatch,
      match,
    } = this.props;
    cleanSelectedTeacherDispatch();
    cleanDialogDispatch();
    if (!match.params.id) cleanUserToConvertDispatch();
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
          findTeacherByIdDispatch(response).then(() => history.push(`modificar/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.push('/usuarios/profesores');
  };

  convertUserTo = ({ userType, userData }) => {
    const { history, setUserToConvertDispatch } = this.props;
    setUserToConvertDispatch(userData);
    history.push(`/usuarios/${userType}/agregar`);
  };

  handleTeacherDelete = () => {
    const { deleteTeacherDispatch, history, match } = this.props;
    deleteTeacherDispatch(match.params.id).then(() => history.push('/usuarios/profesores'));
  };

  render() {
    const { teacher, schoolPrograms, match } = this.props;
    return (
      <TeacherDetail
        convertUserTo={this.convertUserTo}
        schoolPrograms={schoolPrograms}
        saveTeacher={this.saveTeacher}
        goBack={this.goBack}
        teacherId={match.params.id}
        teacher={teacher}
        handleTeacherDelete={this.handleTeacherDelete}
      />
    );
  }
}

TeacherDetailContainer.propTypes = {
  schoolPrograms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  teacher: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  setUserToConvertDispatch: PropTypes.func.isRequired,
  cleanUserToConvertDispatch: PropTypes.func.isRequired,
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
  cleanUserToConvertDispatch: cleanUserToConvert,
  setUserToConvertDispatch: setUserToConvert,
};

export default connect(mS, mD)(TeacherDetailContainer);
