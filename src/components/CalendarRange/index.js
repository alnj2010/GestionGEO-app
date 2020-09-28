import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const styles = () => ({});
function CalendarRange({ name, startDate, endDate }) {
  const handleChangeStart = (date) => {
    return date;
  };

  const handleChangeEnd = (date) => {
    return date;
  };
  return (
    <>
      <Field
        name={name}
        component={
          <DatePicker
            selected={startDate}
            selectsStart
            customInput={<TextField />}
            startDate={startDate}
            endDate={endDate}
            onChange={handleChangeStart}
          />
        }
        type="date"
      />
      <Field
        name={name}
        component={
          <DatePicker
            selected={endDate}
            selectsEnd
            customInput={<TextField />}
            startDate={startDate}
            endDate={endDate}
            onChange={handleChangeEnd}
            minDate={startDate}
          />
        }
        type="date"
      />
    </>
  );
}
CalendarRange.propTypes = {
  name: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default withStyles(styles)(CalendarRange);
