import React from 'react';
import { TextField,FormControl,InputLabel,Input} from '@material-ui/core';
import { Field } from 'redux-form';
import MaskedInput from 'react-text-mask';

const TextMaskCustom=(props)=> {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

const renderPhoneField =({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  })=>{
    return(
        <FormControl style={{width:'100%'}}>
          <InputLabel htmlFor={input.name}>{label}</InputLabel>
          <Input
            id={input.name}
            error={touched && invalid}
            helperText={touched && error}
            inputComponent={TextMaskCustom}
            {...input}
            {...custom}
          />
        </FormControl>)

}

export default function Phone(props){ 
    return( 
      <Field
        name={props.field}
        component={renderPhoneField}
        //custom props
        label={props.label}          
        id={props.id} 
        multiline
        rowsMax="4"
        margin="normal"
      /> 
            
  )
}