import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Form, reduxForm, submit } from 'redux-form';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields';
import { jsonToOptions } from '../../helpers';
import { GENDER, NATIONALITY, LEVEL_INSTRUCTION } from '../../services/constants';
import { getSessionUserRol } from '../../storage/sessionStorage';

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

class MiPerfil extends Component {
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
      updateMiPerfil,
      goBack,
      pristine,
      submitting,
      valid,
      handleSubmit,
      submitDispatch,
    } = this.props;
    const { func } = this.state;
    const rol = getSessionUserRol();
    return (
      <Form onSubmit={handleSubmit(updateMiPerfil)}>
        <Grid container>
          <Grid item xs={12}>
            <h3>Mi Perfil</h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container justify="space-between">
              <RenderFields>
                {[
                  {
                    label: 'Nombre',
                    field: 'firstName',
                    id: 'firstName',
                    type: 'text',
                    disabled: rol !== 'A',
                  },
                  {
                    label: 'Segundo Nombre',
                    field: 'secondName',
                    id: 'secondName',
                    type: 'text',
                    disabled: rol !== 'A',
                  },
                  {
                    label: 'Apellido',
                    field: 'firstSurname',
                    id: 'firstSurname',
                    type: 'text',
                    disabled: rol !== 'A',
                  },
                  {
                    label: 'Segundo apellido',
                    field: 'secondSurname',
                    id: 'secondSurname',
                    type: 'text',
                    disabled: rol !== 'A',
                  },
                  {
                    label: 'Cédula',
                    field: 'identification',
                    id: 'identification',
                    type: 'text',
                    disabled: rol !== 'A',
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
                    disabled: rol !== 'A',
                  },
                  {
                    label: 'Nacionalidad',
                    field: `nationality`,
                    id: `nationality`,
                    type: 'select',
                    options: jsonToOptions(NATIONALITY),
                    disabled: rol !== 'A',
                  },
                  {
                    select: {
                      label: 'Nivel de instrucción',
                      field: 'levelInstruction',
                      id: 'levelInstruction',
                      options: jsonToOptions(LEVEL_INSTRUCTION),
                      disabled: rol !== 'A',
                    },
                    text: {
                      label: 'Título',
                      field: 'levelInstructionName',
                      id: 'levelInstructionName',
                      disabled: rol !== 'A',
                    },
                    type: 'instruction',
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
                      onClick={() => this.handleDialogShow('actualizar', submitDispatch)}
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

MiPerfil.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    form: PropTypes.string,
    buttonContainer: PropTypes.string,
    save: PropTypes.string,
  }).isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,

  showDispatch: PropTypes.func.isRequired,
  submitDispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateMiPerfil: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

const studentValidation = (values) => {
  const errors = {};
  if (!values.identification) {
    errors.identification = 'Cédula es requerida';
  }
  if (!values.firstName) {
    errors.firstName = 'Nombre es requerido';
  } else if (/(?=[0-9])/.test(values.firstName))
    errors.firstName = 'El nombre no debe contener numeros';

  if (!values.firstSurname) {
    errors.firstSurname = 'Apellido es requerido';
  } else if (/(?=[0-9])/.test(values.firstSurname))
    errors.firstSurname = 'El Apellido no debe contener numeros';
  if (!values.mobile || values.mobile === '(   )    -    ') {
    errors.mobile = 'Móvil es requerido';
  }
  if (!values.email) {
    errors.email = 'Email es requerido';
  } else if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.email)) {
    errors.email = 'Introduce un email valido';
  }

  if (!values.nationality) errors.nationality = ' Nacionalidad Requerido';
  if (!values.sex) errors.sex = ' Sexo Requerido';

  if (!values.levelInstruction) errors.levelInstruction = ' Nivel de instrucción Requerido';
  if (!values.levelInstructionName) errors.levelInstructionName = ' Nivel de instrucción Requerido';

  return errors;
};

let MiPerfilWrapper = reduxForm({
  form: 'perfil',
  validate: studentValidation,
  enableReinitialize: true,
})(MiPerfil);

MiPerfilWrapper = connect(
  (state) => ({
    initialValues: {
      identification: state.miPerfilReducer.selectedMiPerfil.identification
        ? state.miPerfilReducer.selectedMiPerfil.identification
        : '',
      firstName: state.miPerfilReducer.selectedMiPerfil.first_name
        ? state.miPerfilReducer.selectedMiPerfil.first_name
        : '',
      secondName: state.miPerfilReducer.selectedMiPerfil.second_name
        ? state.miPerfilReducer.selectedMiPerfil.second_name
        : '',
      firstSurname: state.miPerfilReducer.selectedMiPerfil.first_surname
        ? state.miPerfilReducer.selectedMiPerfil.first_surname
        : '',
      secondSurname: state.miPerfilReducer.selectedMiPerfil.second_surname
        ? state.miPerfilReducer.selectedMiPerfil.second_surname
        : '',
      email: state.miPerfilReducer.selectedMiPerfil.email
        ? state.miPerfilReducer.selectedMiPerfil.email
        : '',
      mobile: state.miPerfilReducer.selectedMiPerfil.mobile
        ? state.miPerfilReducer.selectedMiPerfil.mobile
        : '(   )    -    ',
      telephone: state.miPerfilReducer.selectedMiPerfil.telephone
        ? state.miPerfilReducer.selectedMiPerfil.telephone
        : '(   )    -    ',
      workPhone: state.miPerfilReducer.selectedMiPerfil.work_phone
        ? state.miPerfilReducer.selectedMiPerfil.work_phone
        : '(   )    -    ',
      levelInstruction: state.miPerfilReducer.selectedMiPerfil.level_instruction
        ? state.miPerfilReducer.selectedMiPerfil.level_instruction
        : '',
      levelInstructionName: state.miPerfilReducer.selectedMiPerfil.level_instruction_name
        ? state.miPerfilReducer.selectedMiPerfil.level_instruction_name
        : '',
      sex: state.miPerfilReducer.selectedMiPerfil.sex
        ? state.miPerfilReducer.selectedMiPerfil.sex
        : '',
      nationality: state.miPerfilReducer.selectedMiPerfil.nationality
        ? state.miPerfilReducer.selectedMiPerfil.nationality
        : '',
    },
    action: state.dialogReducer.action,
  }),
  { showDispatch: show, submitDispatch: submit }
)(MiPerfilWrapper);

export default withStyles(styles)(MiPerfilWrapper);
