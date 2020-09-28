import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

class PasswordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
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
                <IconButton aria-label={ariaLabel} onClick={this.handleClickShowPassword}>
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
  input: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }).isRequired,
};
export default PasswordInput;
