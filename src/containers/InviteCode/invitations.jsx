import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { getInvitations } from '../../actions/inviteCode';
import Invitations from '../../components/InviteCode/invitations';
export class invitationsContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    this.props
      .getInvitations()
      .then(res => this.setState({ isLoading: false }));
  }

  submit = values => {
    this.props.updateSetup(values);
  };
  render() {
    const { invitations, history } = this.props;
    const { isLoading } = this.state;
    return (
      <Invitations
        isLoading={isLoading}
        invitations={invitations}
        history={history}
      />
    );
  }
}

invitationsContainer.propTypes = {
  getInvitations: func.isRequired,
};

const mS = state => ({
  invitations: state.inviteCodeReducer.list,
});

const mD = {
  getInvitations,
};

invitationsContainer = connect(
  mS,
  mD,
)(invitationsContainer);

export default invitationsContainer;
