import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import * as moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const styles = () => ({
  calendar: {
    height: '100vh',
    paddingTop: 50,
  },
});

class CalendarStudent extends Component {
  transformData = () => {
    const { currentSubjects } = this.props;
    let arr = [];
    if (Array.isArray(currentSubjects)) {
      currentSubjects.forEach((subject, index) => {
        const aux = (subject.data_subject || subject).schedules.map((schedule, index2) => {
          // eslint-disable-next-line no-underscore-dangle
          let startTime = moment()
            .isoWeekday(parseInt(schedule.day, 10))
            .hours(parseInt(schedule.start_hour.split(':')[0], 10))
            .minutes(parseInt(schedule.start_hour.split(':')[1], 10))._d;
          // eslint-disable-next-line no-underscore-dangle
          let endTime = moment()
            .isoWeekday(parseInt(schedule.day, 10))
            .hours(parseInt(schedule.end_hour.split(':')[0], 10))
            .minutes(schedule.end_hour.split(':')[1], 10)._d;
          if (moment().day() === 0) {
            // eslint-disable-next-line no-underscore-dangle
            startTime = moment(startTime).add(7, 'day')._d;
            // eslint-disable-next-line no-underscore-dangle
            endTime = moment(endTime).add(7, 'day')._d;
          }

          return {
            id: parseInt(`${index}${index2}`, 10),
            title: (subject.data_subject || subject).subject.name,
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
    const { classes } = this.props;

    const allViews = Object.keys(Views).map((k) => Views[k]);
    const minTime = new Date();
    minTime.setHours(7, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(19, 0, 0);

    return (
      <>
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

CalendarStudent.propTypes = {
  classes: PropTypes.shape({
    calendar: PropTypes.string,
  }).isRequired,
  currentSubjects: PropTypes.arrayOf(PropTypes.shape({})),
};
CalendarStudent.defaultProps = {
  currentSubjects: null,
};

export default withStyles(styles)(CalendarStudent);
