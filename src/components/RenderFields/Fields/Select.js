import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, FormHelperText, MenuItem } from '@material-ui/core';
import { Field } from 'redux-form';

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return null;
  }
  return <FormHelperText>{touched && error}</FormHelperText>;
};

renderFromHelper.propTypes = {
  touched: PropTypes.bool.isRequired,
  error: PropTypes.shape({}).isRequired,
};

const renderSelectField = ({ input, label, meta: { touched, error }, options, ...custom }) => (
  <FormControl error={touched && !!error} style={{ width: '100%' }}>
    <InputLabel htmlFor={input}>{label}</InputLabel>
    <Select
      {...input}
      {...custom}
      inputProps={{
        name: input.name,
        id: input.name,
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.key}
        </MenuItem>
      ))}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);
renderSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }).isRequired,
};

export default function SelectField({ field, onchange, disabled, label, id, options }) {
  return (
    <Field
      name={field}
      component={renderSelectField}
      // custom props
      onChange={onchange ? (_, newValue) => onchange(newValue) : null}
      disabled={disabled}
      label={label}
      id={id}
      options={options}
    />
  );
}

SelectField.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  options: PropTypes.shape({}).isRequired,
};
