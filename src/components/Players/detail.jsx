import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
  Form,
  reduxForm,
  change,
  submit,
  formValueSelector,
} from 'redux-form';
import { object, func, string, bool, number } from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import AdminNotes from '../AdminNotes';
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
  largeIcon: {
    width: '36.5%',
    height: '36.5%',
    cursor: 'pointer',
  },
  profilePhoto: {
    width: 360,
    height: 360,
    cursor: 'pointer',
  },
  buttonContainer: { paddingTop: '2%' },
  save: {
    color: 'white',
    backgroundColor: '#61A956',
    '&:hover': {
      backgroundColor: 'rgb(78, 127, 71)',
    },
  },
  fileInput: {
    display: 'none',
  },
  date: { boxSizing: 'content-box', paddingTop: '4%' },
  lastSave: { justifyContent: 'flex-end', display: 'flex' },
  error: {
    color: 'red',
  },
});

class PlayerDetail extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  handleDialogShow = (action, func) => {
    this.setState({ func: func }, () => {
      this.props.show(action);
    });
  };

  render = () => {
    const {
      classes,
      handleSubmit,
      savePlayer,
      goBack,
      playerId,
      avatar,
      handlePlayerDelete,
      pristine,
      submitting,
      saveAdminNotes,
      valid,
      submit,
      change
    } = this.props;
    const { func } = this.state;
    return (
      <Fragment>
        <Grid container>
          <Form onSubmit={handleSubmit(savePlayer)}>
            <Grid container>
              <Grid item xs={12}>
                <h3> {playerId ? `Player: ${playerId}` : 'New Player'}</h3>
                <hr />
              </Grid>
              <Grid item xs={6} className={classes.form}>
                <Grid container>
                  <RenderFields >{[
                    { label: 'Name', field: 'name', id: 'name', type: 'text' },
                    { label: 'Last Name', field: 'lastName', id: 'last-name', type: 'text' },
                    { label: 'Email', field: 'email', id: 'email', type: 'text' },
                    { label: 'Password', field: 'password', id: 'password', type: 'password'},
                    { label: 'Password Confirmation', field: 'passwordConfirmation', id: 'password-confirmation', type: 'password'},
                    { label: 'Gender', field: 'gender', id: 'gender', type: 'select', options: [ { key: 'Male', value: 'male' }, { key: 'Female', value: 'female' } ]},
                    { label: 'Country', field: 'country', id: 'country', type: 'text' },
                    { label: 'Region', field: 'region', id: 'region', type: 'text' },
                    { label: 'City', field: 'city', id: 'city', type: 'text' },
                    { label: 'Zip Code', field: 'zip', id: 'zip', type: 'text' },
                    { label: 'Birthdate', field: 'birthdate', id: 'birthdate', type: 'date', styles: classes.date },
                  ]}</RenderFields>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                    {<RenderFields >{[
                      { field: 'photo', id: 'photo', type: 'file', avatar:avatar, change:change, images: [
                        {classesPhoto:classes.profilePhoto, classesDefault:classes.largeIcon, DefaultImage:AccountCircle }]
                      },
                      { label: 'Phone Number', field: 'phone', id: 'phone', type: 'text' },
                      { label: 'Phone Code', field: 'phoneCode', id: 'phoneCode', type: 'text' },                              
                    ]}</RenderFields>}
                      <Grid item xs={12}>
                        <Grid container className={classes.buttonContainer}>
                          <Grid item xs={4}>
                            <Button variant="contained" onClick={goBack}>
                              Cancel
                            </Button>
                          </Grid>
                          <Grid item xs={4}>
                            {playerId ? (
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() =>
                                  this.handleDialogShow(
                                    'delete',
                                    handlePlayerDelete,
                                  )
                                }
                              >
                                Delete
                              </Button>
                            ) : null}
                          </Grid>
                          <Grid item xs={4}>
                            <Button
                              variant="contained"
                              className={classes.save}
                              onClick={() =>
                                playerId
                                  ? this.handleDialogShow('update', submit)
                                  : submit('user')
                              }
                              disabled={!valid || pristine || submitting}
                            >
                              Save Changes
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
          <hr />
          <Grid item xs={12}>
            {playerId ? (
              <AdminNotes onSubmit={saveAdminNotes} parent={this} />
            ) : (
              <Fragment>
                <hr />
                <h3> Admin Notes will be avaliable after you create an user</h3>
              </Fragment>
            )}
          </Grid>
        </Grid>
        <Dialog handleAgree={func} />
      </Fragment>
    );
  };
}

PlayerDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  savePlayer: func.isRequired,
  goBack: func.isRequired,
  playerId: number,
  avatar: string,
  handlePlayerDelete: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
};

const userValidation = values => {
  const errors = {};
  if(values.photo && values.photo.type!=='image/jpeg' && values.photo.type!=='image/jpg' && values.photo.type!=='image/png' )
    errors.photo='Image mime type must be JPG or PNG'  
  
  if (!values.name) {
    errors.name = 'Name is required';
  } else if (/(?=[0-9])/.test(values.name))
    errors.name = 'Name must not contain numbers';

  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  } else if (/(?=[0-9])/.test(values.lastName))
    errors.lastName = 'Name must not contain numbers';

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.email)) {
    errors.email = 'Introduce a valid email';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (values.passwordConfirmation !== values.password) {
    errors.passwordConfirmation =
      'Confirmation password must be the same as password';
  }

  if (!values.birthdate) {
    errors.birthdate = 'Birthday is required';
  }

  if (!values.phone) {
    errors.phone = 'Phone number is required';
  } else if (!/[0-9]$/.test(values.phone))
    errors.phone = 'Enter a valid phone number';

  if (!values.phoneCode) {
    errors.phoneCode = 'Phone code is required';
  } else if (!/^\+(?:[0-9] ?){1,4}$/.test(values.phoneCode))
    errors.phoneCode = 'Enter a valid phone code';
  return errors;
};

PlayerDetail = reduxForm({
  form: 'user',
  validate: userValidation,
  enableReinitialize: true,
})(PlayerDetail);

const selector = formValueSelector('user');

PlayerDetail = connect(
  state => ({
    initialValues: {
      email: state.playerReducer.selectedPlayer.email
        ? state.playerReducer.selectedPlayer.email
        : '',
      name: state.playerReducer.selectedPlayer.name
        ? state.playerReducer.selectedPlayer.name
        : '',
      lastName: state.playerReducer.selectedPlayer.last
        ? state.playerReducer.selectedPlayer.last
        : '',
      password: state.playerReducer.selectedPlayer.password
        ? state.playerReducer.selectedPlayer.password
        : '',
      passwordConfirmation: state.playerReducer.selectedPlayer.password
        ? state.playerReducer.selectedPlayer.password
        : '',
      gender:
        state.playerReducer.selectedPlayer.profile &&
        state.playerReducer.selectedPlayer.profile.gender
          ? state.playerReducer.selectedPlayer.profile.gender
          : '',

      country:
        state.playerReducer.selectedPlayer.profile &&
        state.playerReducer.selectedPlayer.profile.country
          ? state.playerReducer.selectedPlayer.profile.country
          : '',
      region:
        state.playerReducer.selectedPlayer.profile &&
        state.playerReducer.selectedPlayer.profile.region
          ? state.playerReducer.selectedPlayer.profile.region
          : '',
      city:
        state.playerReducer.selectedPlayer.profile &&
        state.playerReducer.selectedPlayer.profile.city
          ? state.playerReducer.selectedPlayer.profile.city
          : '',
      zip:
        state.playerReducer.selectedPlayer.profile &&
        state.playerReducer.selectedPlayer.profile.zip
          ? state.playerReducer.selectedPlayer.profile.zip
          : '',
      birthdate:
        state.playerReducer.selectedPlayer.profile &&
        state.playerReducer.selectedPlayer.profile.birthday
          ? state.playerReducer.selectedPlayer.profile.birthday
          : '',
      phone:
        state.playerReducer.selectedPlayer.profile &&
        state.playerReducer.selectedPlayer.profile.phone
          ? state.playerReducer.selectedPlayer.profile.phone
          : '',
      phoneCode:
        state.playerReducer.selectedPlayer.profile &&
        state.playerReducer.selectedPlayer.profile.phoneCode
          ? state.playerReducer.selectedPlayer.profile.phoneCode
          : '',
      adminNotes:
        state.playerReducer.selectedPlayer.profile &&
        state.playerReducer.selectedPlayer.profile.adminNotes
          ? state.playerReducer.selectedPlayer.profile.adminNotes
          : '',
      avatar: state.playerReducer.selectedPlayer.avatar,
    },
    avatar: selector(state, 'avatar'),
    action: state.dialogReducer.action,
  }),
  { change, show, submit },
)(PlayerDetail);

export default withStyles(styles)(PlayerDetail);
