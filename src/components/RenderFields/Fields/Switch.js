import React from 'react';
import { 
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import { Field } from 'redux-form';

const renderSwitch = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
    <FormControlLabel
        control={
            <Switch
            disableRipple            
            color="primary"
            {...input}
            {...custom}
          />
        }
        label={label}
      />
)

export default function SwitchRender(props){ 
    return( 
      <Field
        name={props.field}
        component={renderSwitch}
        //custom props
        label={props.label}
        id={props.id}
        //disabled={props.disabled}
        //checked={props.checked}
      />      
  )
}