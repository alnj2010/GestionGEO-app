import React from 'react';
import { Field } from 'redux-form';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import * as moment from 'moment';

const renderDateField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (          
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        format="yyyy/MM/dd"
        margin="normal"
        style={{width:'100%'}}
        label={label}
        {...input}
        {...custom}
      />
    </MuiPickersUtilsProvider>
  )

export default function Date(props){ 
    return( 
      <Field
        name={props.field}
        component={renderDateField}
        format={(value)=>moment(value)}
        parse={(value)=>moment(value).format('YYYY-MM-DD')}
        //custom props
        label={props.label}          
        id={props.id}
      /> 
            
  )
}