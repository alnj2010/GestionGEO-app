import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, reduxForm } from 'redux-form';
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

import PersonIcon from '@material-ui/icons/LocalLibrary';
import PasswordInput from '../PasswordInput';
import CustomizedSnackbar from '../Snackbar';
import TextInput from '../TextInput';
import RenderFields from '../RenderFields';
import { USER_ROL } from '../../services/constants';
import { jsonToOptions } from '../../helpers';

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
    handleSetStudent,
    handleCloseSetStudent,
    handleForgotPassword,
  } = props;

  return (
    <Grid container item xs={12} justify="center" direction="column" alignItems="center">
      <div className={classes.titleContainer}>
        <div className={classes.titleLogin}>Inicio de sesion</div>
        <div className={classes.subtitleLogin}>
          Procede a iniciar sesion y asi gestionar tus procesos academicos.
        </div>
      </div>

      <Form onSubmit={handleSubmit(handleLogin)} style={{ width: '100%' }}>
        <RenderFields lineal={[12, 12]}>
          {[
            {
              field: 'identification',
              id: 'identification',
              type: 'text',
              label: 'Cedula',
              placeholder: 'Ingresa tu cedula',
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
              ¿Olvido su contraseña?
            </Link>
          </Typography>
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
              {studentsTypes.map((student, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <ListItem button onClick={() => handleSetStudent(student)} key={index}>
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
  handleSetStudent: PropTypes.func.isRequired,
  handleCloseSetStudent: PropTypes.func.isRequired,
  handleForgotPassword: PropTypes.func.isRequired,
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
