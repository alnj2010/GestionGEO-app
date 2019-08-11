import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button
} from '@material-ui/core';
import { Form, reduxForm, change, submit } from 'redux-form';
import { object, func, bool, number } from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
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

class AdminDetail extends Component {
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
      saveAdmin,
      goBack,
      adminId,
      handleAdminDelete,
      pristine,
      submitting,
      valid,
      submit,
    } = this.props;
    const { func } = this.state;
    return (
      <Form onSubmit={handleSubmit(saveAdmin)}>
        <Grid container>
          <Grid item xs={12}>
            <h3> {adminId ? `Admin: ${adminId}` : 'New Admin'}</h3>
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
              ]}</RenderFields>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer}>
                  <Grid item xs={4}>
                    <Button variant="contained" onClick={goBack}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    {adminId ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          this.handleDialogShow('delete', handleAdminDelete)
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
                        adminId
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
        <Dialog handleAgree={func} />
      </Form>
    );
  };
}

AdminDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  saveAdmin: func.isRequired,
  goBack: func.isRequired,
  adminId: number,
  handleAdminDelete: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
};

const userValidation = values => {
  const errors = {};
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
  } else if (!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(values.phone))
    errors.phone = 'Enter a valid phone number';
  return errors;
};

AdminDetail = reduxForm({
  form: 'user',
  validate: userValidation,
  enableReinitialize: true,
})(AdminDetail);

AdminDetail = connect(
  state => ({
    initialValues: {
      email: state.adminReducer.selectedAdmin.email
        ? state.adminReducer.selectedAdmin.email
        : '',
      name: state.adminReducer.selectedAdmin.name
        ? state.adminReducer.selectedAdmin.name
        : '',
      lastName: state.adminReducer.selectedAdmin.last
        ? state.adminReducer.selectedAdmin.last
        : '',
      password: state.adminReducer.selectedAdmin.password
        ? state.adminReducer.selectedAdmin.password
        : '',
      passwordConfirmation: state.adminReducer.selectedAdmin.password
        ? state.adminReducer.selectedAdmin.password
        : '',
    },
    action: state.dialogReducer.action,
  }),
  { change, show, submit },
)(AdminDetail);

export default withStyles(styles)(AdminDetail);
