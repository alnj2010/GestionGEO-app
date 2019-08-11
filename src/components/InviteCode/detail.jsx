import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Form, reduxForm } from 'redux-form';
import { object, bool } from 'prop-types';
import InvitedUsers from './invitedUsers';
import RenderFields from '../RenderFields'

const styles = theme => ({
  inputLabel: {
    paddingTop: '4%',
  },
  input: {
    alignSelf: 'center',
  },
  form: {
    paddingLeft: '5%',
  },
  date: { boxSizing: 'content-box', paddingTop: '4%' },
  lastSave: { justifyContent: 'flex-end', display: 'flex' },
  error: {
    color: 'red',
  },

  table: {
    paddingLeft: '5%',
    paddingTop: '2%',
  },
});

class InvitationDetail extends Component {

  render = () => {
    const { classes, handleSubmit, invitations } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <h3>Invitations</h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <h4>About the user and invite code</h4>
          </Grid>
          <Grid item xs={6} className={classes.form}>
            <Grid container>
              <RenderFields >{[
                { label: 'Name', field: 'name', id: 'name', type: 'text', disabled:true},
                { label: 'Last Name', field: 'lastName', id: 'last-name', type: 'text', disabled:true },
                { label: 'Code', field: 'code', id: 'code', type: 'text', disabled:true },
                { label: 'Referrals', field: 'referrals', id: 'referrals', type: 'text', disabled:true },
                { label: 'Date', field: 'date', id: 'date', type: 'text', disabled:true },
              ]}</RenderFields>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7} className={classes.table}>
          <InvitedUsers invitations={invitations} />
        </Grid>
      </Form>
    );
  };
}

InvitationDetail.propTypes = {
  classes: object.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
};

InvitationDetail = reduxForm({
  form: 'invitation',
  enableReinitialize: true,
})(InvitationDetail);

InvitationDetail = connect(
  state => ({
    initialValues: {
      name: state.playerReducer.selectedPlayer.name
        ? state.playerReducer.selectedPlayer.name
        : '',
      lastName: state.playerReducer.selectedPlayer.last
        ? state.playerReducer.selectedPlayer.last
        : '',
      code:
        state.playerReducer.selectedPlayer.profile &&
        state.playerReducer.selectedPlayer.profile.inv_code
          ? state.playerReducer.selectedPlayer.profile.inv_code
          : '',
      referrals: state.inviteCodeReducer.userInvitations.referrals
        ? state.inviteCodeReducer.userInvitations.referrals
        : '',
      date: state.playerReducer.selectedPlayer.created
        ? state.playerReducer.selectedPlayer.created
        : '',
    },
  }),
  {},
)(InvitationDetail);

export default withStyles(styles)(InvitationDetail);
