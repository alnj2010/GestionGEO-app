import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import * as moment from 'moment';

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
  calendar: {
    height: '100vh',
    paddingTop: 50,
  },
});

class StudentHome extends Component {
  transformData = () => {
    let arr = [];

    if (this.props.currentSubjects) {
      this.props.currentSubjects.forEach((subject, index) => {
        const aux = subject.data_subject.schedules.map((schedule, index2) => {
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
            title: subject.data_subject.subject.subject_name,
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

  render() {
    const { miPerfil, classes } = this.props;
    const allViews = Object.keys(Views).map((k) => Views[k]);
    const minTime = new Date();
    minTime.setHours(7, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(19, 0, 0);

    return (
      <>
        <h1>Bienvenido {`${miPerfil.first_name} ${miPerfil.first_surname}`}</h1>
        <Calendar
          className={classes.calendar}
          events={this.transformData()}
          defaultView={Views.WORK_WEEK}
          views={allViews}
          toolbar={false}
          culture="es"
          localizer={localizer}
          max={maxTime}
          min={minTime}
        />
      </>
    );
  }
}

StudentHome.propTypes = {};

export default withStyles(styles)(StudentHome);
