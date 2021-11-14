import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { Form, reduxForm, submit, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import { show } from '../../actions/dialog';
import { COORDINATOR_ROL, GENDER, LEVEL_INSTRUCTION, NATIONALITY } from '../../services/constants';
import { jsonToOptions } from '../../helpers';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields';

import { getSessionIsMainUser, getSessionUser } from '../../storage/sessionStorage';

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

class AdminDetail extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  handleDialogShow = (action, func) => {
    this.setState({ func }, () => {
      const { showDispatch } = this.props;
      showDispatch(action);
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
      submitDispatch,
      admin,
      convertUserTo,
      initialValues,
    } = this.props;
    const { func } = this.state;
    const isMain = getSessionIsMainUser() === 'true';
    const {
      administrator: { rol: rolSesionActual, id: idSesionActual },
    } = getSessionUser();
    const isActual = idSesionActual === admin.administrator.id;
    return (
      <Form onSubmit={handleSubmit(saveAdmin)}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="space-between">
              <h3>
                {' '}
                {adminId
                  ? `Administrador: ${admin.first_surname || ''} ${admin.first_name || ''}`
                  : 'Nuevo Administrador'}
              </h3>
              {adminId && (
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    e.preventDefault();
                    convertUserTo({ userType: 'profesores', userData: initialValues });
                  }}
                  disabled={adminId && !admin.id}
                >
                  Convertir en Profesor
                </Button>
              )}
            </Grid>
            <hr />
          </Grid>
          {!adminId || admin.id ? (
            <Grid item xs={12} className={classes.form}>
              <Grid container justify="space-between">
                <RenderFields>
                  {[
                    {
                      label: 'Nombre',
                      field: 'firstName',
                      id: 'firstName',
                      type: 'text',
                    },
                    {
                      label: 'Segundo Nombre',
                      field: 'secondName',
                      id: 'secondName',
                      type: 'text',
                    },
                    {
                      label: 'Apellido',
                      field: 'firstSurname',
                      id: 'firstSurname',
                      type: 'text',
                    },
                    {
                      label: 'Segundo Apellido',
                      field: 'secondSurname',
                      id: 'secondSurname',
                      type: 'text',
                    },
                    {
                      label: 'cédula',
                      field: 'identification',
                      id: 'identification',
                      type: 'text',
                    },
                    {
                      label: 'Email',
                      field: 'email',
                      id: 'email',
                      type: 'text',
                    },
                    {
                      label: 'Móvil',
                      field: 'mobile',
                      id: 'mobile',
                      type: 'phone',
                    },
                    {
                      label: 'Teléfono de habitación',
                      field: 'telephone',
                      id: 'telephone',
                      type: 'phone',
                    },
                    {
                      label: 'Teléfono Trabajo',
                      field: 'workPhone',
                      id: 'workPhone',
                      type: 'phone',
                    },
                    {
                      label: 'Sexo',
                      field: `sex`,
                      id: `sex`,
                      type: 'select',
                      options: jsonToOptions(GENDER),
                    },
                    {
                      label: 'Nacionalidad',
                      field: `nationality`,
                      id: `nationality`,
                      type: 'select',
                      options: jsonToOptions(NATIONALITY),
                    },
                    {
                      select: {
                        label: 'Nivel de instrucción',
                        field: 'levelInstruction',
                        id: 'levelInstruction',
                        options: jsonToOptions(LEVEL_INSTRUCTION),
                      },
                      text: {
                        label: 'Título',
                        field: 'levelInstructionName',
                        id: 'levelInstructionName',
                      },
                      type: 'instruction',
                    },
                    {
                      label: 'Rol',
                      field: `rol`,
                      id: `rol`,
                      type: 'select',
                      options: jsonToOptions(COORDINATOR_ROL),
                    },

                    {
                      label: '¿Posee alguna discapacidad?',
                      field: 'withDisabilities',
                      id: 'withDisabilities',
                      type: 'switch',
                    },
                    {
                      label: '¿Coordinador principal?',
                      field: 'principal',
                      id: 'principal',
                      type:
                        isMain && rolSesionActual !== COORDINATOR_ROL.SECRETARIO && !isActual
                          ? 'switch'
                          : 'hidden',
                    },
                    {
                      label: '¿Usuario activo?',
                      field: 'active',
                      id: 'active',
                      type: adminId ? 'switch' : 'hidden',
                      tooltipText:
                        'Campo que habilita al usuario el poder ingresar al sistema GestionGeo. Por defecto es SI',
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
                          adminId
                            ? this.handleDialogShow('actualizar', submitDispatch)
                            : submitDispatch('administrador')
                        }
                        disabled={!valid || pristine || submitting}
                      >
                        Guardar Cambios
                      </Button>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Button variant="contained" onClick={goBack} className={classes.button}>
                        Ir al listado
                      </Button>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      {adminId ? (
                        <Button
                          className={classes.button}
                          variant="contained"
                          color="secondary"
                          onClick={() => this.handleDialogShow('borrar', handleAdminDelete)}
                        >
                          Borrar
                        </Button>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid container justify="center">
              <CircularProgress />
            </Grid>
          )}
        </Grid>
        <Dialog handleAgree={func} />
      </Form>
    );
  };
}

AdminDetail.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string,
    buttonContainer: PropTypes.string,
    save: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,

  admin: PropTypes.shape({
    first_surname: PropTypes.string,
    first_name: PropTypes.string,
    administrator: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  }).isRequired,

  // eslint-disable-next-line react/forbid-prop-types
  adminId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,

  showDispatch: PropTypes.func.isRequired,
  submitDispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  saveAdmin: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  handleAdminDelete: PropTypes.func.isRequired,
};

AdminDetail.defaultProps = {
  adminId: null,
};

const adminValidation = (values) => {
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
    errors.identification = 'cédula es requerido';
  }

  if (!values.email) {
    errors.email = 'Email es requerido';
  } else if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.email)) {
    errors.email = 'Introduce un email valido';
  }

  if (!values.mobile || values.mobile === '(   )    -    ') {
    errors.mobile = 'móvil es requerido';
  }
  if (!values.nationality) errors.nationality = ' Nacionalidad Requerido';
  if (!values.sex) errors.sex = ' Sexo Requerido';
  if (!values.levelInstruction) errors.levelInstruction = ' Nivel de instrucción Requerido';
  if (!values.levelInstructionName) errors.levelInstructionName = ' Nivel de instrucción Requerido';
  if (!values.rol) {
    errors.rol = ' Rol Requerido';
  } else if (values.rol === COORDINATOR_ROL.SECRETARIO && values.principal) {
    errors.rol = ' Un secretario no puede ser coordinador principal';
  }
  return errors;
};

let AdminDetailWrapper = reduxForm({
  form: 'administrador',
  validate: adminValidation,
  enableReinitialize: true,
})(AdminDetail);
const selector = formValueSelector('administrador');

AdminDetailWrapper = connect(
  (state) => ({
    initialValues: {
      firstName:
        state.adminReducer.selectedAdmin.first_name ??
        state.userToConvertReducer.selectedUserToConvert.first_name ??
        '',
      secondName:
        state.adminReducer.selectedAdmin.second_name ??
        state.userToConvertReducer.selectedUserToConvert.second_name ??
        '',
      firstSurname:
        state.adminReducer.selectedAdmin.first_surname ??
        state.userToConvertReducer.selectedUserToConvert.first_surname ??
        '',
      secondSurname:
        state.adminReducer.selectedAdmin.second_surname ??
        state.userToConvertReducer.selectedUserToConvert.second_surname ??
        '',
      identification:
        state.adminReducer.selectedAdmin.identification ??
        state.userToConvertReducer.selectedUserToConvert.identification ??
        '',
      email:
        state.adminReducer.selectedAdmin.email ??
        state.userToConvertReducer.selectedUserToConvert.email ??
        '',
      mobile:
        state.adminReducer.selectedAdmin.mobile ??
        state.userToConvertReducer.selectedUserToConvert.mobile ??
        '(   )    -    ',
      telephone:
        state.adminReducer.selectedAdmin.telephone ??
        state.userToConvertReducer.selectedUserToConvert.telephone ??
        '(   )    -    ',
      workPhone: state.adminReducer.selectedAdmin.work_phone
        ? state.adminReducer.selectedAdmin.work_phone
        : '(   )    -    ',
      rol: state.adminReducer.selectedAdmin.administrator
        ? state.adminReducer.selectedAdmin.administrator.rol
        : '',
      sex:
        state.adminReducer.selectedAdmin.sex ??
        state.userToConvertReducer.selectedUserToConvert.sex ??
        '',
      nationality:
        state.adminReducer.selectedAdmin.nationality ??
        state.userToConvertReducer.selectedUserToConvert.nationality ??
        '',
      levelInstruction:
        state.adminReducer.selectedAdmin.level_instruction ??
        state.userToConvertReducer.selectedUserToConvert.level_instruction ??
        '',
      levelInstructionName:
        state.adminReducer.selectedAdmin.level_instruction_name ??
        state.userToConvertReducer.selectedUserToConvert.level_instruction_name ??
        '',
      principal: state.adminReducer.selectedAdmin.administrator
        ? state.adminReducer.selectedAdmin.administrator.principal
        : false,
      withDisabilities: state.adminReducer.selectedAdmin
        ? state.adminReducer.selectedAdmin.with_disabilities
        : false,
      active: !!state.adminReducer.selectedAdmin.active,
    },
    action: state.dialogReducer.action,
    rol: selector(state, 'rol'),
  }),
  { showDispatch: show, submitDispatch: submit }
)(AdminDetailWrapper);

export default withStyles(styles)(AdminDetailWrapper);
