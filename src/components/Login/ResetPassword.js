import React from 'react';
import PropTypes from 'prop-types';
import { Form, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

import CustomizedSnackbar from '../Snackbar';
import RenderFields from '../RenderFields';
import { USER_ROL } from '../../services/constants';
import { jsonToOptions } from '../../helpers';

const styles = () => ({
  loginButton: {
    width: '100%',
    margin: '5% 0',
    fontSize: 14,
    letterSpacing: '-0.84px',
    borderRadius: 3,
    backgroundColor: '#2196f3',
    fontWeight: 550,
  },
});

let ResetPassword = (props) => {
  const { classes, handleSubmit, pristine, submitting, valid, handleResetPassword } = props;

  return (
    <Grid container item xs={12} justify="center" direction="column" alignItems="center">
      <Form onSubmit={handleSubmit(handleResetPassword)} style={{ width: '100%' }}>
        <RenderFields lineal={[12, 12]}>
          {[
            {
              label: 'Email',
              field: 'email',
              id: 'email',
              type: 'text',
            },
            {
              field: 'userType',
              id: 'userType',
              type: 'select',
              label: 'Seleccione su rol',
              options: jsonToOptions(USER_ROL),
            },
            {
              label: 'Nueva contraseña',
              field: 'password',
              id: 'password',
              type: 'password',
            },
            {
              label: 'Confirmacion de contraseña',
              field: 'passwordConfirmation',
              id: 'passwordConfirmation',
              type: 'password',
            },
          ]}
        </RenderFields>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            className={classes.loginButton}
            disabled={!valid || pristine || submitting}
            type="submit"
          >
            Cambiar contraseña
          </Button>
        </Grid>

        <CustomizedSnackbar />
      </Form>
    </Grid>
  );
};

ResetPassword.propTypes = {
  classes: PropTypes.shape({
    save: PropTypes.string,
    loginButton: PropTypes.string,
  }).isRequired,

  handleResetPassword: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

ResetPassword.defaultProps = {};

const ResetPasswordValidator = (values) => {
  const errors = {};
  if (!values.userType) {
    errors.userType = 'Rol es requerido';
  }
  if (!values.email) {
    errors.email = 'Email es requerido';
  } else if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.email)) {
    errors.email = 'Introduce un email valido';
  }
  if (!values.password) errors.password = 'Campo Requerido';
  if (!values.passwordConfirmation) errors.passwordConfirmation = 'Campo Requerido';

  if (
    values.passwordConfirmation &&
    values.password &&
    values.passwordConfirmation !== values.password
  )
    errors.passwordConfirmation = 'La contraseña de confirmacion no coincide';
  return errors;
};

ResetPassword = reduxForm({
  form: 'login',
  validate: ResetPasswordValidator,
})(ResetPassword);

export default withStyles(styles)(ResetPassword);
