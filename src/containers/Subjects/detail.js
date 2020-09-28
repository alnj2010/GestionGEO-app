import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  findSubjectById,
  updateSubject,
  deleteSubject,
  cleanSelectedSubject,
  saveSubject,
} from '../../actions/subject';
import { getList as getSchoolProgramList } from '../../actions/schoolProgram';
import SubjectDetail from '../../components/Subjects/detail';
import { define, cleanDialog } from '../../actions/dialog';

class SubjectDetailContainer extends Component {
  componentDidMount = () => {
    const {
      match,
      findSubjectByIdDispatch,
      defineDispatch,
      getSchoolProgramListDispatch,
    } = this.props;
    if (match.params.id) findSubjectByIdDispatch(match.params.id);
    getSchoolProgramListDispatch();
    defineDispatch('materia');
  };

  componentWillUnmount = () => {
    const { cleanSelectedSubjectDispatch, cleanDialogDispatch } = this.props;
    cleanSelectedSubjectDispatch();
    cleanDialogDispatch();
  };

  saveSubject = (values) => {
    const {
      match,
      updateSubjectDispatch,
      findSubjectByIdDispatch,
      saveSubjectDispatch,
      history,
    } = this.props;
    const payload = { ...values };

    payload.schoolPrograms = payload.schoolPrograms.map((sp) => ({
      ...sp,
      school_program_id: sp.id,
    }));
    if (match.params.id) updateSubjectDispatch({ ...payload, ...match.params });
    else
      saveSubjectDispatch({ ...payload }).then((response) => {
        if (response) {
          findSubjectByIdDispatch(response).then(() => history.push(`edit/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleSubjectDelete = () => {
    const { deleteSubjectDispatch, history, match } = this.props;
    deleteSubjectDispatch(match.params.id).then(() => history.push('/materias'));
  };

  render() {
    const { subject, schoolPrograms } = this.props;
    return (
      <SubjectDetail
        schoolPrograms={schoolPrograms}
        saveSubject={this.saveSubject}
        goBack={this.goBack}
        subject={subject}
        subjectId={subject.id}
        handleSubjectDelete={this.handleSubjectDelete}
      />
    );
  }
}

SubjectDetailContainer.propTypes = {
  subject: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,

  schoolPrograms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

  findSubjectByIdDispatch: PropTypes.func.isRequired,
  updateSubjectDispatch: PropTypes.func.isRequired,
  saveSubjectDispatch: PropTypes.func.isRequired,
  deleteSubjectDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  cleanSelectedSubjectDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  getSchoolProgramListDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  subject: state.subjectReducer.selectedSubject,
  schoolPrograms: state.schoolProgramReducer.list,
});

const mD = {
  findSubjectByIdDispatch: findSubjectById,
  updateSubjectDispatch: updateSubject,
  saveSubjectDispatch: saveSubject,
  deleteSubjectDispatch: deleteSubject,
  defineDispatch: define,
  cleanSelectedSubjectDispatch: cleanSelectedSubject,
  cleanDialogDispatch: cleanDialog,
  getSchoolProgramListDispatch: getSchoolProgramList,
};

export default connect(mS, mD)(SubjectDetailContainer);
