import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getList as getSchoolPeriodsList } from '../../actions/schoolPeriod';
import { getList as getSubjectList } from '../../actions/subject';

import StudentInscription from '../../components/Students/inscription';
import { define, cleanDialog } from '../../actions/dialog';
export class StudentInscriptionContainer extends Component {
  componentDidMount = () => {
    const { match, define } = this.props;
    this.props.getSchoolPeriodsList();
    this.props.getSubjectList();
    define('estudiante');
  };
  componentWillUnmount = () => {
    //this.props.cleanSelectedStudent();
    this.props.cleanDialog();
    
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
      match:{params:{id}},
      subjects
    } = this.props;
    return (
      <StudentInscription
        schoolPeriods={schoolPeriods}
        saveInscription={this.saveInscription}
        goBack={this.goBack}
        studentId={id}
        subjects={subjects}
      />
    );
  }
}


const mS = state => ({
  subjects: state.subjectReducer.list,
  schoolPeriods: state.schoolPeriodReducer.list,
});

const mD = {
  define,
  cleanDialog,
  getSubjectList,
  getSchoolPeriodsList
};

StudentInscriptionContainer = connect(
  mS,
  mD,
)(StudentInscriptionContainer);

export default StudentInscriptionContainer;
