import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInscribedSchoolPeriods } from '../../actions/student';
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

  render() {
    const { inscribedSchoolPeriods, history, match:{params:{id}},} = this.props;
    const { isLoading } = this.state;
    return (
      <StudentInscriptions
        inscribedSchoolPeriods={inscribedSchoolPeriods}
        studentId={id}
        isLoading={isLoading}
        history={history}
      />
    );
  }
}

const mS = state => ({
  inscribedSchoolPeriods: state.studentReducer.inscribedSchoolPeriods,
});

const mD = {
  getInscribedSchoolPeriods,

};

StudentInscriptionsContainer = connect(
  mS,
  mD,
)(StudentInscriptionsContainer);

export default StudentInscriptionsContainer;
