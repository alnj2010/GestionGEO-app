import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import {
  findPlayerById,
  updatePlayer,
  deletePlayer,
  cleanSelectedPlayer,
  updateAdminNotes,
  savePlayer,
} from '../../actions/player';
import UserDetail from '../../components/Players/detail';
import { define, cleanDialog } from '../../actions/dialog';
export class PlayerDetailContainer extends Component {

  componentDidMount = () => {
    const { match, findPlayerById, define } = this.props;
    if (match.params.id) findPlayerById(match.params.id);
    define('user');
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedPlayer();
    this.props.cleanDialog();
  };

  savePlayer = values => {
    const {
      match,
      updatePlayer,
      findPlayerById,
      savePlayer,
      history,
    } = this.props;
    const payload = { ...values };
    if (values.password === '******') payload.password = undefined;
    if (match.params.id) updatePlayer({ ...payload, ...match.params});
    else
      savePlayer({ ...payload}).then(response => {
        if (response) {
          findPlayerById(response).then(res =>
            history.push(`edit/${response}`),
          );
        }
      });
  };

  saveAdminNotes = values => {
    const { match, updateAdminNotes } = this.props;
    updateAdminNotes({ ...values, id: match.params.id });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handlePlayerDelete = () => {
    const { deletePlayer, history, match } = this.props;
    deletePlayer(match.params.id).then(res => history.push('/users/list'));
  };

  render() {
    const {
      player: { id },
    } = this.props;
    return (
      <UserDetail
        savePlayer={this.savePlayer}
        goBack={this.goBack}
        playerId={id}
        handlePlayerDelete={this.handlePlayerDelete}
        saveAdminNotes={this.saveAdminNotes}
      />
    );
  }
}

PlayerDetailContainer.propTypes = {
  deletePlayer: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  updatePlayer: func.isRequired,
  findPlayerById: func.isRequired,
  savePlayer: func.isRequired,
};

const mS = state => ({
  player: state.playerReducer.selectedPlayer,
});

const mD = {
  findPlayerById,
  updatePlayer,
  savePlayer,
  deletePlayer,
  define,
  cleanSelectedPlayer,
  cleanDialog,
  updateAdminNotes,
};

const UserDetailPage = connect(
  mS,
  mD,
)(PlayerDetailContainer);

export default UserDetailPage;
