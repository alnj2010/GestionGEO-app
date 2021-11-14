import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, Tooltip, IconButton } from '@material-ui/core';
import { Field } from 'redux-form';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const RenderPasswordField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      style={{ width: '100%' }}
      label={label}
      type={showPassword ? 'text' : 'password'}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={showPassword ? 'Ocultar' : 'Mostrar'} placement="right">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
      id={custom.id}
      {...input}
    />
  );
};

RenderPasswordField.propTypes = {
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
      component={RenderPasswordField}
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
