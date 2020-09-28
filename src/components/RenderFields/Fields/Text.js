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
    {...input}
    {...custom}
  />
);

renderTextField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({ touched: PropTypes.bool, invalid: PropTypes.bool, error: PropTypes.bool })
    .isRequired,
};

export default function Text(props) {
  const { field, disabled, label, id } = props;
  return (
    <Field
      name={field}
      component={renderTextField}
      // custom props
      disabled={disabled}
      label={label}
      id={id}
      multiline
      rowsMax="4"
      margin="normal"
    />
  );
}

Text.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};
