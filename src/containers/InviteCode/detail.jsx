import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { getUserInvitations } from '../../actions/inviteCode';
import { findPlayerById, cleanSelectedPlayer } from '../../actions/player';
import InvitationDetail from '../../components/InviteCode/detail';
export class invitationsDetailContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    const { match, getUserInvitations, findPlayerById } = this.props;
    if (match.params.id)
      Promise.all([
        getUserInvitations(match.params.id),
        findPlayerById(match.params.id),
      ]).then(res => this.setState({ isLoading: false }));
  }

  componentWillUnmount() {
    const { cleanSelectedPlayer } = this.props;
    cleanSelectedPlayer();
  }

  submit = values => {
    this.props.updateSetup(values);
  };

  render() {
    const { invitations } = this.props;
    const { isLoading } = this.state;
    return <InvitationDetail isLoading={isLoading} invitations={invitations} />;
  }
}

invitationsDetailContainer.propTypes = {
  getUserInvitations: func.isRequired,
};

const mS = state => ({
  invitations: state.inviteCodeReducer.userInvitations.invitedUsers,
});

const mD = {
  getUserInvitations,
  findPlayerById,
  cleanSelectedPlayer,
};

invitationsDetailContainer = connect(
  mS,
  mD,
)(invitationsDetailContainer);

export default invitationsDetailContainer;
