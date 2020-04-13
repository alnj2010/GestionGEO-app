import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInscribedSchoolPeriods,cleanSelectedInscriptionSchoolPeriods } from '../../actions/student';
import StudentInscriptions from '../../components/Students/inscriptions';

export class StudentInscriptionsContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
    const { getInscribedSchoolPeriods, match:{params:{id}}, } = this.props;
    getInscribedSchoolPeriods(id).then(() => this.setState({ isLoading: false }));
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedInscriptionSchoolPeriods();
  };

  render() {
    const { 
      inscribedSchoolPeriods, 
      history, 
      match: { params: { id }},
      location:{ state: { fullname } }
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

const mS = state => ({
  inscribedSchoolPeriods: state.studentReducer.inscribedSchoolPeriods,
});

const mD = {
  getInscribedSchoolPeriods,
  cleanSelectedInscriptionSchoolPeriods

};

StudentInscriptionsContainer = connect(
  mS,
  mD,
)(StudentInscriptionsContainer);

export default StudentInscriptionsContainer;
