import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/user';
import LoginForm from '../../components/Login';

class LoginContainer extends Component {
  handleLogin = ({ identification, password, userType }) => {
    const { loginDispatch, history } = this.props;
    loginDispatch({ identification, password, userType }).then((isLogged) => {
      if (isLogged) history.push('/home');
    });
  };

  render() {
    const { showSnackbar, message } = this.props;
    return (
      <LoginForm
        showMenssageFloat={showSnackbar}
        menssageFloat={message}
        handleLogin={this.handleLogin}
      />
    );
  }
}

LoginContainer.propTypes = {
  showSnackbar: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  loginDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  showSnackbar: state.snackbarReducer.show,
  message: state.snackbarReducer.message,
});

const mD = {
  loginDispatch: login,
};

const LoginPage = connect(mS, mD)(LoginContainer);

export default LoginPage;
