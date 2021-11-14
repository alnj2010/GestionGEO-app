import React from 'react';
import PropTypes from 'prop-types';
import { Form, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography, Link } from '@material-ui/core';

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
  backLogin: {
    textAlign: 'right',
    fontSize: 12,
    color: '#007EFF',
    cursor: 'pointer',
  },
  titleContainer: { fontFamily: 'Roboto' },
  titleLogin: { fontWeight: 'bold', fontSize: 24 },
  subtitleLogin: {
    fontWeight: 500,
    fontSize: 13,
    color: '#707070',
    marginTop: 7,
    lineHeight: '18px',
  },
});

let RequestResetPassword = (props) => {
  const {
    classes,
    handleSubmit,
    pristine,
    submitting,
    valid,
    handleForgotPassword,
    handleBackLogin,
  } = props;

  return (
    <Grid container item xs={12} justify="center" direction="column" alignItems="center">
      <div className={classes.titleContainer}>
        <div className={classes.titleLogin}>Recuperación de contraseña</div>
        <div className={classes.subtitleLogin}>
          Procede a recuperar tu contraseña y así gestionar tus procesos académicos.
        </div>
      </div>
      <Form onSubmit={handleSubmit(handleForgotPassword)} style={{ width: '100%' }}>
        <RenderFields lineal={[12, 12]}>
          {[
            {
              label: 'Email',
              field: 'email',
              id: 'email',
              type: 'text',
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
            Recuperar contraseña
          </Button>
        </Grid>
        <Grid item container justify="flex-end" xs={12}>
          <Typography>
            <Link href="/password/forgot" className={classes.backLogin} onClick={handleBackLogin}>
              ¿Desea iniciar sesión?
            </Link>
          </Typography>
        </Grid>
        <CustomizedSnackbar />
      </Form>
    </Grid>
  );
};

RequestResetPassword.propTypes = {
  classes: PropTypes.shape({
    save: PropTypes.string,
    loginButton: PropTypes.string,
    titleContainer: PropTypes.string,
    titleLogin: PropTypes.string,
    subtitleLogin: PropTypes.string,
    backLogin: PropTypes.string,
  }).isRequired,

  handleForgotPassword: PropTypes.func.isRequired,
  handleBackLogin: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

RequestResetPassword.defaultProps = {};

const RequestResetPasswordValidator = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email es requerido';
  } else if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.email)) {
    errors.email = 'Introduce un email valido';
  }
  return errors;
};

RequestResetPassword = reduxForm({
  form: 'RequestResetPassword',
  validate: RequestResetPasswordValidator,
})(RequestResetPassword);

export default withStyles(styles)(RequestResetPassword);
