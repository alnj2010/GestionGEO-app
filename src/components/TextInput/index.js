import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { string } from 'prop-types';

class TextInput extends Component {
  render() {
    const {
      input,
      className,
      id,
      label,
      placeholder,
      margin,
      type,
      meta: { touched, error },
    } = this.props;
    return (
      <React.Fragment>
        <TextField
          id={id}
          label={label}
          placeholder={placeholder}
          margin={margin}
          type={type}
          className={className}
          {...input}
        />
        {touched && error && <p style={{ color: 'red' }}>{error}</p>}
      </React.Fragment>
    );
  }
}
TextInput.propTypes = {
  className: string,
  id: string.isRequired,
  label: string,
  placeholder: string,
  margin: string,
  type: string.isRequired,
};
export default TextInput;
