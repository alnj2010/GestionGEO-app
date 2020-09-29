import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { MuiPickersUtilsProvider, TimePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as moment from 'moment';

const renderTimeField = ({ label, input, ...custom }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <TimePicker
      autoOk
      minutesStep={15}
      style={{ width: '100%' }}
      label={label}
      {...input}
      {...custom}
    />
  </MuiPickersUtilsProvider>
);

renderTimeField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
};

export default function Time(props) {
  const { field, label, id } = props;
  return (
    <Field
      name={field}
      component={renderTimeField}
      format={(value) => {
        if (value) {
          const time = value.split(':');
          return moment().hours(parseInt(time[0], 10)).minutes(parseInt(time[1], 10));
        }
        return null;
      }}
      parse={(value) => `${moment(value).format('HH:mm')}:00`}
      // custom props
      label={label}
      id={id}
    />
  );
}

Time.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  id: PropTypes.any.isRequired,
};
Time.defaultProps = {};
