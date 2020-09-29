import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/LocalLibrary';
import PasswordInput from '../PasswordInput';
import CustomizedSnackbar from '../Snackbar';
import TextInput from '../TextInput';
import RenderFields from '../RenderFields';
import logo from '../../images/icon-gestionGeo.svg';
import backImage from '../../images/pif.jpg';
import { USER_ROL } from '../../services/constants';
import { jsonToOptions } from '../../helpers';

const styles = () => ({
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
  const {
    classes,
    handleLogin,
    handleSubmit,
    pristine,
    submitting,
    valid,
    studentsTypes,
    handleSetStudent,
    handleCloseSetStudent,
  } = props;

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
                  label: '¿Como desea ingresar?',
                  options: jsonToOptions(USER_ROL),
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
      {studentsTypes && (
        <Dialog
          onClose={handleCloseSetStudent}
          aria-labelledby="simple-dialog-title"
          open={!!studentsTypes}
        >
          <DialogTitle id="simple-dialog-title">Seleccione el programa academico</DialogTitle>
          <List>
            {studentsTypes.map((student) => (
              <ListItem button onClick={() => handleSetStudent(student)} key={student}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={student.school_program.school_program_name} />
              </ListItem>
            ))}
          </List>
        </Dialog>
      )}
    </Form>
  );
};

LoginForm.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string,
    save: PropTypes.string,
    loginButton: PropTypes.string,
    input: PropTypes.string,
    container: PropTypes.string,
    formContainer: PropTypes.string,
    logo: PropTypes.string,
  }).isRequired,
  studentsTypes: PropTypes.arrayOf(PropTypes.shape({})),
  handleSetStudent: PropTypes.func.isRequired,
  handleCloseSetStudent: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  studentsTypes: null,
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
