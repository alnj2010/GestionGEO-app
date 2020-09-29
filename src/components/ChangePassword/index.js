import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Form, reduxForm, submit } from 'redux-form';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields';

const styles = () => ({
  form: {
    paddingLeft: '5%',
  },
  buttonContainer: { paddingTop: '2%' },
  save: {
    color: 'white',
    backgroundColor: '#61A956',
    '&:hover': {
      backgroundColor: 'rgb(78, 127, 71)',
    },
  },
  button: {
    width: '100%',
  },
});

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  handleDialogShow = (action, func) => {
    const { showDispatch } = this.props;
    this.setState({ func }, () => {
      showDispatch(action);
    });
  };

  render = () => {
    const {
      classes,
      handleSubmit,
      savePassword,
      goBack,
      changePasswordId,
      pristine,
      submitting,
      valid,
      submitDispatch,
    } = this.props;
    const { func } = this.state;
    return (
      <Form onSubmit={handleSubmit(savePassword)}>
        <Grid container>
          <Grid item xs={12}>
            <h3>Cambio de contrasena</h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container justify="space-between">
              <RenderFields>
                {[
                  {
                    label: 'Contrasena Actual',
                    field: 'oldPassword',
                    id: 'oldPassword',
                    type: 'text',
                  },
                  {
                    label: 'Nueva contrasena',
                    field: 'password',
                    id: 'password',
                    type: 'text',
                  },
                  {
                    label: 'Confirmacion de contrasena',
                    field: 'passwordConfirmation',
                    id: 'passwordConfirmation',
                    type: 'text',
                  },
                ]}
              </RenderFields>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid
                  container
                  className={classes.buttonContainer}
                  justify="space-between"
                  spacing={16}
                >
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      className={`${classes.save} ${classes.button}`}
                      onClick={() =>
                        changePasswordId
                          ? this.handleDialogShow('actualizar', submitDispatch)
                          : submitDispatch('changePassword')
                      }
                      disabled={!valid || pristine || submitting}
                    >
                      Guardar Cambios
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Button variant="contained" onClick={goBack} className={classes.button}>
                      Cancelar
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
ChangePassword.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string,
    buttonContainer: PropTypes.string,
    save: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,

  changePasswordId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,

  showDispatch: PropTypes.func.isRequired,
  submitDispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  savePassword: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};
ChangePassword.defaultProps = {
  changePasswordId: null,
};
const changePasswordValidation = (values) => {
  const errors = {};

  if (!values.oldPassword) errors.oldPassword = 'Campo Requerido';

  if (!values.password) errors.password = 'Campo Requerido';

  if (!values.passwordConfirmation) errors.passwordConfirmation = 'Campo Requerido';

  if (
    values.passwordConfirmation &&
    values.password &&
    values.passwordConfirmation !== values.password
  )
    errors.passwordConfirmation = 'La contrasena de confirmacion no coincide';

  return errors;
};

let ChangePasswordWrapper = reduxForm({
  form: 'changePassword',
  validate: changePasswordValidation,
  enableReinitialize: true,
})(ChangePassword);

ChangePasswordWrapper = connect(
  (state) => ({
    initialValues: {},
    action: state.dialogReducer.action,
  }),
  { showDispatch: show, submitDispatch: submit }
)(ChangePasswordWrapper);

export default withStyles(styles)(ChangePasswordWrapper);
