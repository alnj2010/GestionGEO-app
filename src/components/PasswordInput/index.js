import React, { Component } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { string, object } from 'prop-types';

class PasswordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  render() {
    const {
      input,
      meta: { touched, error },
      className,
      id,
      ariaLabel,
      inputLabel,
    } = this.props;
    const { showPassword } = this.state;
    return (
      <FormControl className={className}>
        <InputLabel htmlFor={id}>{inputLabel}</InputLabel>
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title={showPassword ? 'Hide' : 'Show'} placement="right">
                <IconButton
                  aria-label={ariaLabel}
                  onClick={this.handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          }
          {...input}
        />
        {touched && error && <p style={{ color: 'red' }}>{error}</p>}
      </FormControl>
    );
  }
}
PasswordInput.propTypes = {
  input: object.isRequired,
  className: string,
  id: string.isRequired,
  ariaLabel: string.isRequired,
  inputLabel: string.isRequired,
};
export default PasswordInput;
