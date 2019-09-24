import React from 'react';
import { TextField} from '@material-ui/core';
import { Field } from 'redux-form';

const renderDateField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      style={{width:'100%'}}
      label={label}
      type="date"
      defaultValue="2017-05-24"
      InputLabelProps={{
        shrink: true,
      }}
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
        component={renderDateField}
        //custom props
        label={props.label}          
        id={props.id}
        type="date"
      /> 
            
  )
}