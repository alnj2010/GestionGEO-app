import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
getAvailableSubjects,
addStudentPeriodSchool,
editStudentPeriodSchool,
getInscribedSchoolPeriods,
cleanSelectedInscribedSchoolPeriods
} from '../../actions/student';
import { getList as getSchoolPeriodsList } from '../../actions/schoolPeriod';

import StudentInscription from '../../components/Students/inscription';
import { define, cleanDialog } from '../../actions/dialog';
export class StudentInscriptionContainer extends Component {
  componentDidMount = () => {
    const { 
      match:{params:{id,idSchoolPeriod}}, 
      define 
    } = this.props;
    this.props.getSchoolPeriodsList();
    this.props.getInscribedSchoolPeriods(id,idSchoolPeriod)
    define('estudiante');
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedInscribedSchoolPeriods();
    this.props.cleanDialog();
    
  };

  saveInscription = values => {
    const{
      addStudentPeriodSchool,
      editStudentPeriodSchool,
      idInscription,
      match:{params:{id,idSchoolPeriod}},
    }=this.props
    if(!idSchoolPeriod)
      addStudentPeriodSchool({ ...values, studentId:id }).then(res=>this.goBack());
    else
      editStudentPeriodSchool({...values, studentId:id,id:idInscription })
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
      subjectInscriptions,
      location:{state:{inscriptedSP, fullname }}
    } = this.props;
    console.log(subjects);
    return (
      <StudentInscription
        schoolPeriods={ schoolPeriods.filter(sp => !inscriptedSP.some(isp=>isp.id===sp.id  && parseInt(isp.id)!==parseInt(idSchoolPeriod) )) }
        saveInscription={this.saveInscription}
        goBack={this.goBack}
        studentId={id}
        idSchoolPeriod={idSchoolPeriod}
        subjects={subjects?subjects.map(item =>({id:item.school_period_subject_teacher_id,subject_name:item.data_subject.subject.subject_name}) ): []}
        getAvailableSubjects={getAvailableSubjects}
        subjectInscriptions={subjectInscriptions}
        fullname={fullname}
      />
    );
  }
}


const mS = state => ({
  subjects: state.studentReducer.selectedStudentSchoolPeriod.enrolled_subjects,
  idInscription:state.studentReducer.selectedStudentSchoolPeriod.idInscription,
  schoolPeriods: state.schoolPeriodReducer.list,
  subjectInscriptions: state.studentReducer.availableSubjects,
  
});

const mD = {
  define,
  cleanDialog,
  getSchoolPeriodsList,
  getAvailableSubjects,
  getInscribedSchoolPeriods,
  cleanSelectedInscribedSchoolPeriods,
  addStudentPeriodSchool,
  editStudentPeriodSchool
};

StudentInscriptionContainer = connect(
  mS,
  mD,
)(StudentInscriptionContainer);

export default StudentInscriptionContainer;
