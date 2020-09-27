import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import * as moment from 'moment';
import { Form, reduxForm, submit } from 'redux-form';
import PropTypes from 'prop-types';
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
      const { showDispatch } = this.props;
      showDispatch(action);
    });
  };

  transformData = () => {
    const { subjects } = this.props;
    let arr = [];

    if (subjects) {
      subjects.forEach((subject, index) => {
        const aux = subject.schedules.map((schedule, index2) => {
          // eslint-disable-next-line no-underscore-dangle
          let startTime = moment()
            .isoWeekday(weekdays[schedule.day])
            .hours(parseInt(schedule.start_hour.split(':')[0], 10))
            .minutes(parseInt(schedule.start_hour.split(':')[1], 10))._d;

          // eslint-disable-next-line no-underscore-dangle
          let endTime = moment()
            .isoWeekday(weekdays[schedule.day])
            .hours(parseInt(schedule.end_hour.split(':')[0], 10))
            .minutes(schedule.end_hour.split(':')[1])._d;
          if (moment().day() === 0) {
            // eslint-disable-next-line no-underscore-dangle
            startTime = moment(startTime).add(7, 'day')._d;
            // eslint-disable-next-line no-underscore-dangle
            endTime = moment(endTime).add(7, 'day')._d;
          }
          return {
            id: parseInt(`${index}${index2}`, 10),
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
      submitDispatch,
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
                          ? this.handleDialogShow('actualizar', submitDispatch)
                          : submitDispatch('schoolPeriod')
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
  subjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  schoolPeriodId: PropTypes.number.isRequired,
  endDate: PropTypes.string.isRequired,
  classes: PropTypes.PropTypes.shape({
    buttonContainer: PropTypes.string,
    save: PropTypes.string,
    calendar: PropTypes.string,
    form: PropTypes.string,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  saveSchoolPeriod: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,

  submitDispatch: PropTypes.func.isRequired,
  showDispatch: PropTypes.func.isRequired,
};

let SchoolPeriodActualWrapper = reduxForm({
  form: 'schoolPeriodActual',
  enableReinitialize: true,
})(SchoolPeriodActual);

SchoolPeriodActualWrapper = connect(
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
  { showDispatch: show, submitDispatch: submit }
)(SchoolPeriodActualWrapper);

export default withStyles(styles)(SchoolPeriodActualWrapper);
