import React from 'react';
import { Field } from 'redux-form';
import { MuiPickersUtilsProvider,TimePicker } from  'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as moment from 'moment';

const renderTimeField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>         
      <TimePicker
        autoOk
        style={{width:'100%'}}
        label={label}
        {...input}
        {...custom}
      />
     </MuiPickersUtilsProvider>
  )

export default function Time(props){ 
    return( 
      <Field
        name={props.field}
        component={renderTimeField}
        format={(value)=>{          
          if(value){
            let time=value.split(':')
            return moment().hours(parseInt(time[0])).minutes(parseInt(time[1]))
          }
        }}
        parse={(value)=>moment(value).format("HH:mm")+':00'}
        //custom props
        label={props.label}          
        id={props.id}
      /> 
            
  )
}