import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button
} from '@material-ui/core';
import { Form, reduxForm, change, submit, FieldArray, formValueSelector, } from 'redux-form';
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
  buttonPostgraduates:{
    margin: theme.spacing.unit,
  },
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

class TeacherDetail extends Component {
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
      saveTeacher,
      goBack,
      teacherId,
      handleTeacherDelete,
      pristine,
      submitting,
      valid,
      submit,
    } = this.props;
    const { func } = this.state;

    return (
      <Form onSubmit={handleSubmit(saveTeacher)}>
        <Grid container>
          <Grid item xs={12}>
            <h3> {teacherId ? `Profesor: ${teacherId}` : 'Nuevo Profesor'}</h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container>
              <RenderFields >{[
                { label: 'Cedula', field: 'identification', id: 'identification', type: 'text' },
                { label: 'Nombre', field: 'firstName', id: 'firstName', type: 'text' },
                { label: 'Segundo Nombre', field: 'secondName', id: 'secondName', type: 'text' },
                { label: 'Apellido', field: 'firstSurname', id: 'firstSurname', type: 'text' },
                { label: 'Segundo apellido', field: 'secondSurname', id: 'secondSurname', type: 'text' },
                { label: 'Movil', field: 'mobile', id: 'mobile', type: 'text' },
                { label: 'Telefono', field: 'telephone', id: 'telephone', type: 'text' },
                { label: 'Telefono Trabajo', field: 'workPhone', id: 'workPhone', type: 'text' },
                { label: 'Email', field: 'email', id: 'email', type: 'text' },
                { label: 'Tipo',field: `teacherType`, id: `teacherType`, type: 'select', options: [{value:"INSTRUCTOR",id:"INS"},{value:"ASISTENTE",id:"ASI"},{value:"AGREGADO",id:"AGR"},{value:"TITULAR",id:"TIT"}].map(type => { return { key: type.value, value: type.id } }) },
               
              ]}</RenderFields>
                
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer}>
                  <Grid item xs={4}>
                    <Button variant="contained" onClick={goBack}>
                      Cancelar
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    {teacherId ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          this.handleDialogShow('delete', handleTeacherDelete)
                        }
                      >
                        Borrar
                      </Button>
                    ) : null}
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      className={classes.save}
                      onClick={() =>
                        teacherId
                          ? this.handleDialogShow('actualizar', submit)
                          : submit('teacher')
                      }
                      disabled={!valid || pristine || submitting}
                    >
                      Guardar Cambios
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

TeacherDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  saveTeacher: func.isRequired,
  goBack: func.isRequired,
  teacherId: number,
  handleTeacherDelete: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
};

const teacherValidation = values => {
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
  if (!values.email) {
    errors.email = 'Email es requerido';
  } else if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.email)) {
    errors.email = 'Introduce un email valido';
  }

  if(!values.teacherType) errors.teacherType = " Tipo Requerido"



  return errors;
};

TeacherDetail = reduxForm({
  form: 'teacher',
  validate: teacherValidation,
  enableReinitialize: true,
})(TeacherDetail);

TeacherDetail = connect(
  state => ({
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
        : '',
      telephone: state.teacherReducer.selectedTeacher.telephone
        ? state.teacherReducer.selectedTeacher.telephone
        : '',
      workPhone: state.teacherReducer.selectedTeacher.work_phone
        ? state.teacherReducer.selectedTeacher.work_phone
        : '',
      teacherType: state.teacherReducer.selectedTeacher.teacher
        ? state.teacherReducer.selectedTeacher.teacher.teacher_type
        : '',  
    },
    action: state.dialogReducer.action,
  }),
  { change, show, submit },
)(TeacherDetail);

export default withStyles(styles)(TeacherDetail);
