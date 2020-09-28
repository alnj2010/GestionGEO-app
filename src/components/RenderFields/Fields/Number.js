import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Field } from 'redux-form';

const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
  <TextField
    style={{ width: '100%' }}
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    type="number"
    inputProps={{ min: custom.min, max: custom.max, step: '1' }}
    {...input}
    {...custom}
  />
);

renderTextField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
    invalid: PropTypes.bool,
  }).isRequired,
};

export default function Number({ field, disabled, label, id, min, max }) {
  return (
    <Field
      name={field}
      component={renderTextField}
      // custom props
      disabled={disabled}
      label={label}
      id={id}
      min={min}
      max={max}
      margin="normal"
    />
  );
}
Number.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};
