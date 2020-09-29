import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Switch } from '@material-ui/core';
import { Field } from 'redux-form';

const renderSwitch = ({ input, label, ...custom }) => (
  <FormControlLabel
    style={{ marginTop: '22px' }}
    control={
      <Switch
        checked={!!(input.value && !input.disabled)}
        onChange={input.onChange}
        color="primary"
        disabled={custom.disabled}
      />
    }
    label={label}
  />
);

renderSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.any,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
  }).isRequired,
};

export default function SwitchRender({ field, label, id, disabled }) {
  return (
    <Field
      name={field}
      component={renderSwitch}
      // custom props
      label={label}
      id={id}
      disabled={disabled === undefined ? false : disabled}
    />
  );
}

SwitchRender.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  id: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
};
SwitchRender.defaultProps = {
  disabled: false,
};
