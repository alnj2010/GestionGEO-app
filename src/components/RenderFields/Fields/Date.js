import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import * as moment from 'moment';

const renderDateField = ({ label, maxDateMessage, minDateMessage, input, ...custom }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DatePicker
      autoOk
      format="yyyy/MM/dd"
      margin="normal"
      style={{ width: '100%' }}
      label={label}
      {...input}
      {...custom}
      cancelLabel={<div>CANCELAR</div>}
      maxDateMessage={<div>{maxDateMessage}</div>}
      minDateMessage={<div>{minDateMessage}</div>}
      invalidDateMessage={<div>Formato de fecha no válido</div>}
    />
  </MuiPickersUtilsProvider>
);
renderDateField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  maxDateMessage: PropTypes.string.isRequired,
  minDateMessage: PropTypes.string.isRequired,
};

export default function Date({
  field,
  label,
  id,
  minDate,
  disabled,
  maxDateMessage,
  minDateMessage,
}) {
  return (
    <Field
      name={field}
      component={renderDateField}
      format={(value) => moment(value)}
      parse={(value) => moment(value).format('YYYY-MM-DD')}
      // custom props
      label={label}
      id={id}
      minDate={minDate || undefined}
      disabled={disabled}
      maxDateMessage={maxDateMessage}
      minDateMessage={minDateMessage}
    />
  );
}

Date.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  disabled: PropTypes.bool,
  minDate: PropTypes.shape({}),
  maxDateMessage: PropTypes.string,
  minDateMessage: PropTypes.string,
};
Date.defaultProps = {
  disabled: false,
  minDate: null,
  maxDateMessage: 'La fecha no debe ser posterior a la fecha máxima',
  minDateMessage: 'La fecha no debe ser anterior a la fecha mínima',
};
