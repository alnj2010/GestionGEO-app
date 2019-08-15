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
            <h3> {adminId ? `Administrador: ${adminId}` : 'Nuevo Administrador'}</h3>
            <hr />
          </Grid>
          <Grid item xs={6} className={classes.form}>
            <Grid container>
              <RenderFields >{[
                { label: 'Nombre', field: 'firstName', id: 'firstName', type: 'text' },
                { label: 'Segundo Nombre', field: 'secondName', id: 'secondName', type: 'text' },
                { label: 'Apellido', field: 'firstSurname', id: 'firstSurname', type: 'text' },
                { label: 'Segundo apellido', field: 'secondSurname', id: 'secondSurname', type: 'text' },
                { label: 'Cedula', field: 'identification', id: 'identification', type: 'text' },
                { label: 'Email', field: 'email', id: 'email', type: 'email' },
                { label: 'Movil', field: 'mobile', id: 'mobile', type: 'text' },
                { label: 'Telefono', field: 'telephone', id: 'telephone', type: 'text' },
                { label: 'Telefono Trabajo', field: 'workPhone', id: 'workPhone', type: 'text' },
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
                          ? this.handleDialogShow('actualizar', submit)
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

  if (!values.firstName) {
    errors.firstName = 'Nombre es requerido';
  } else if (/(?=[0-9])/.test(values.firstName))
    errors.firstName = 'El nombre no debe contener numeros';

  if (!values.firstSurname) {
    errors.firstSurname = 'Apellido es requerido';
  } else if (/(?=[0-9])/.test(values.firstSurname))
    errors.firstSurname = 'El Apellido no debe contener numeros';

  if (!values.identification) {
    errors.identification = 'Cedula es requerido';
  }

  if (!values.email) {
    errors.email = 'Email es requerido';
  } else if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.email)) {
    errors.email = 'Introduce un email valido';
  }

  if (!values.mobile) {
    errors.mobile = 'movil es requerido';
  } else if (!/^[0][4][1-9][1-9][0-9]{7}$/.test(values.mobile)) {
    errors.mobile = 'Introduce un movil valido';
  }

  if (values.telephone && !/^[0][1-9][1-9][1-9][0-9]{7}$/.test(values.telephone)) {
    errors.telephone = 'Introduce un telefono valido';
  }

  if (values.workPhone && !/^[0][1-9][1-9][1-9][0-9]{7}$/.test(values.workPhone)) {
    errors.workPhone = 'Introduce un telefono valido';
  }

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
      firstName: state.adminReducer.selectedAdmin.first_name
        ? state.adminReducer.selectedAdmin.first_name
        : '',
      secondName: state.adminReducer.selectedAdmin.second_name
        ? state.adminReducer.selectedAdmin.second_name
        : '',
      firstSurname: state.adminReducer.selectedAdmin.first_surname
        ? state.adminReducer.selectedAdmin.first_surname
        : '',
      secondSurname: state.adminReducer.selectedAdmin.second_surname
        ? state.adminReducer.selectedAdmin.second_surname
        : '',
      identification: state.adminReducer.selectedAdmin.identification
        ? state.adminReducer.selectedAdmin.identification
        : '',
      email: state.adminReducer.selectedAdmin.email
        ? state.adminReducer.selectedAdmin.email
        : '',
      mobile: state.adminReducer.selectedAdmin.mobile
        ? state.adminReducer.selectedAdmin.mobile
        : '',
      telephone: state.adminReducer.selectedAdmin.telephone
        ? state.adminReducer.selectedAdmin.telephone
        : '',
      workPhone: state.adminReducer.selectedAdmin.work_phone
        ? state.adminReducer.selectedAdmin.work_phone
        : '',
    },
    action: state.dialogReducer.action,
  }),
  { change, show, submit },
)(AdminDetail);

export default withStyles(styles)(AdminDetail);
