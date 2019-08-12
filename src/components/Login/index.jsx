import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PasswordInput from '../PasswordInput';
import CustomizedSnackbar from '../Snackbar';
import TextInput from '../TextInput';
import { bool, object, string, func } from 'prop-types';
import RenderFields from '../RenderFields'

const styles = theme => ({
  container: {
    paddingLeft: '30%',
    paddingTop: '10%',
    paddingRight: '30%',
  },
  input: {
    width: '100%',
  },
  form: {
    boxShadow: '-0.6px 1.2px 4px 0.5px rgba(66,71,78,0.3)',
  },
  formContainer: {
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '5%',
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
  welcomeText: {
    color: '#4A4A4A',
    fontSize: 14,
    marginBottom: 0,
  },
  subtitleText: {
    color: '#4A4A4A',
    fontSize: 26,
    marginTop: 0,
    marginBottom: 0,
  },
  loginBackground: {
    height: '100%',
    width: '100%',
  },
  logo: {
    height: '100%',
  },
  footer: { color: '#4A4A4A', fontSize: 12, paddingTop: '1%' },
  footerText: { cursor: 'pointer' },
});

let LoginForm = props => {
  const {
    classes,
    handleLogin,
    handleSubmit,
    pristine,
    submitting,
    valid,
  } = props;
  let rol=[{
    key:"ESTUDIANTE",
    value:"S"
  },{
    key:"ADMINISTRADOR",
    value:"A"
  },{
    key:"PROFESOR",
    value:"T"
  }]
  return (
    <Form onSubmit={handleSubmit(handleLogin)}>
      <Grid container className={classes.container}>
        <Grid className={classes.form} item xs={12}>
          <Grid
            container
            spacing={8}
            className={classes.formContainer}
            id="loginForm"
          >
            <Grid item xs={12}>
              <p className={classes.welcomeText}>Inicio de Sesion</p>
              <p className={classes.subtitleText}>GestionGEO</p>
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
              <RenderFields >{[
                {field: 'user_type', id: 'user_type', type: 'select', placeholder:'¿Como desea ingresar?', options: rol.map(type => { return { key: type.key, value: type.value } }) },
              ]}</RenderFields>

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

const loginValidator = values => {
  const errors = {};
  if (!values.identification) {
    errors.identification = 'Cedula es requerida';
  }
  if (!values.user_type) {
    errors.user_type = 'Rol es requerido';
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
