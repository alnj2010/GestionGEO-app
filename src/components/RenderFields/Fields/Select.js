import React from 'react';
import { FormControl, InputLabel, Select, FormHelperText, MenuItem } from '@material-ui/core';
import { Field } from 'redux-form';

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
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

export default function SelectField(props) {
  return (
    <Field
      name={props.field}
      component={renderSelectField}
      // custom props
      onChange={
        props.onchange ? (event, newValue, previousValue, name) => props.onchange(newValue) : null
      }
      disabled={props.disabled}
      label={props.label}
      id={props.id}
      options={props.options}
    />
  );
}
