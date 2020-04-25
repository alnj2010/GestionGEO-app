import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { bool, object, string, func } from 'prop-types';
import PasswordInput from '../PasswordInput';
import CustomizedSnackbar from '../Snackbar';
import TextInput from '../TextInput';
import RenderFields from '../RenderFields';
import logo from '../../images/icon-gestionGeo.svg';
import backImage from '../../images/pif.jpg';

const styles = (theme) => ({
  container: {
    paddingLeft: '30%',
    paddingTop: '10%',
    paddingRight: '30%',
    backgroundImage: `url(${backImage})`,
    height: '100vh',
  },
  input: {
    width: '100%',
  },
  form: {
    borderRadius: '10px',
  },
  formContainer: {
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '5%',
    backgroundColor: 'white',
  },
  forgotPassword: {
    textAlign: 'right',
    fontSize: 12,
    color: '#007EFF',
    cursor: 'pointer',
  },
  forgotPasswordText: {
    paddingTop: '2%',
    paddingBottom: '7%',
  },
  loginButton: {
    width: '100%',
    marginBottom: '15%',
    fontSize: 14,
    letterSpacing: '-0.84px',
    borderRadius: 3,
    backgroundColor: '#2196f3',
    fontWeight: 550,
  },
  logo: {
    width: '60%',
    height: 'auto',
  },
});

let LoginForm = (props) => {
  const { classes, handleLogin, handleSubmit, pristine, submitting, valid } = props;
  const rol = [
    {
      key: 'ESTUDIANTE',
      value: 'S',
    },
    {
      key: 'ADMINISTRADOR',
      value: 'A',
    },
    {
      key: 'PROFESOR',
      value: 'T',
    },
  ];
  return (
    <Form onSubmit={handleSubmit(handleLogin)}>
      <Grid container className={classes.container}>
        <Grid className={classes.form} item xs={12}>
          <Grid container spacing={8} className={classes.formContainer} id="loginForm">
            <Grid container item xs={12} justify="center" direction="column" alignItems="center">
              <img src={logo} alt="GestionGEO" className={classes.logo} />
            </Grid>

            <Grid item xs={12}>
              <Field
                name="identification"
                component={TextInput}
                id="identification"
                label="Cedula"
                placeholder="Ingresa tu cedula"
                margin="normal"
                type="text"
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="password"
                component={PasswordInput}
                className={classes.input}
                id="password"
                ariaLabel="Ver clave"
                inputLabel="Clave"
              />
            </Grid>
            <RenderFields>
              {[
                {
                  field: 'userType',
                  id: 'userType',
                  type: 'select',
                  placeholder: '¿Como desea ingresar?',
                  options: rol.map((type) => {
                    return {
                      key: type.key,
                      value: type.value,
                    };
                  }),
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
                Ingresar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <CustomizedSnackbar />
    </Form>
  );
};

LoginForm.propTypes = {
  classes: object.isRequired,
  showMenssageFloat: bool.isRequired,
  menssageFloat: string,
  handleLogin: func.isRequired,
};

const loginValidator = (values) => {
  const errors = {};
  if (!values.identification) {
    errors.identification = 'Cedula es requerida';
  }
  if (!values.userType) {
    errors.userType = 'Rol es requerido';
  }
  if (!values.password) {
    errors.password = 'Clave es requerida';
  }
  return errors;
};

LoginForm = reduxForm({
  form: 'login',
  validate: loginValidator,
})(LoginForm);

export default withStyles(styles)(LoginForm);
