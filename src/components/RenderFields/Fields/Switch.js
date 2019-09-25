import React from 'react';
import { 
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import { Field } from 'redux-form';
/* case 'switch':{
  return (
    <Switch
      disabled={params.disabled}
      disableRipple
      {...params.input}
      color="primary"
      checked={params.input.value && (params.field.checked===undefined || params.field.checked===true) ? true : false}
      onChange={params.input.onChange}
    />
  )
} */
const renderSwitch = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) =>(
    <FormControlLabel
        control={
          <Switch
            checked={input.value && !input.disabled ? true : false}
            onChange={input.onChange}
            color="primary"
            disabled={custom.disabled}
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
        disabled={props.disabled===undefined ? false : props.disabled}
      />      
  )
}