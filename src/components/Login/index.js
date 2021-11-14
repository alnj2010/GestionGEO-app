import React from 'react';
import PropTypes from 'prop-types';
import { Form, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
  Link,
} from '@material-ui/core';

import LocalLibrary from '@material-ui/icons/LocalLibrary';
import PersonIcon from '@material-ui/icons/Person';
import CustomizedSnackbar from '../Snackbar';
import RenderFields from '../RenderFields';
import { reverseJson } from '../../helpers/index';
import { USER_ROL } from '../../services/constants';

const styles = () => ({
  input: {
    width: '100%',
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
    margin: '5% 0',
    fontSize: 14,
    letterSpacing: '-0.84px',
    borderRadius: 3,
    backgroundColor: '#2196f3',
    fontWeight: 550,
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

let LoginForm = (props) => {
  const {
    classes,
    handleLogin,
    handleSubmit,
    pristine,
    submitting,
    valid,
    studentsTypes,
    userType,
    handleSetStudent,
    handleSetUserType,
    handleCloseSetUser,
    handleForgotPassword,
  } = props;

  return (
    <Grid container item xs={12} justify="center" direction="column" alignItems="center">
      <div className={classes.titleContainer}>
        <div className={classes.titleLogin}>Inicio de sesión</div>
        <div className={classes.subtitleLogin}>
          Procede a iniciar sesión y así gestionar tus procesos académicos.
        </div>
      </div>

      <Form onSubmit={handleSubmit(handleLogin)} style={{ width: '100%' }}>
        <RenderFields lineal={[12, 12]}>
          {[
            {
              field: 'identification',
              id: 'identification',
              type: 'text',
              label: 'Cédula',
              placeholder: 'Ingresa tu cédula',
            },
            {
              field: 'password',
              id: 'password',
              type: 'password',
              label: 'Contraseña',
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
        <Grid item container justify="flex-end" xs={12}>
          <Typography>
            <Link
              href="/password/forgot"
              className={classes.forgotPassword}
              onClick={handleForgotPassword}
            >
              ¿Olvidó su contraseña?
            </Link>
          </Typography>
        </Grid>

        <CustomizedSnackbar />
        {studentsTypes && (
          <Dialog
            onClose={handleCloseSetUser}
            aria-labelledby="simple-dialog-student-type"
            open={!!studentsTypes}
          >
            <DialogTitle id="simple-dialog-student-type">
              Seleccione el programa académico
            </DialogTitle>
            <List>
              {studentsTypes.map((student, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <ListItem button onClick={() => handleSetStudent(student)} key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      <LocalLibrary />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={student.school_program.school_program_name} />
                </ListItem>
              ))}
            </List>
          </Dialog>
        )}
        {userType && (
          <Dialog
            onClose={handleCloseSetUser}
            aria-labelledby="simple-dialog-user-type"
            open={!!userType}
          >
            <DialogTitle id="simple-dialog-user-type">Seleccione el tipo de usuario</DialogTitle>
            <List>
              {userType.roles.map((rol, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <ListItem button onClick={() => handleSetUserType(rol)} key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={reverseJson(USER_ROL)[rol.user_type]} />
                </ListItem>
              ))}
            </List>
          </Dialog>
        )}
      </Form>
    </Grid>
  );
};

LoginForm.propTypes = {
  classes: PropTypes.shape({
    save: PropTypes.string,
    loginButton: PropTypes.string,
    input: PropTypes.string,
    forgotPassword: PropTypes.string,
    titleContainer: PropTypes.string,
    titleLogin: PropTypes.string,
    subtitleLogin: PropTypes.string,
  }).isRequired,
  studentsTypes: PropTypes.arrayOf(PropTypes.shape({})),
  userType: PropTypes.arrayOf(PropTypes.shape({})),
  handleSetStudent: PropTypes.func.isRequired,
  handleSetUserType: PropTypes.func.isRequired,
  handleCloseSetUser: PropTypes.func.isRequired,
  handleForgotPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  studentsTypes: null,
  userType: null,
};

const loginValidator = (values) => {
  const errors = {};
  if (!values.identification) {
    errors.identification = 'cédula es requerida';
  }
  if (!values.userType) {
    errors.userType = 'rol es requerido';
  }
  if (!values.password) {
    errors.password = 'clave es requerida';
  }
  return errors;
};

LoginForm = reduxForm({
  form: 'login',
  validate: loginValidator,
})(LoginForm);

export default withStyles(styles)(LoginForm);
