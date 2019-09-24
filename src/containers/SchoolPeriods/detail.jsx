import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import {
  findSchoolPeriodById,
  updateSchoolPeriod,
  deleteSchoolPeriod,
  cleanSelectedSchoolPeriod,
  saveSchoolPeriod,
} from '../../actions/schoolPeriod';
import { getList as getSubjectList } from '../../actions/subject';
import { getList as getTeacherList } from '../../actions/teacher';
import SchoolPeriodDetail from '../../components/SchoolPeriods/detail';
import { define, cleanDialog } from '../../actions/dialog';
export class SchoolPeriodDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findSchoolPeriodById, define } = this.props;
    if (match.params.id) findSchoolPeriodById(match.params.id);
    this.props.getSubjectList();
    this.props.getTeacherList();
    define('Periodo semestral');
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedSchoolPeriod();
    this.props.cleanDialog();
    
  };

  saveSchoolPeriod = values => {
    const {
      match,
      updateSchoolPeriod,
      findSchoolPeriodById,
      saveSchoolPeriod,
      history,
    } = this.props;
  
    console.log(values)
   if (match.params.id) updateSchoolPeriod({ ...values, ...match.params });
   else
    saveSchoolPeriod({ ...values }).then(response => {
      if (response) {
        findSchoolPeriodById(response).then(res => history.push(`edit/${response}`));
      }
    });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleSchoolPeriodDelete = () => {
    const { deleteSchoolPeriod, history, match } = this.props;
    deleteSchoolPeriod(match.params.id).then(res => history.push('/periodo-semestral'));
  };


  render() {
    const {
      schoolPeriod: { id },
      subjects,
      teachers,
    } = this.props;
    return (
      <SchoolPeriodDetail
        subjects={subjects}
        teachers={teachers}
        saveSchoolPeriod={this.saveSchoolPeriod}
        goBack={this.goBack}
        schoolPeriodId={id}
        handleSchoolPeriodDelete={this.handleSchoolPeriodDelete}
      />
    );
  }
}

SchoolPeriodDetailContainer.propTypes = {
  deleteSchoolPeriod: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  updateSchoolPeriod: func.isRequired,
  findSchoolPeriodById: func.isRequired,
  saveSchoolPeriod: func.isRequired,
};

const mS = state => ({
  schoolPeriod: state.schoolPeriodReducer.selectedSchoolPeriod,
  subjects: state.subjectReducer.list,
  teachers: state.teacherReducer.list,
});

const mD = {
  findSchoolPeriodById,
  updateSchoolPeriod,
  saveSchoolPeriod,
  deleteSchoolPeriod,
  define,
  cleanSelectedSchoolPeriod,
  cleanDialog,
  getSubjectList,
  getTeacherList,
};

SchoolPeriodDetailContainer = connect(
  mS,
  mD,
)(SchoolPeriodDetailContainer);

export default SchoolPeriodDetailContainer;
