import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteChallenge } from '../../actions/challenge';
import ChallengesList from '../../components/Challenges';

export class ChallengesContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
      this.props.getList().then(() => this.setState({ isLoading: false }));
      define('challenge');
  };
  componentWillUnmount = () => {
    this.props.cleanDialog();
  };
  handleDeleteChallenge = (id) => {
    const { getList, deleteChallenge } = this.props;
    deleteChallenge(id).then(res => getList());
  }

  render() {
    const { challenges, history, show } = this.props;
    const { isLoading } = this.state;

    return <ChallengesList 
            challenges={challenges}
            isLoading={isLoading}
            history={history}
            handleDeleteChallenge={this.handleDeleteChallenge}
            show={show}
            />
   
  }
}

ChallengesContainer.propTypes = {
    challenges: array,
    history: object.isRequired,
    getList: func.isRequired,
    deleteChallenge: func.isRequired,
};

const mS = state => ({
    challenges: state.challengeReducer.list,
});

const mD = {
    getList,
    deleteChallenge,
    cleanDialog,
    define,
    show,
};

const ChallengesPage = connect(
  mS,
  mD,
)(ChallengesContainer);

export default ChallengesPage;
