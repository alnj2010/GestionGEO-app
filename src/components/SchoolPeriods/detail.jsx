import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  TextField,
} from '@material-ui/core';
import { Form, reduxForm, change, submit, FieldArray, formValueSelector, } from 'redux-form';
import { object, func, bool, number } from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields'
import DatePicker from 'react-datepicker'

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
function RenderDataRange () {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const handleChangeStart=(date) => {
    setStartDate(date)
  }

  const handleChangeEnd=(date) => {
    setEndDate(date)
  }
  return (<Fragment>
    <DatePicker
      selected={startDate}
      selectsStart
      customInput={ ( <TextField />)}
      startDate={startDate}
      endDate={endDate}
      onChange={handleChangeStart}
    />

    <DatePicker
      selected={endDate}
      selectsEnd
      customInput={ ( <TextField />)}
      startDate={startDate}
      endDate={endDate}
      onChange={handleChangeEnd}
      minDate={startDate}
    />
  </Fragment>)
}
class SchoolPeriodDetail extends Component {
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
      saveSchoolPeriod,
      goBack,
      schoolPeriodId,
      handleSchoolPeriodDelete,
      pristine,
      submitting,
      valid,
      submit,
    } = this.props;
    const { func } = this.state;

    return (
      <Form onSubmit={handleSubmit(saveSchoolPeriod)}>
        <Grid container>
          <Grid item xs={12}>
            <h3> {schoolPeriodId ? `Periodo semestral: ${schoolPeriodId}` : 'Nuevo Periodo semestral'}</h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container>
              <Grid container item xs={6}>
                <RenderFields >{[
                  { label: 'Codigo', field: 'codSchoolPeriod', id: 'codSchoolPeriod', type: 'text' },
                  { label: 'Fecha Inicio', field: 'startDate', id: 'startDate', type: 'datetime-local' },
                  { label: 'Fecha Fin', field: 'endDate', id: 'endDate', type: 'datetime-local' },                
                ]}</RenderFields>
                <Grid item xs={12}>
                  <RenderDataRange></RenderDataRange>
                </Grid>
              </Grid>
              <Grid container item xs={6}>
              </Grid>                
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
                    {schoolPeriodId ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          this.handleDialogShow('delete', handleSchoolPeriodDelete)
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
                        schoolPeriodId
                          ? this.handleDialogShow('actualizar', submit)
                          : submit('schoolPeriod')
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

SchoolPeriodDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  saveSchoolPeriod: func.isRequired,
  goBack: func.isRequired,
  schoolPeriodId: number,
  handleSchoolPeriodDelete: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
};

const schoolPeriodValidation = values => {
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

  if(!values.schoolPeriodType) errors.schoolPeriodType = " Tipo Requerido"



  return errors;
};

SchoolPeriodDetail = reduxForm({
  form: 'schoolPeriod',
  validate: schoolPeriodValidation,
  enableReinitialize: true,
})(SchoolPeriodDetail);

SchoolPeriodDetail = connect(
  state => ({
    initialValues: {
      identification: state.schoolPeriodReducer.selectedSchoolPeriod.identification
        ? state.schoolPeriodReducer.selectedSchoolPeriod.identification
        : '',
      firstName: state.schoolPeriodReducer.selectedSchoolPeriod.first_name
        ? state.schoolPeriodReducer.selectedSchoolPeriod.first_name
        : '',
      secondName: state.schoolPeriodReducer.selectedSchoolPeriod.second_name
        ? state.schoolPeriodReducer.selectedSchoolPeriod.second_name
        : '',
      firstSurname: state.schoolPeriodReducer.selectedSchoolPeriod.first_surname
        ? state.schoolPeriodReducer.selectedSchoolPeriod.first_surname
        : '',
      secondSurname: state.schoolPeriodReducer.selectedSchoolPeriod.second_surname
        ? state.schoolPeriodReducer.selectedSchoolPeriod.second_surname
        : '',
      email: state.schoolPeriodReducer.selectedSchoolPeriod.email
        ? state.schoolPeriodReducer.selectedSchoolPeriod.email
        : '',
      mobile: state.schoolPeriodReducer.selectedSchoolPeriod.mobile
        ? state.schoolPeriodReducer.selectedSchoolPeriod.mobile
        : '',
      telephone: state.schoolPeriodReducer.selectedSchoolPeriod.telephone
        ? state.schoolPeriodReducer.selectedSchoolPeriod.telephone
        : '',
      workPhone: state.schoolPeriodReducer.selectedSchoolPeriod.work_phone
        ? state.schoolPeriodReducer.selectedSchoolPeriod.work_phone
        : '',
      schoolPeriodType: state.schoolPeriodReducer.selectedSchoolPeriod.schoolPeriod
        ? state.schoolPeriodReducer.selectedSchoolPeriod.schoolPeriod.schoolPeriod_type
        : '',  
    },
    action: state.dialogReducer.action,
  }),
  { change, show, submit },
)(SchoolPeriodDetail);

export default withStyles(styles)(SchoolPeriodDetail);
