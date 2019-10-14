import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
getAvailableSubjects,
addStudentPeriodSchool,
getInscribedSchoolPeriods
} from '../../actions/student';
import { getList as getSchoolPeriodsList } from '../../actions/schoolPeriod';
import { getList as getSubjectList } from '../../actions/subject';

import StudentInscription from '../../components/Students/inscription';
import { define, cleanDialog } from '../../actions/dialog';
export class StudentInscriptionContainer extends Component {
  componentDidMount = () => {
    const { 
      match:{params:{id,idSchoolPeriod}}, 
      define 
    } = this.props;
    this.props.getSchoolPeriodsList();
    this.props.getSubjectList();
    this.props.getInscribedSchoolPeriods(id,idSchoolPeriod)
    define('estudiante');
  };
  componentWillUnmount = () => {
    //this.props.cleanSelectedStudent();
    this.props.cleanDialog();
    
  };

  saveInscription = values => {
    const{
      addStudentPeriodSchool,
      match:{params:{id}},
    }=this.props
    addStudentPeriodSchool({ ...values, studentId:id })
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const {
      schoolPeriods,
      subjects,
      match:{params:{id,idSchoolPeriod}},
      getAvailableSubjects,
      subjectInscriptions
    } = this.props;
    const inscriptedSP=this.props.location.state;
  
    return (
      <StudentInscription
        schoolPeriods={ schoolPeriods.filter(sp => !inscriptedSP.some(isp=>isp.id===sp.id  && parseInt(isp.id)!==parseInt(idSchoolPeriod) )) }
        saveInscription={this.saveInscription}
        goBack={this.goBack}
        studentId={id}
        idSchoolPeriod={idSchoolPeriod}
        subjects={subjects}
        getAvailableSubjects={getAvailableSubjects}
        subjectInscriptions={subjectInscriptions}
      />
    );
  }
}


const mS = state => ({
  subjects: state.subjectReducer.list,
  schoolPeriods: state.schoolPeriodReducer.list,
  subjectInscriptions: state.studentReducer.availableSubjects,
  
});

const mD = {
  define,
  cleanDialog,
  getSubjectList,
  getSchoolPeriodsList,
  getAvailableSubjects,
  getInscribedSchoolPeriods
};

StudentInscriptionContainer = connect(
  mS,
  mD,
)(StudentInscriptionContainer);

export default StudentInscriptionContainer;
