import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Inscription from '../../components/Inscriptions';
import {
  getAvailableSubjects,
  inscription,
  cleanAvailableSubjects,
} from '../../actions/studentInscription';
import { getSessionStudentId } from '../../storage/sessionStorage';

class InscriptionContainer extends Component {
  componentDidMount = () => {
    const { getAvailableSubjectsDispatch } = this.props;
    const id = getSessionStudentId();
    getAvailableSubjectsDispatch(id);
  };

  componentWillUnmount = () => {
    const { cleanAvailableSubjectsDispatch } = this.props;
    cleanAvailableSubjectsDispatch();
  };

  saveInscription = (value) => {
    const { inscriptionDispatch, history } = this.props;
    const payload = {
      student_id: getSessionStudentId(),
      status: 'REG',
      subjects: value.map((subject) => ({
        school_period_subject_teacher_id: subject.school_period_subject_teacher_id,
      })),
    };
    inscriptionDispatch(payload).then((res) => {
      if (res) {
        history.replace(`/inicio`);
      }
    });
  };

  render() {
    const { subjects } = this.props;

    return <Inscription subjects={subjects} saveInscription={this.saveInscription} />;
  }
}

InscriptionContainer.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,

  getAvailableSubjectsDispatch: PropTypes.func.isRequired,
  inscriptionDispatch: PropTypes.func.isRequired,
  cleanAvailableSubjectsDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  subjects: state.studentInscriptionReducer.availableSubjects,
});

const mD = {
  getAvailableSubjectsDispatch: getAvailableSubjects,
  inscriptionDispatch: inscription,
  cleanAvailableSubjectsDispatch: cleanAvailableSubjects,
};

export default connect(mS, mD)(InscriptionContainer);
