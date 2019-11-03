import React from 'react';
import { TextField} from '@material-ui/core';
import { Field } from 'redux-form';

const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      style={{width:'100%'}}
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )

export default function Text(props){ 
    return( 
      <Field
        name={props.field}
        component={renderTextField}
        //custom props
        disabled = {props.disabled}
        label={props.label}          
        id={props.id} 
        multiline
        rowsMax="4"
        margin="normal"
      /> 
            
  )
}