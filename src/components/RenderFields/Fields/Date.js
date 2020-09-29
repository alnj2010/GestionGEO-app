import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import * as moment from 'moment';

const renderDateField = ({ label, input, ...custom }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DatePicker
      autoOk
      format="yyyy/MM/dd"
      margin="normal"
      style={{ width: '100%' }}
      label={label}
      {...input}
      {...custom}
    />
  </MuiPickersUtilsProvider>
);
renderDateField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default function Date({ field, label, id, minDate, disabled }) {
  return (
    <Field
      name={field}
      component={renderDateField}
      format={(value) => moment(value)}
      parse={(value) => moment(value).format('YYYY-MM-DD')}
      // custom props
      label={label}
      id={id}
      minDate={minDate}
      disabled={disabled}
    />
  );
}

Date.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  id: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  minDate: PropTypes.string.isRequired,
};
Date.defaultProps = {
  disabled: false,
};
