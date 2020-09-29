import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getInscribedSchoolPeriods,
  cleanSelectedInscriptionSchoolPeriods,
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
      match: {
        params: { id },
      },
    } = this.props;
    getInscribedSchoolPeriodsDispatch(id).then(() => this.setState({ isLoading: false }));
  };

  componentWillUnmount = () => {
    const { cleanSelectedInscriptionSchoolPeriodsDispatch } = this.props;
    cleanSelectedInscriptionSchoolPeriodsDispatch();
  };

  render() {
    const {
      inscribedSchoolPeriods,
      history,
      match: {
        params: { id },
      },
      location: {
        state: { fullname },
      },
    } = this.props;

    const { isLoading } = this.state;
    return (
      <StudentInscriptions
        inscribedSchoolPeriods={inscribedSchoolPeriods}
        studentId={id}
        isLoading={isLoading}
        history={history}
        fullname={fullname}
      />
    );
  }
}
StudentInscriptionsContainer.propTypes = {
  inscribedSchoolPeriods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.any,
    }),
  }).isRequired,

  location: PropTypes.shape({
    state: PropTypes.shape({
      fullname: PropTypes.string,
    }),
  }).isRequired,

  cleanSelectedInscriptionSchoolPeriodsDispatch: PropTypes.func.isRequired,
  getInscribedSchoolPeriodsDispatch: PropTypes.func.isRequired,
};
const mS = (state) => ({
  inscribedSchoolPeriods: state.studentReducer.inscribedSchoolPeriods,
});

const mD = {
  getInscribedSchoolPeriodsDispatch: getInscribedSchoolPeriods,
  cleanSelectedInscriptionSchoolPeriodsDispatch: cleanSelectedInscriptionSchoolPeriods,
};

export default connect(mS, mD)(StudentInscriptionsContainer);
