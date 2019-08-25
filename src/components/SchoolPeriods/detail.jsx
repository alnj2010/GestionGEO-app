import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import * as moment from 'moment';
import { Form, reduxForm, change, submit, FieldArray, formValueSelector, } from 'redux-form';
import { object, func, bool, number } from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
  inputLabel: {
    paddingTop: '4%',
  },
  input: {
    alignSelf: 'center',
  },
  fab: {
    marginTop:50,
    margin: theme.spacing.unit,
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
  buttonSchedule:{
    marginTop: theme.spacing.unit,
    padding: 2,
    width: '22%',
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

class SchoolPeriodDetail extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }
  unselectedSubjects = ( pos ) =>{
    const {subjects, subjectsSelected} =this.props;
    return subjects.filter( item => !subjectsSelected.some((selected,index)=>selected.id===item.id && pos>index) )
  }

  renderSchedule = ({ fields, meta: { error, submitFailed } }) => (<Grid container item justify="center">    
  {fields.map((schedule, index) => (
    <Fragment key={index}>
      <Grid item xs={4}>
        <RenderFields >{[
          { placeholder: 'Dia',field: `${schedule}.day`, id: `${schedule}.day`, type: 'select', options: ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'].map(day => { return { key: day, value: day } }) },
        ]}</RenderFields>      
      </Grid>
      <Grid item xs={3}>
        <RenderFields >{[
          { placeholder: 'Hora inicio',field: `${schedule}.startHour`, id: `${schedule}.startHour`, type: 'time' },
        ]}</RenderFields>      
      </Grid>
      <Grid item xs={3}>
        <RenderFields >{[
          { placeholder: 'Hora fin',field: `${schedule}.endHour`, id: `${schedule}.endHour`, type: 'time' },
        ]}</RenderFields>      
      </Grid>
      <Grid item xs={2}>
        <RenderFields >{[
          { placeholder: 'Aula',field: `${schedule}.classroom`, id: `${schedule}.classroom`, type: 'text' },
        ]}</RenderFields>      
      </Grid>
    </Fragment>      
    ))}
    <Grid item xs={12}>
        <Button variant="contained" color="primary" className={this.props.classes.buttonSchedule} onClick={() => fields.push({})} >horario +</Button>
    </Grid>
  </Grid>)

  renderSubjects = ({ fields, meta: { error, submitFailed } }) => (<Grid container item justify="center">    
    {fields.map((subject, index) => (
    <Fragment key={index}>
      <Grid item xs={12}>
        <RenderFields >{[
          {field: `${subject}.subjectId`, id: `${subject}.subjectId`, type: 'select', placeholder:'Materia', options: this.unselectedSubjects(index).map(subject => { return { key: subject.subject_name, value: subject.id } }) },
          {field: `${subject}.teacherId`, id: `${subject}.teacherId`, type: 'select', placeholder:'Profesor impartidor', options: this.props.teachers.map(teacher => { return { key: `${teacher.first_name} ${teacher.second_name?teacher.second_name:''} ${teacher.first_surname} ${teacher.second_surname?teacher.second_surname:''}`, value: teacher.id } }) },
          {placeholder: 'Maximo de alumnos', field: `${subject}.limit`, id: `${subject}.limit`, type: 'number', min:0 },
          {placeholder: 'Aranceles (Bs)', field: `${subject}.duty`, id: `${subject}.duty`, type: 'number', min:0 },
        ]}</RenderFields>      
      </Grid>
      <Grid item xs={12}>
        <FieldArray name={`${subject}.schedule`} component={this.renderSchedule} />
      </Grid>
    </Fragment>      
    ))}
    <Fab color="primary" aria-label="Add" className={this.props.classes.fab} disabled={this.props.subjects && this.props.subjectsSelected && (this.props.subjects.length===this.props.subjectsSelected.length)} onClick={() => fields.push({})}>
      <AddIcon />
    </Fab>
  </Grid>)

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
      startDate,
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
                  { label: 'Fecha Inicio', field: 'startDate', id: 'startDate', type: 'date' }, 
                  { label: 'Fecha Fin', field: 'endDate', id: 'endDate', type: 'date', minDate:(new Date(startDate)), disabled:startDate==='Invalid date' },
                ]}</RenderFields>
              </Grid>
              <Grid container item xs={6}></Grid>
              <Grid container item xs={6}>
                <RenderFields >{[
                  { label: 'Materias del periodo', type: 'label' },        
                ]}</RenderFields>
                <FieldArray name="subject" component={this.renderSubjects} />
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

  if (!values.codSchoolPeriod) {
    errors.codSchoolPeriod = '*codigo es requerido';
  }
  if(!values.startDate || values.startDate === '*Invalid date') 
    errors.startDate = '*Fecha inicial es requerida';

  if(!values.endDate || values.endDate === '*Invalid date') 
    errors.endDate = '*Fecha fin es requerida';
  else if((new Date(values.endDate) <= new Date(values.startDate)))
    errors.endDate = '*Fecha fin no debe estar por debajo de la inicial';  

  if (values.subject && values.subject.length){
    const subjectArrayErrors = []
    values.subject.forEach((subj, subjIndex) => {
      const subjErrors = {}
      if (!subj || !subj.subjectId) {
        subjErrors.subjectId = '*Materia es requerido'
        subjectArrayErrors[subjIndex] = subjErrors
      }
      if (!subj || !subj.teacherId) {
        subjErrors.teacherId = '*Profesor es requerido'
        subjectArrayErrors[subjIndex] = subjErrors
      }
      if (!subj || !subj.limit) {
        subjErrors.limit = '*Maximo de alumnos es requerido'
        subjectArrayErrors[subjIndex] = subjErrors
      }  
      if (!subj || !subj.duty) {
        subjErrors.duty = '*Aranceles es requerido'
        subjectArrayErrors[subjIndex] = subjErrors
      }
  
      if (subj.schedule && subj.schedule.length){
        subjErrors.schedule = []
        subj.schedule.forEach((sche,scheIndex)=>{

          const scheErrors = {}
          if (!sche || !sche.day) {
            scheErrors.day = '*Dia es requerido'
            subjErrors.schedule[scheIndex] = scheErrors
          }
          if (!sche || !sche.classroom) {
            scheErrors.classroom = '*Aula es requerido'
            subjErrors.schedule[scheIndex] = scheErrors
          }
          if (!sche || !sche.startHour) {
            scheErrors.startHour = '*Hora inicio es requerida'
            subjErrors.schedule[scheIndex] = scheErrors
          }
          if (!sche || !sche.endHour) {
            scheErrors.endHour = '*Hora fin es requerida'
            subjErrors.schedule[scheIndex] = scheErrors
          } else if((sche.endHour <= sche.startHour))
          scheErrors.endHour = '*Hora fin no debe estar por debajo de la inicial';  
        })
        subjectArrayErrors[subjIndex] = subjErrors
      }
  
    })

    





    if (subjectArrayErrors.length) {
      errors.subject = subjectArrayErrors
    }
  }
  console.log(errors);
  return errors;
};

SchoolPeriodDetail = reduxForm({
  form: 'schoolPeriod',
  validate: schoolPeriodValidation,
  enableReinitialize: true,
})(SchoolPeriodDetail);
const selector = formValueSelector('schoolPeriod');
SchoolPeriodDetail = connect(
  state => ({
    initialValues: {
      codSchoolPeriod: state.schoolPeriodReducer.selectedSchoolPeriod.cod_school_period
        ? state.schoolPeriodReducer.selectedSchoolPeriod.cod_school_period
        : '',
      startDate: moment(
          new Date(state.schoolPeriodReducer.selectedSchoolPeriod.start_date),
        ).format('YYYY-MM-DD'),
      endDate: moment(
          new Date(state.schoolPeriodReducer.selectedSchoolPeriod.end_date),
        ).format('YYYY-MM-DD'),
      subject: state.schoolPeriodReducer.selectedSchoolPeriod.subject
        ? state.schoolPeriodReducer.selectedSchoolPeriod.subject.map(subj=>({ 
          subjectId:subj.subject_id, 
          teacherId:subj.teacher_id,
          limit:subj.limit,
          duty:subj.duty,
          schedule: subj.schedule ? subj.schedule.map(sche =>({
            day:sche.day,
            startHour:sche.start_hour,
            endHour:sche.end_hour,
            classroom:sche.classroom,            
          })) : [{}]
        }))
        : [{schedule:[{}]}],
    },
    action: state.dialogReducer.action,
    startDate: selector(state, 'startDate'),
    subjectsSelected: selector(state, 'subject')
  }),
  { change, show, submit },
)(SchoolPeriodDetail);

export default withStyles(styles)(SchoolPeriodDetail);
