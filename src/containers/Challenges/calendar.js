import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog } from '../../actions/dialog';
import { getList } from '../../actions/challenge';
import { getList as getChallengeTypeList } from '../../actions/challengeType';
import ChallengeCalendar from '../../components/Challenges/calendar';

export class ChallengeCalendarContainer extends Component {

  componentDidMount = () => {
      this.props.getList().then(() => this.setState({ isLoading: false }));
      this.props.getChallengeTypeList()
      define('challenge');
  };
  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  render() {
    const { challenges, history, challengeTypes } = this.props;

    return <ChallengeCalendar 
            challengeTypes={challengeTypes}
            challenges={challenges}
            history={history}
            />
   
  }
}

ChallengeCalendarContainer.propTypes = {
    challenges: array,
    challengeTypes: array,
    history: object.isRequired,
    getList: func.isRequired,
};

const mS = state => ({
    challenges: state.challengeReducer.list,
    challengeTypes: state.challengeTypeReducer.list,
});

const mD = {
    getList,
    cleanDialog,
    define,
    getChallengeTypeList
};

ChallengeCalendarContainer = connect(
  mS,
  mD,
)(ChallengeCalendarContainer);

export default ChallengeCalendarContainer;
