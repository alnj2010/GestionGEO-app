import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button
} from '@material-ui/core';
import { Form, reduxForm, change, submit} from 'redux-form';
import { object, func, bool, number } from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields'

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
  button:{
    width:'100%'
  }
});

class StudentDetail extends Component {
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
      saveStudent,
      goBack,
      studentId,
      handleStudentDelete,
      pristine,
      submitting,
      valid,
      submit,
    } = this.props;
    const { func } = this.state;
    let rol = sessionStorage.getItem('rol');
    return (
      <Form onSubmit={saveStudent}>
        <Grid container>
          <Grid item xs={12}>
            <h3>Cuenta de usuario</h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container justify="space-between">
              <RenderFields >{[
                { label: 'Cedula', field: 'identification', id: 'identification', type: 'text' },
                { label: 'Nombre', field: 'firstName', id: 'firstName', type: 'text' },
                { label: 'Segundo Nombre', field: 'secondName', id: 'secondName', type: 'text' },
                { label: 'Apellido', field: 'firstSurname', id: 'firstSurname', type: 'text' },
                { label: 'Segundo apellido', field: 'secondSurname', id: 'secondSurname', type: 'text' },
                { label: 'Movil', field: 'mobile', id: 'mobile', type: 'phone' },
                { label: 'Telefono', field: 'telephone', id: 'telephone', type: 'phone' },
                { label: 'Telefono Trabajo', field: 'workPhone', id: 'workPhone', type: 'phone' },
                { label: 'Email', field: 'email', id: 'email', type: 'text' },
                { label: 'Tipo',field: `studentType`, id: `studentType`, type: 'select', options: [{value:"REGULAR",id:"REG"},{value:"EXTENSION",id:"EXT"}].map(type => { return { key: type.value, value: type.id } }),disabled:rol!=='A' },
                { label: 'Universidad de Origen', field: 'homeUniversity', id: 'homeUniversity', type: 'text',disabled:rol!=='A'  },
                { label: 'Sexo',field: `sex`, id: `sex`, type: 'select', options: [{key:'MASCULINO',value:"M"}, {key:'FEMENINO',value:"F"}].map(type => { return { key: type.key, value: type.value } }),disabled:rol!=='A'  },
                { label: 'Nacionalidad',field: `nationality`, id: `nationality`, type: 'select', options: [{key:'VENEZOLANO',value:"V"}, {key:'EXTRANGERO',value:"E"}].map(type => { return { key: type.key, value: type.value } }),disabled:rol!=='A'  },
              ]}</RenderFields>
                
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer} justify="space-between" spacing={16}>
                 
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      className={`${classes.save} ${classes.button}`}
                      onClick={() =>
                        studentId
                          ? this.handleDialogShow('actualizar', submit)
                          : submit('student')
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
                    {studentId ? (
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          this.handleDialogShow('delete', handleStudentDelete)
                        }
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

StudentDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  saveStudent: func.isRequired,
  goBack: func.isRequired,
  studentId: number,
  handleStudentDelete: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
};

const studentValidation = values => {
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
    if (!values.mobile || values.mobile==='(   )    -    ') {
      errors.mobile = 'movil es requerido';
    }
  if (!values.email) {
    errors.email = 'Email es requerido';
  } else if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.email)) {
    errors.email = 'Introduce un email valido';
  }

  if(!values.nationality) errors.nationality = " Nacionalidad Requerido"
  if(!values.sex) errors.sex = " Sexo Requerido"
  if(!values.schoolProgram) errors.schoolProgram = "Programa academico del estudiante Requerido"
  if(!values.studentType) errors.studentType = " Tipo Requerido"
  if(!values.homeUniversity) errors.homeUniversity = "Universidad de origen Requerido"

  return errors;
};

StudentDetail = reduxForm({
  form: 'student',
  validate: studentValidation,
  enableReinitialize: true,
})(StudentDetail);

StudentDetail = connect(
  state => ({
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
      schoolProgram: state.miPerfilReducer.selectedMiPerfil.student
        ? state.miPerfilReducer.selectedMiPerfil.student.school_program_id
        : '',
      studentType: state.miPerfilReducer.selectedMiPerfil.student
        ? state.miPerfilReducer.selectedMiPerfil.student.student_type
        : '',
      homeUniversity: state.miPerfilReducer.selectedMiPerfil.student
        ? state.miPerfilReducer.selectedMiPerfil.student.home_university
        : '',
      sex:state.miPerfilReducer.selectedMiPerfil.sex
        ? state.miPerfilReducer.selectedMiPerfil.sex
        : '',
      nationality:state.miPerfilReducer.selectedMiPerfil.nationality
        ? state.miPerfilReducer.selectedMiPerfil.nationality
        : '',
    },
    action: state.dialogReducer.action,
  }),
  { change, show, submit },
)(StudentDetail);

export default withStyles(styles)(StudentDetail);
