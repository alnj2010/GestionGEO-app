import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Tooltip } from '@material-ui/core';
import Help from '@material-ui/icons/Help';
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
    error: PropTypes.string,
    invalid: PropTypes.bool,
  }).isRequired,
};

export default function Number({ field, disabled, label, id, min, max, tooltipText }) {
  return (
    <Field
      name={field}
      component={renderTextField}
      // custom props
      InputProps={
        tooltipText && {
          endAdornment: (
            <Tooltip title={tooltipText} aria-label="Add" placement="right">
              <Help />
            </Tooltip>
          ),
        }
      }
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
  // eslint-disable-next-line react/forbid-prop-types
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // eslint-disable-next-line react/forbid-prop-types
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tooltipText: PropTypes.string,
};
Number.defaultProps = {
  disabled: false,
  min: 0,
  max: Number.POSITIVE_INFINITY,
  tooltipText: null,
};
