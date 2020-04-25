import React from 'react';
import { TextField } from '@material-ui/core';
import { Field } from 'redux-form';
import MaskedInput from 'react-text-mask';

const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

const renderPhoneField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => {
  return (
    <TextField
      style={{ width: '100%' }}
      id={input.name}
      error={touched && invalid}
      label={label}
      helperText={touched && error}
      InputProps={{
        inputComponent: TextMaskCustom,
      }}
      InputLabelProps={{ shrink: true }}
      {...input}
      {...custom}
    />
  );
};

export default function Phone(props) {
  return (
    <Field
      name={props.field}
      component={renderPhoneField}
      // custom props
      label={props.label}
      id={props.id}
      multiline
      rowsMax="4"
      margin="dense"
    />
  );
}
