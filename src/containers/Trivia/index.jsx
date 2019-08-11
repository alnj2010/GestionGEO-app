import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { getTriviaList, deleteTrivia } from '../../actions/minigame';
import { define, cleanDialog, show } from '../../actions/dialog';
import TriviasList from '../../components/Trivia';

class TriviasListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
    const { getTriviaList, define } = this.props;
    getTriviaList().then(() => this.setState({ isLoading: false }));
    define('trivia');
  };

  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  handleDeleteTrivia = id => {
    const { getTriviaList, deleteTrivia } = this.props;
    deleteTrivia(id).then(res => getTriviaList());
  };

  render() {
    const { trivias, history, show } = this.props;
    const { isLoading } = this.state;
    return (
      <TriviasList
        trivias={trivias}
        isLoading={isLoading}
        history={history}
        handleTriviaDetail={this.handleTriviaDetail}
        handleDeleteTrivia={this.handleDeleteTrivia}
        show={show}
      />
    );
  }
}

TriviasListContainer.propTypes = {
  trivias: array,
  history: object.isRequired,
  getTriviaList: func.isRequired,
  deleteTrivia: func.isRequired,
  cleanDialog: func.isRequired,
  define: func.isRequired,
  show: func.isRequired,
};

const mS = state => ({
  trivias: state.minigameReducer.list,
});

const mD = {
  getTriviaList,
  deleteTrivia,
  cleanDialog,
  define,
  show,
};

const TriviasListPage = connect(
  mS,
  mD,
)(TriviasListContainer);

export default TriviasListPage;
