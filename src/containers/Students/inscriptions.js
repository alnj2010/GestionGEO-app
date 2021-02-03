import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import {
  getInscribedSchoolPeriods,
  cleanSelectedInscriptionSchoolPeriods,
  findStudentById,
  cleanSelectedStudent,
  deleteInscription,
  getConstance,
} from '../../actions/student';
import StudentInscriptions from '../../components/Students/inscriptions';

class StudentInscriptionsContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const {
      getInscribedSchoolPeriodsDispatch,
      findStudentByIdDispatch,
      match: {
        params: { studentId, userId },
      },
      defineDispatch,
    } = this.props;
    getInscribedSchoolPeriodsDispatch(studentId).then(() => this.setState({ isLoading: false }));
    findStudentByIdDispatch(userId);
    defineDispatch('inscripcion');
  };

  componentWillUnmount = () => {
    const {
      cleanSelectedInscriptionSchoolPeriodsDispatch,
      cleanSelectedStudentDispatch,
      cleanDialogDispatch,
    } = this.props;
    cleanDialogDispatch();
    cleanSelectedInscriptionSchoolPeriodsDispatch();
    cleanSelectedStudentDispatch();
  };

  handleDeleteInscription = (id) => {
    const {
      getInscribedSchoolPeriodsDispatch,
      deleteInscriptionDispatch,
      match: {
        params: { studentId },
      },
    } = this.props;
    deleteInscriptionDispatch(id).then(() => getInscribedSchoolPeriodsDispatch(studentId));
  };

  render() {
    const {
      inscribedSchoolPeriods,
      history,
      showDispatch,
      getConstanceDispatch,
      match: {
        params: { studentId, userId },
      },
      student,
    } = this.props;

    const fullname = `${student.first_name} ${student.second_name || ''} ${student.first_surname} ${
      student.second_surname || ''
    }`;

    const { isLoading } = this.state;
    return (
      <StudentInscriptions
        handleDeleteInscription={this.handleDeleteInscription}
        inscribedSchoolPeriods={inscribedSchoolPeriods}
        studentId={studentId}
        userId={userId}
        getConstance={getConstanceDispatch}
        localization={{
          header: {
            actions: 'Acciones',
          },
        }}
        isLoading={isLoading}
        history={history}
        fullname={fullname}
        show={showDispatch}
      />
    );
  }
}
StudentInscriptionsContainer.propTypes = {
  inscribedSchoolPeriods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      studentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  }).isRequired,
  student: PropTypes.shape({
    first_name: PropTypes.string,
    second_name: PropTypes.string,
    first_surname: PropTypes.string,
    second_surname: PropTypes.string,
  }).isRequired,
  cleanSelectedInscriptionSchoolPeriodsDispatch: PropTypes.func.isRequired,
  deleteInscriptionDispatch: PropTypes.func.isRequired,
  getInscribedSchoolPeriodsDispatch: PropTypes.func.isRequired,
  findStudentByIdDispatch: PropTypes.func.isRequired,
  cleanSelectedStudentDispatch: PropTypes.func.isRequired,
  getConstanceDispatch: PropTypes.func.isRequired,
};
const mS = (state) => ({
  inscribedSchoolPeriods: state.studentReducer.inscribedSchoolPeriods,
  student: state.studentReducer.selectedStudent,
});

const mD = {
  getInscribedSchoolPeriodsDispatch: getInscribedSchoolPeriods,
  cleanSelectedInscriptionSchoolPeriodsDispatch: cleanSelectedInscriptionSchoolPeriods,
  findStudentByIdDispatch: findStudentById,
  cleanSelectedStudentDispatch: cleanSelectedStudent,
  deleteInscriptionDispatch: deleteInscription,
  showDispatch: show,
  defineDispatch: define,
  cleanDialogDispatch: cleanDialog,
  getConstanceDispatch: getConstance,
};

export default connect(mS, mD)(StudentInscriptionsContainer);
