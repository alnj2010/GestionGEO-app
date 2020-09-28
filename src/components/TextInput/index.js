import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function TextInput(props) {
  const {
    input,
    className,
    id,
    label,
    placeholder,
    margin,
    type,
    meta: { touched, error },
  } = props;
  return (
    <>
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
    </>
  );
}

TextInput.propTypes = {
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({ touched: PropTypes.bool, error: PropTypes.string }).isRequired,
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default TextInput;
