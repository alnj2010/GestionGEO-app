import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Form, reduxForm, submit, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import { show } from '../../actions/dialog';
import {
  TEACHER_DEDICATION,
  GENDER,
  LEVEL_INSTRUCTION,
  NATIONALITY,
  TEACHER_ROL,
} from '../../services/constants';
import { jsonToOptions } from '../../helpers';

import Dialog from '../Dialog';
import RenderFields from '../RenderFields';

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

class TeacherDetail extends Component {
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
      handleSubmit,
      saveTeacher,
      goBack,
      teacherId,
      handleTeacherDelete,
      pristine,
      submitting,
      valid,
      submitDispatch,
      teacher,
      teacherType,
    } = this.props;
    const { func } = this.state;

    return (
      <Form onSubmit={handleSubmit(saveTeacher)}>
        <Grid container>
          <Grid item xs={12}>
            <h3>
              {' '}
              {teacherId
                ? `Profesor: ${teacher.first_surname} ${teacher.first_name}`
                : 'Nuevo Profesor'}
            </h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container justify="space-between">
              <RenderFields>
                {[
                  {
                    label: 'Cedula',
                    field: 'identification',
                    id: 'identification',
                    type: 'text',
                  },
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
                    label: 'Segundo apellido',
                    field: 'secondSurname',
                    id: 'secondSurname',
                    type: 'text',
                  },
                  {
                    label: 'Movil',
                    field: 'mobile',
                    id: 'mobile',
                    type: 'phone',
                  },
                  {
                    label: 'Telefono',
                    field: 'telephone',
                    id: 'telephone',
                    type: 'phone',
                  },
                  {
                    label: 'Telefono Trabajo',
                    field: 'workPhone',
                    id: 'workPhone',
                    type: 'phone',
                  },
                  {
                    label: 'Email',
                    field: 'email',
                    id: 'email',
                    type: 'text',
                  },
                  {
                    label: 'Tipo',
                    field: `teacherType`,
                    id: `teacherType`,
                    type: 'select',
                    options: jsonToOptions(TEACHER_ROL),
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
                    label: 'Nivel de instruccion',
                    field: 'levelInstruction',
                    id: 'levelInstruction',
                    type: 'select',
                    options: jsonToOptions(LEVEL_INSTRUCTION),
                  },
                  {
                    label: 'Dedicacion',
                    field: `dedication`,
                    id: `dedication`,
                    type: 'select',
                    options: jsonToOptions(TEACHER_DEDICATION),
                  },
                  {
                    label: '¿Posee alguna discapacidad?',
                    field: 'withDisabilities',
                    id: 'withDisabilities',
                    type: 'switch',
                  },
                ]}
              </RenderFields>
              {teacherType === TEACHER_ROL.INVITADO ? (
                <RenderFields>
                  {[
                    {
                      label: 'Pais',
                      field: 'country',
                      id: 'country',
                      type: 'text',
                    },
                    {
                      label: 'Universidad proveniente',
                      field: 'homeInstitute',
                      id: 'homeInstitute',
                      type: 'text',
                    },
                  ]}
                </RenderFields>
              ) : (
                ''
              )}
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
                        teacherId
                          ? this.handleDialogShow('actualizar', submitDispatch)
                          : submitDispatch('teacher')
                      }
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

                  <Grid item xs={12} sm={3}>
                    {teacherId ? (
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={() => this.handleDialogShow('delete', handleTeacherDelete)}
                      >
                        Borrar
                      </Button>
                    ) : null}
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

TeacherDetail.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string.isRequired,
    buttonContainer: PropTypes.string.isRequired,
    save: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  }).isRequired,

  teacher: PropTypes.shape({
    first_surname: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
  }).isRequired,

  teacherType: PropTypes.string.isRequired,
  teacherId: PropTypes.number.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,

  handleTeacherDelete: PropTypes.func.isRequired,
  showDispatch: PropTypes.func.isRequired,
  submitDispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  saveTeacher: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

const teacherValidation = (values) => {
  const errors = {};
  if (!values.identification) {
    errors.identification = 'Cedula es requerida';
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
    errors.mobile = 'movil es requerido';
  }

  if (!values.email) {
    errors.email = 'Email es requerido';
  } else if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.email)) {
    errors.email = 'Introduce un email valido';
  }

  if (!values.teacherType) errors.teacherType = ' Tipo Requerido';
  if (!values.nationality) errors.nationality = ' Nacionalidad Requerido';
  if (!values.sex) errors.sex = ' Sexo Requerido';
  if (!values.levelInstruction) errors.levelInstruction = ' Nivel de instruccion Requerido';
  if (!values.dedication) errors.dedication = ' Dedicacion Requerido';

  return errors;
};
const selector = formValueSelector('teacher');

let TeacherDetailWrapper = reduxForm({
  form: 'teacher',
  validate: teacherValidation,
  enableReinitialize: true,
})(TeacherDetail);

TeacherDetailWrapper = connect(
  (state) => ({
    initialValues: {
      identification: state.teacherReducer.selectedTeacher.identification
        ? state.teacherReducer.selectedTeacher.identification
        : '',
      firstName: state.teacherReducer.selectedTeacher.first_name
        ? state.teacherReducer.selectedTeacher.first_name
        : '',
      secondName: state.teacherReducer.selectedTeacher.second_name
        ? state.teacherReducer.selectedTeacher.second_name
        : '',
      firstSurname: state.teacherReducer.selectedTeacher.first_surname
        ? state.teacherReducer.selectedTeacher.first_surname
        : '',
      secondSurname: state.teacherReducer.selectedTeacher.second_surname
        ? state.teacherReducer.selectedTeacher.second_surname
        : '',
      email: state.teacherReducer.selectedTeacher.email
        ? state.teacherReducer.selectedTeacher.email
        : '',
      mobile: state.teacherReducer.selectedTeacher.mobile
        ? state.teacherReducer.selectedTeacher.mobile
        : '(   )    -    ',
      telephone: state.teacherReducer.selectedTeacher.telephone
        ? state.teacherReducer.selectedTeacher.telephone
        : '(   )    -    ',
      workPhone: state.teacherReducer.selectedTeacher.work_phone
        ? state.teacherReducer.selectedTeacher.work_phone
        : '(   )    -    ',
      teacherType: state.teacherReducer.selectedTeacher.teacher
        ? state.teacherReducer.selectedTeacher.teacher.teacher_type
        : '',
      nationality: state.teacherReducer.selectedTeacher.nationality
        ? state.teacherReducer.selectedTeacher.nationality
        : '',
      sex: state.teacherReducer.selectedTeacher.sex ? state.teacherReducer.selectedTeacher.sex : '',
      levelInstruction: state.teacherReducer.selectedTeacher.level_instruction
        ? state.teacherReducer.selectedTeacher.level_instruction
        : '',
      dedication: state.teacherReducer.selectedTeacher.teacher
        ? state.teacherReducer.selectedTeacher.teacher.dedication
        : '',
      homeInstitute: state.teacherReducer.selectedTeacher.teacher
        ? state.teacherReducer.selectedTeacher.teacher.home_institute
        : '',
      country: state.teacherReducer.selectedTeacher.teacher
        ? state.teacherReducer.selectedTeacher.teacher.country
        : '',
      withDisabilities: state.teacherReducer.selectedTeacher
        ? state.teacherReducer.selectedTeacher.with_disabilities
        : false,
    },
    action: state.dialogReducer.action,
    teacherType: selector(state, 'teacherType'),
  }),
  { showDispatch: show, submitDispatch: submit }
)(TeacherDetailWrapper);

export default withStyles(styles)(TeacherDetailWrapper);
