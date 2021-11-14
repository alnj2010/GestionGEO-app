import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Switch, Tooltip } from '@material-ui/core';
import Help from '@material-ui/icons/Help';
import { Field } from 'redux-form';

const renderSwitch = ({ input, label, tooltipText, ...custom }) => (
  <>
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
      label={
        <div>
          {label}{' '}
          {tooltipText ? (
            <Tooltip title={tooltipText} aria-label="Add" placement="right">
              <Help />
            </Tooltip>
          ) : null}
        </div>
      }
    />
  </>
);

renderSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.any,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
  }).isRequired,
};

export default function SwitchRender({ field, label, id, disabled, tooltipText }) {
  return (
    <Field
      name={field}
      component={renderSwitch}
      // custom props
      tooltipText={tooltipText}
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
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  disabled: PropTypes.bool,
  tooltipText: PropTypes.string,
};
SwitchRender.defaultProps = {
  disabled: false,
  tooltipText: null,
};
