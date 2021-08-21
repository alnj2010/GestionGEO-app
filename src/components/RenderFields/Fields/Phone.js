import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Field } from 'redux-form';
import MaskedInput from 'react-text-mask';

const TextMaskCustom = ({ inputRef, ...other }) => {
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};
TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
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

renderPhoneField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    invalid: PropTypes.bool,
  }).isRequired,
};

export default function Phone({ field, label, id }) {
  return (
    <Field
      name={field}
      component={renderPhoneField}
      // custom props
      label={label}
      id={id}
      multiline
      rowsMax="4"
      margin="dense"
    />
  );
}
Phone.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
Phone.defaultProps = {};
