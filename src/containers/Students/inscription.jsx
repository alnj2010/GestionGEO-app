import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
availableSubjects,
findStudentById
} from '../../actions/student';
import { getList as getSchoolPeriodsList } from '../../actions/schoolPeriod';
import { getList as getSubjectList } from '../../actions/subject';

import StudentInscription from '../../components/Students/inscription';
import { define, cleanDialog } from '../../actions/dialog';
export class StudentInscriptionContainer extends Component {
  componentDidMount = () => {
    const { match, define } = this.props;
    this.props.findStudentById(match.params.id);
    this.props.getSchoolPeriodsList();
    this.props.getSubjectList();
    define('estudiante');
  };
  componentWillUnmount = () => {
    //this.props.cleanSelectedStudent();
    this.props.cleanDialog();
    
  };

  availableSubjects = (schoolPeriodId) => {
    return availableSubjects(this.props.match.params.id,schoolPeriodId)
  };

  saveInscription = values => {
    alert('Guardando inscripcion')
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const {
      schoolPeriods,
      student:{student:{id}},
      subjects
    } = this.props;
    return (
      <StudentInscription
        schoolPeriods={schoolPeriods}
        saveInscription={this.saveInscription}
        goBack={this.goBack}
        studentId={id}
        subjects={subjects}
        availableSubjects={availableSubjects}
      />
    );
  }
}


const mS = state => ({
  subjects: state.subjectReducer.list,
  schoolPeriods: state.schoolPeriodReducer.list,
  student: state.studentReducer.selectedStudent,
});

const mD = {
  define,
  cleanDialog,
  getSubjectList,
  getSchoolPeriodsList,
  findStudentById
};

StudentInscriptionContainer = connect(
  mS,
  mD,
)(StudentInscriptionContainer);

export default StudentInscriptionContainer;
