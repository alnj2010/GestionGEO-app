import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
} from '@material-ui/core';
import * as moment from 'moment';
import { Form, reduxForm, change, submit, FieldArray, formValueSelector,Field } from 'redux-form';
import { object, func, bool} from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields'
import { Preview, print } from 'react-html2pdf';
import {
  Calendar,
  momentLocalizer,
  Views,
} from 'react-big-calendar'
import backImage from '../../images/pif.jpg'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)
const weekdays={
  Lunes:1,
  Martes:2,
  Miercoles:3,
  Jueves:4,
  Viernes:5,
}
const styles = theme => ({
  pdf:{
    backgroundColor:'red',
  },
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
  button: {
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
  calendar:{
    height:"100vh"
  }
});

class SchoolPeriodActual extends Component {
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

  transformData = ()=>{
    let arr=[];
    
    if(this.props.subjects){
        this.props.subjects.forEach((subject,index) => {
        let aux=subject.schedules.map((schedule,index2) =>{
          var startTime=schedule.start_hour.split(':');
          var endTime=schedule.end_hour.split(':');          
          return {
            id: parseInt(`${index}${index2}`),
            title:subject.subject.subject_name,
            start: moment().isoWeekday(weekdays[schedule.day]).hours(parseInt(startTime[0])).minutes(parseInt(startTime[1]))._d,
            end: moment().isoWeekday(weekdays[schedule.day]).hours(parseInt(endTime[0])).minutes(endTime[1])._d,
          }
        })
        arr=arr.concat(aux)
    });
    return arr;
    }else{
      return [{}]
    }    
  }

  render = () => {
    const {
      classes,
      handleSubmit,
      saveSchoolPeriod,
      schoolPeriodId,
      pristine,
      submitting,
      valid,
      submit,
      startDate,
      endDate,
      subjects
    } = this.props;
    let allViews = Object.keys(Views).map(k => Views[k])
    const { func } = this.state;
    const final=new Date(endDate);
    const today=new Date();
    let finishedPeriod=today>final;
    console.log(subjects)
    return (
    <Form onSubmit={handleSubmit(saveSchoolPeriod)}>
        <Grid container>
          <Grid item xs={12}>
            <h3> Periodo semestral actual</h3>
            <hr />
          </Grid>
          <Grid item xs={6} className={classes.form}>
            <Grid container>
                <Grid item xs={6}>Fecha inicial</Grid>
                <Grid item xs={6}>{startDate}</Grid>
                <RenderFields >{[
                    { label: 'Fecha Fin', field: 'endDate', id: 'endDate', type: 'date', minDate:(new Date()), disabled:startDate==='Invalid date' },
                    { label: 'Habilitar inscripcion', field: 'incriptionVisible', id: 'incriptionVisible', type: 'switch',disabled:finishedPeriod, checked:!finishedPeriod },
                    { label: 'Habilitar cargar notas', field: 'loadNotes', id: 'loadNotes', type: 'switch' },
                ]}</RenderFields>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer}>
                  <Grid item xs={4}/>     
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
                    <Preview id={'jsx-template'} >
                        <div className={classes.pdf}>
                        <div><img src="https:\\homepages.cae.wisc.edu\~ece533\images\airplane.png" alt=""/></div>
                        <div>2</div>
                        <div>3</div>
                        </div>
                    </Preview>
                    <button onClick={()=>print('a', 'jsx-template')}> print</button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Calendar
          className={classes.calendar}
          events={this.transformData()}
          defaultView={Views.WORK_WEEK}
          views={allViews}
          toolbar={false}
          culture="es"
          
          localizer={localizer}
        />
        <Dialog handleAgree={func} />
      </Form>
    );
  };
}

SchoolPeriodActual.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  saveSchoolPeriod: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
};

const schoolPeriodValidation = values => {
  const errors = {};

  return errors;
};

SchoolPeriodActual = reduxForm({
  form: 'schoolPeriodActual',
  validate: schoolPeriodValidation,
  enableReinitialize: true,
})(SchoolPeriodActual);
const selector = formValueSelector('schoolPeriodActual');
SchoolPeriodActual = connect(
  state => ({
    initialValues: {
        endDate: state.schoolPeriodReducer.selectedSchoolPeriod ? moment(
            new Date(state.schoolPeriodReducer.selectedSchoolPeriod.end_date),
          ).format('YYYY-MM-DD') : 'Invalid date',
        incriptionVisible:state.schoolPeriodReducer.selectedSchoolPeriod.inscription_visible,
        loadNotes:state.schoolPeriodReducer.selectedSchoolPeriod.load_notes,
    },
    action: state.dialogReducer.action,

  }),
  { change, show, submit },
)(SchoolPeriodActual);

export default withStyles(styles)(SchoolPeriodActual);
