import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Field } from 'redux-form';

const renderPasswordField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
  <TextField
    style={{ width: '100%' }}
    label={label}
    type="password"
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    id={custom.id}
    {...input}
  />
);

renderPasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    invalid: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default function Password(props) {
  const { field, disabled, label, id } = props;
  return (
    <Field
      name={field}
      component={renderPasswordField}
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

Password.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  disabled: PropTypes.bool,
};
Password.defaultProps = {
  disabled: false,
};
