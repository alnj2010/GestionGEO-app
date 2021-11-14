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
    {...input}
    {...custom}
  />
);

renderTextField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    invalid: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default function Text(props) {
  const { field, disabled, label, id, tooltipText } = props;
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
      multiline
      rowsMax="4"
      margin="normal"
    />
  );
}

Text.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  disabled: PropTypes.bool,
};
Text.defaultProps = {
  disabled: false,
  tooltipText: null,
};
