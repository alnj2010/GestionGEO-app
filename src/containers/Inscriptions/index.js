import React, { Component } from 'react';
import { connect } from 'react-redux';
import Inscription from '../../components/Inscriptions'
import {
  getAvailableSubjects,
  inscription,
  cleanAvailableSubjects
} from '../../actions/studentInscription';

export class InscriptionContainer extends Component {
  componentDidMount = () => {
    const {
      getAvailableSubjects, 
    } = this.props;
    let id = sessionStorage.getItem('studentId');
    getAvailableSubjects(id)
  };
  componentWillUnmount = () => {
    this.props.cleanAvailableSubjects();
  };

  saveInscription = value => {
    const {
      inscription,
      history 
    } = this.props;
    let payload={
      student_id: sessionStorage.getItem('studentId'),
      status:'REG',
      subjects: value.map( subject =>({
          school_period_subject_teacher_id: subject.school_period_subject_teacher_id
      })
    )
  }
    inscription(payload).then(res =>{
      if(res){
        history.replace(`/home`);
      }
    })

  }

  render() {
    const {
      subjects
    } = this.props;

    return (
        <Inscription
          subjects={subjects}
          saveInscription = {this.saveInscription}
        />
    );
  }
}

InscriptionContainer.propTypes = {

};

const mS = state => ({
  subjects: state.studentInscriptionReducer.availableSubjects,

});

const mD = {
  getAvailableSubjects,
  inscription,
  cleanAvailableSubjects
};

InscriptionContainer = connect(
  mS,
  mD,
)(InscriptionContainer);

export default InscriptionContainer;
