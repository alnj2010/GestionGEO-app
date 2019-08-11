import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { getList, deletePlayer } from '../../actions/player';
import { define, cleanDialog, show } from '../../actions/dialog';
import UsersList from '../../components/Players';

export class PlayersListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
    const { getList, define } = this.props;
    getList().then(() => this.setState({ isLoading: false }));
    define('user');
  };

  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  handleDeletePlayer = id => {
    const { getList, deletePlayer } = this.props;
    deletePlayer(id).then(res => getList());
  };

  render() {
    const { users, history, show } = this.props;
    const { isLoading } = this.state;
    return (
      <UsersList
        users={users}
        isLoading={isLoading}
        history={history}
        handlePlayerDetail={this.handlePlayerDetail}
        handleDeletePlayer={this.handleDeletePlayer}
        show={show}
      />
    );
  }
}

PlayersListContainer.propTypes = {
  users: array,
  history: object.isRequired,
  getList: func.isRequired,
  deletePlayer: func.isRequired,
};

const mS = state => ({
  users: state.playerReducer.list,
});

const mD = {
  getList,
  deletePlayer,
  cleanDialog,
  define,
  show,
};

const UsersListPage = connect(
  mS,
  mD,
)(PlayersListContainer);

export default UsersListPage;
