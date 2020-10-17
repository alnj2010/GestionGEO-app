import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/user';
import LoginForm from '../../components/Login';
import {
  setSessionStudentId,
  setSessionUser,
  getSessionUser,
  removeSessionGeoToken,
} from '../../storage/sessionStorage';

function LoginContainer({ showSnackbar, message, loginDispatch, history }) {
  const [studentsTypes, setStudentsType] = useState(null);
  const handleLogin = ({ identification, password, userType }) => {
    loginDispatch({ identification, password, userType }).then((isLogged) => {
      if (userType === 'S') {
        setStudentsType(isLogged);
      } else if (isLogged) {
        history.push('/inicio');
      }
    });
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    history.push('/password/forgot');
  };
  const setStudent = (student) => {
    const user = getSessionUser();
    user.student = student;
    setSessionUser(user);
    setSessionStudentId(student.id);
    history.push('/inicio');
  };

  const handleCloseSetStudent = () => {
    setStudentsType(null);
    removeSessionGeoToken();
  };
  return (
    <LoginForm
      showMenssageFloat={showSnackbar}
      handleForgotPassword={handleForgotPassword}
      menssageFloat={message}
      handleLogin={handleLogin}
      studentsTypes={studentsTypes}
      handleSetStudent={setStudent}
      handleCloseSetStudent={handleCloseSetStudent}
    />
  );
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
