import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, bool } from 'prop-types';
import { login } from '../../actions/user';
import LoginForm from '../../components/Login';
import { show, hide } from '../../actions/snackbar';

class LoginContainer extends Component {
  handleLogin = ({ identification, password, userType }) => {
    const { login, history } = this.props;
    login({ identification, password, userType }).then((isLogged) => {
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
  showSnackbar: bool.isRequired,
  message: string,
};

const mS = (state) => ({
  showSnackbar: state.snackbarReducer.show,
  message: state.snackbarReducer.message,
});

const mD = {
  login,
  show,
  hide,
};

const LoginPage = connect(mS, mD)(LoginContainer);

export default LoginPage;
