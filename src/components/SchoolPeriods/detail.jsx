import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import * as moment from 'moment';
import { Form, reduxForm, change, submit, FieldArray, formValueSelector,Field } from 'redux-form';
import { object, func, bool, number } from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = theme => ({
  fab: {
    marginTop:50,
    margin: theme.spacing.unit,
  },
  form: {
    paddingLeft: '5%',
  },
  buttonContainer: { paddingTop: '2%' },
  buttonSchedule:{
    marginTop: theme.spacing.unit,
    padding: 2,
    width: '22%',
  },
  button: {
    width:'100%'
  },
  buttonDelete: {
    marginTop:0,
    padding:10
  },
  save: {
    color: 'white',
    backgroundColor: '#61A956',
    '&:hover': {
      backgroundColor: 'rgb(78, 127, 71)',
    },
  },
  subtitle:{
    paddingTop:50
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
    return subjects.filter( item => !subjectsSelected.some((selected,index)=>selected.subjectId===item.id && pos>index) )
  }

  renderSchedule = ({ fields, meta: { error, submitFailed } }) => (<Grid container justify="center">    
  {fields.map((schedule, index) => (
    <Fragment key={index}>
      <Grid container item xs={10}>
        <Field component="input" name="schoolPeriodSubjectTeacherId" type="hidden" style={{ height: 0 }} />
        <RenderFields lineal={true} >{[
          { label: 'Dia',field: `${schedule}.day`, id: `${schedule}.day`, type: 'select', options: ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'].map(day => { return { key: day, value: day } }) },
          { label: 'Hora inicio',field: `${schedule}.startHour`, id: `${schedule}.startHour`, type: 'time' },
          { label: 'Hora fin',field: `${schedule}.endHour`, id: `${schedule}.endHour`, type: 'time' },
          { label: 'Aula',field: `${schedule}.classroom`, id: `${schedule}.classroom`, type: 'text' },
        ]}</RenderFields>      
      </Grid>
      <Grid item xs={2}>
        <IconButton className={this.props.classes.buttonDelete} aria-label="remover" color="secondary" onClick={() => fields.remove(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Fragment>      
    ))}
    <Grid item xs={12}>
        <Button variant="contained" color="primary" className={this.props.classes.buttonSchedule} onClick={() => fields.push({endHour:'00:00:00',startHour:'00:00:00'})} >horario +</Button>
    </Grid>
  </Grid>)

  renderSubjects = ({ fields, meta: { error, submitFailed } }) => (<Fragment>    
    {fields.map((subject, index) => (
    <Grid container justify="center" key={index}>
      <Grid container item xs={10}>
        <RenderFields lineal={[3,3,2,2,2]} >{[
          {field: `${subject}.subjectId`, id: `${subject}.subjectId`, type: 'select', label:'Materia', options: this.unselectedSubjects(index).map(subject => { return { key: subject.subject_name, value: subject.id } }) },
          {field: `${subject}.teacherId`, id: `${subject}.teacherId`, type: 'select', label:'Profesor impartidor', options: this.props.teachers.map(teacher => { return { key: `${teacher.first_name} ${teacher.second_name?teacher.second_name:''} ${teacher.first_surname} ${teacher.second_surname?teacher.second_surname:''}`, value: teacher.teacher.id } }) },
          {label:'Modalidad', field: `${subject}.modality`, id: `${subject}.modality`, type: 'select', options: [{key:'REGULAR',value:"REG"}, {key:'INTENSIVO',value:"INT"}].map(type => { return { key: type.key, value: type.value } }) },

          {label: 'Maximo de alumnos', field: `${subject}.limit`, id: `${subject}.limit`, type: 'number', min:0 },
          {label: 'Aranceles (Bs)', field: `${subject}.duty`, id: `${subject}.duty`, type: 'number', min:0 },
        ]}</RenderFields>      
      </Grid>
      <Grid item xs={2}>
        <IconButton className={this.props.classes.button} aria-label="remover" color="secondary" onClick={() => fields.remove(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>   
      <Grid item xs={10}>
        <FieldArray name={`${subject}.schedules`} component={this.renderSchedule} />
      </Grid>
    </Grid>      
    ))}
    <Grid container item xs={12} justify={'center'}>
      <Grid item xs={1}>
        <Fab color="primary" aria-label="Add" className={this.props.classes.fab} disabled={this.props.subjects && this.props.subjectsSelected && (this.props.subjects.length===this.props.subjectsSelected.length)} onClick={() => fields.push({schedule:[{endHour:'00:00:00',startHour:'00:00:00'}]})}>
          <AddIcon />
        </Fab>
      </Grid>      
    </Grid>
  </Fragment>)

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
            <Grid container >
              <Grid container justify="center" item xs={12}>
                <RenderFields >{[
                  { label: 'Codigo', field: 'codSchoolPeriod', id: 'codSchoolPeriod', type: 'text' },
                ]}</RenderFields>
              </Grid>
              <Grid container justify="space-between" item xs={12}>
                <RenderFields >{[
                  { label: 'Fecha Inicio', field: 'startDate', id: 'startDate', type: 'date' }, 
                  { label: 'Fecha Fin', field: 'endDate', id: 'endDate', type: 'date', minDate:(moment(startDate).add(1, 'days')), },
                ]}</RenderFields>
              </Grid>
              
              <Grid item xs={12} className={classes.subtitle}>
                <Typography variant="h6" gutterBottom>Materias del periodo</Typography>
              </Grid>
              <Grid container item xs={12}>
                <FieldArray name="subjects" component={this.renderSubjects} />
              </Grid>                
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer} justify="space-between" spacing={16}>
                 
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      className={`${classes.save} ${classes.button}`}
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

                  <Grid item xs={12} sm={3}>
                    <Button variant="contained" onClick={goBack} className={classes.button}>
                      Cancelar
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    {schoolPeriodId ? (
                      <Button
                        className={classes.button}
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
 if(!values.startDate) 
    errors.startDate = '*Fecha inicial es requerida';

  if(!values.endDate) 
    errors.endDate = '*Fecha fin es requerida';
  else if((moment(values.endDate) <= moment(values.startDate)))
    errors.endDate = '*Fecha fin no debe estar por debajo de la inicial';
  if (values.subjects && values.subjects.length){
    const subjectArrayErrors = []
    values.subjects.forEach((subj, subjIndex) => {
      const subjErrors = {}
      if (!subj || !subj.subjectId) {
        subjErrors.subjectId = '*Materia es requerido'
        subjectArrayErrors[subjIndex] = subjErrors
      }
      if (!subj || !subj.teacherId) {
        subjErrors.teacherId = '*Profesor es requerido'
        subjectArrayErrors[subjIndex] = subjErrors
      }

      if (!subj || !subj.modality) {
        subjErrors.modality = '*Modalidad es requerido'
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
  
      if (subj.schedules && subj.schedules.length){
        subjErrors.schedules = []
        subj.schedules.forEach((sche,scheIndex)=>{

          const scheErrors = {}
          if (!sche || !sche.day) {
            scheErrors.day = '*Dia es requerido'
            subjErrors.schedules[scheIndex] = scheErrors
          }
          if (!sche || !sche.classroom) {
            scheErrors.classroom = '*Aula es requerido'
            subjErrors.schedules[scheIndex] = scheErrors
          }
          if (!sche || !sche.startHour) {
            scheErrors.startHour = '*Hora inicio es requerida'
            subjErrors.schedules[scheIndex] = scheErrors
          }

          if (!sche || !sche.endHour) {
            scheErrors.endHour = '*Hora fin es requerida'
            subjErrors.schedules[scheIndex] = scheErrors
          } else if((moment(sche.endHour,'hh:mm:ss').isBefore(moment(sche.startHour,'hh:mm:ss'))))
          {
            scheErrors.endHour = '*Hora fin no debe estar por debajo de la inicial';
            subjErrors.schedules[scheIndex] = scheErrors  

          }
        })
        subjectArrayErrors[subjIndex] = subjErrors
      }
  
    })
    
    if (subjectArrayErrors.length) {
      errors.subjects = subjectArrayErrors
    }
  }
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
      startDate:state.schoolPeriodReducer.selectedSchoolPeriod.start_date 
        ? state.schoolPeriodReducer.selectedSchoolPeriod.start_date 
        : moment().format('YYYY-MM-DD'),
      endDate:state.schoolPeriodReducer.selectedSchoolPeriod.end_date 
        ? state.schoolPeriodReducer.selectedSchoolPeriod.end_date 
        : moment().add(1, 'days').format('YYYY-MM-DD'),
      subjects: state.schoolPeriodReducer.selectedSchoolPeriod.subjects
        ? state.schoolPeriodReducer.selectedSchoolPeriod.subjects.map(subj=>({ 
          subjectId:subj.subject_id, 
          teacherId:subj.teacher_id,
          modality:subj.modality,
          limit:subj.limit,
          duty:subj.duty,
          schedules: subj.schedules ? subj.schedules.map(sche =>({
            schoolPeriodSubjectTeacherId:sche.school_period_subject_teacher_id,
            day:sche.day,
            startHour:sche.start_hour,
            endHour:sche.end_hour,
            classroom:sche.classroom,            
          })) : [{}]
        }))
        : [{schedules:[{endHour:'00:00:00',startHour:'00:00:00'}]}],
    },
    action: state.dialogReducer.action,
    startDate: selector(state, 'startDate'),
    subjectsSelected: selector(state, 'subjects')
  }),
  { change, show, submit },
)(SchoolPeriodDetail);

export default withStyles(styles)(SchoolPeriodDetail);
