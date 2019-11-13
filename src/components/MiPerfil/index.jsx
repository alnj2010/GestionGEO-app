import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button
} from '@material-ui/core';
import { Form, reduxForm, change, submit} from 'redux-form';
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

class MiPerfil extends Component {
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
      updateMiPerfil,
      goBack,
      pristine,
      submitting,
      valid,
      handleSubmit,
      submit,
    } = this.props;
    const { func } = this.state;
    let rol = sessionStorage.getItem('rol');
    return (
      <Form onSubmit={handleSubmit(updateMiPerfil)}>
        <Grid container>
          <Grid item xs={12}>
            <h3>Mi Perfil</h3>
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
                { label: 'Sexo',field: `sex`, id: `sex`, type: 'select', options: [{key:'MASCULINO',value:"M"}, {key:'FEMENINO',value:"F"}].map(type => { return { key: type.key, value: type.value } }),disabled:rol!=='A'  },
                { label: 'Nacionalidad',field: `nationality`, id: `nationality`, type: 'select', options: [{key:'VENEZOLANO',value:"V"}, {key:'EXTRANGERO',value:"E"}].map(type => { return { key: type.key, value: type.value } }),disabled:rol!=='A'  },
                { label: 'Nivel de instruccion', field: 'levelInstruction', id: 'levelInstruction', type: 'select', options: [{value:"TSU",id:"TSU"},{value:"TEC MEDIO",id:"TCM"},{value:"DOCTOR",id:"Dr"},{value:"ESPECIALISTA",id:"Esp"},{value:"INGENIERO",id:"Ing"},{value:"MAGISTER SCIENTIARUM",id:"MSc"},{value:"LICENCIADO",id:"Lic"}].map(type => { return { key: type.value, value: type.id } }) },
              ]}</RenderFields>
                
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer} justify="space-between" spacing={16}>
                 
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      className={`${classes.save} ${classes.button}`}
                      onClick={() => this.handleDialogShow('actualizar', submit)}
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

  return errors;
};

MiPerfil = reduxForm({
  form: 'student',
  validate: studentValidation,
  enableReinitialize: true,
})(MiPerfil);

MiPerfil = connect(
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
      levelInstruction:state.miPerfilReducer.selectedMiPerfil.level_instruction
        ? state.miPerfilReducer.selectedMiPerfil.level_instruction
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
)(MiPerfil);

export default withStyles(styles)(MiPerfil);
