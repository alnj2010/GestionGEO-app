import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { Field } from 'redux-form';

const renderSwitch = ({ input, label, meta: { touched, error }, ...custom }) => (
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

export default function SwitchRender(props) {
  return (
    <Field
      name={props.field}
      component={renderSwitch}
      // custom props
      label={props.label}
      id={props.id}
      disabled={props.disabled === undefined ? false : props.disabled}
    />
  );
}
