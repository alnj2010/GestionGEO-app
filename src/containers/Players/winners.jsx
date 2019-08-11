import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { getWinners } from '../../actions/player';
import WinnersList from '../../components/Players/winners';

export class WinnersListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
    const { getWinners } = this.props;
    getWinners().then(() => this.setState({ isLoading: false }));
  };

  render() {
    const { winners } = this.props;
    const { isLoading } = this.state;
    return <WinnersList winners={winners} isLoading={isLoading} />;
  }
}

WinnersListContainer.propTypes = {
  winners: object,
  history: object.isRequired,
  getWinners: func.isRequired,
};

const mS = state => ({
  winners: state.playerReducer.winners,
});

const mD = {
  getWinners,
};

WinnersListContainer = connect(
  mS,
  mD,
)(WinnersListContainer);

export default WinnersListContainer;
