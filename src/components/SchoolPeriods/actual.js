import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import * as moment from 'moment';
import { Form, reduxForm, change, submit } from 'redux-form';
import { object, func, bool } from 'prop-types';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const weekdays = {
  Lunes: 1,
  Martes: 2,
  Miercoles: 3,
  Jueves: 4,
  Viernes: 5,
};
const styles = () => ({
  pdf: {
    backgroundColor: 'red',
  },
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
  calendar: {
    height: '100vh',
    paddingTop: 50,
  },
});

class SchoolPeriodActual extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  handleDialogShow = (action, func) => {
    this.setState({ func }, () => {
      this.props.show(action);
    });
  };

  transformData = () => {
    let arr = [];

    if (this.props.subjects) {
      this.props.subjects.forEach((subject, index) => {
        const aux = subject.schedules.map((schedule, index2) => {
          let startTime = moment()
            .isoWeekday(weekdays[schedule.day])
            .hours(parseInt(schedule.start_hour.split(':')[0]))
            .minutes(parseInt(schedule.start_hour.split(':')[1]))._d;
          let endTime = moment()
            .isoWeekday(weekdays[schedule.day])
            .hours(parseInt(schedule.end_hour.split(':')[0]))
            .minutes(schedule.end_hour.split(':')[1])._d;
          if (moment().day() === 0) {
            startTime = moment(startTime).add(7, 'day')._d;
            endTime = moment(endTime).add(7, 'day')._d;
          }
          return {
            id: parseInt(`${index}${index2}`),
            title: subject.subject.name,
            start: startTime,
            end: endTime,
          };
        });
        arr = arr.concat(aux);
      });
      return arr;
    }
    return [{}];
  };

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
      endDate,
    } = this.props;
    const allViews = Object.keys(Views).map((k) => Views[k]);
    const { func } = this.state;
    const final = moment(endDate);
    const today = moment();
    const finishedPeriod = today > final;
    const minTime = new Date();
    minTime.setHours(7, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(19, 0, 0);

    return (
      <Form onSubmit={handleSubmit(saveSchoolPeriod)}>
        <Grid container>
          <Grid item xs={12}>
            <h3> Periodo semestral actual</h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container>
              <RenderFields>
                {[
                  {
                    label: 'Fecha Inicio',
                    field: 'startDate',
                    id: 'startDate',
                    type: 'date',
                    disabled: true,
                  },
                  {
                    label: 'Fecha Fin',
                    field: 'endDate',
                    id: 'endDate',
                    type: 'date',
                    minDate: moment(),
                  },
                  {
                    label: 'Habilitar inscripcion',
                    field: 'incriptionVisible',
                    id: 'incriptionVisible',
                    type: 'switch',
                    disabled: finishedPeriod,
                    checked: !finishedPeriod,
                  },
                  {
                    label: 'Habilitar cargar notas',
                    field: 'loadNotes',
                    id: 'loadNotes',
                    type: 'switch',
                  },
                ]}
              </RenderFields>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer}>
                  <Grid item xs={4} />
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
        <Calendar
          className={classes.calendar}
          events={this.transformData()}
          defaultView={Views.WORK_WEEK}
          views={allViews}
          toolbar={false}
          culture="es"
          max={maxTime}
          min={minTime}
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

SchoolPeriodActual = reduxForm({
  form: 'schoolPeriodActual',
  enableReinitialize: true,
})(SchoolPeriodActual);

SchoolPeriodActual = connect(
  (state) => ({
    initialValues: {
      startDate: state.schoolPeriodReducer.selectedSchoolPeriod.start_date
        ? state.schoolPeriodReducer.selectedSchoolPeriod.start_date
        : moment().format('YYYY-MM-DD'),
      endDate: state.schoolPeriodReducer.selectedSchoolPeriod.end_date
        ? state.schoolPeriodReducer.selectedSchoolPeriod.end_date
        : moment().format('YYYY-MM-DD'),
      incriptionVisible: state.schoolPeriodReducer.selectedSchoolPeriod.inscription_visible,
      loadNotes: state.schoolPeriodReducer.selectedSchoolPeriod.load_notes,
    },
    action: state.dialogReducer.action,
  }),
  { change, show, submit }
)(SchoolPeriodActual);

export default withStyles(styles)(SchoolPeriodActual);
