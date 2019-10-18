import React, { Component } from 'react';
import { func, object } from 'prop-types';
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
export class SubjectDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findSubjectById, define } = this.props;
    if (match.params.id) findSubjectById(match.params.id);
    this.props.getSchoolProgramList();
    define('materia');
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedSubject();
    this.props.cleanDialog();
    
  };

  saveSubject = values => {
    const {
      match,
      updateSubject,
      findSubjectById,
      saveSubject,
      history,
    } = this.props;
    const payload = { ...values };
    if (match.params.id) updateSubject({ ...payload, ...match.params });
    else
      saveSubject({ ...payload }).then(response => {
        if (response) {
          findSubjectById(response).then(res => history.push(`edit/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleSubjectDelete = () => {
    const { deleteSubject, history, match } = this.props;
    deleteSubject(match.params.id).then(res => history.push('/materias'));
  };


  render() {
    const {
      subject: { id },
      schoolPrograms
    } = this.props;

    return (
      <SubjectDetail
        schoolPrograms={schoolPrograms}
        saveSubject={this.saveSubject}
        goBack={this.goBack}
        subjectId={id}
        handleSubjectDelete={this.handleSubjectDelete}
      />
    );
  }
}

SubjectDetailContainer.propTypes = {
  deleteSubject: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  updateSubject: func.isRequired,
  findSubjectById: func.isRequired,
  saveSubject: func.isRequired,
};

const mS = state => ({
  subject: state.subjectReducer.selectedSubject,
  schoolPrograms: state.schoolProgramReducer.list,
});

const mD = {
  findSubjectById,
  updateSubject,
  saveSubject,
  deleteSubject,
  define,
  cleanSelectedSubject,
  cleanDialog,
  getSchoolProgramList
};

SubjectDetailContainer = connect(
  mS,
  mD,
)(SubjectDetailContainer);

export default SubjectDetailContainer;
