import React, { Fragment } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form';
import DatePicker from 'react-datepicker';
import Texture from '@material-ui/icons/Texture';

import 'react-datepicker/dist/react-datepicker.css';

const styles = (theme) => ({});
function CalendarRange(props) {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const handleChangeStart = (date) => {
    setStartDate(date);
  };

  const handleChangeEnd = (date) => {
    setEndDate(date);
  };
  return (
    <>
      <Field
        name={props.name}
        component={
          <DatePicker
            selected={props.startDate}
            selectsStart
            customInput={<TextField />}
            startDate={props.startDate}
            endDate={props.endDate}
            onChange={handleChangeStart}
          />
        }
        type="date"
      />
      <Field
        name={props.name}
        component={
          <DatePicker
            selected={props.endDate}
            selectsEnd
            customInput={<TextField />}
            startDate={props.startDate}
            endDate={props.endDate}
            onChange={handleChangeEnd}
            minDate={props.startDate}
          />
        }
        type="date"
      />
    </>
  );
}

export default withStyles(styles)(CalendarRange);
