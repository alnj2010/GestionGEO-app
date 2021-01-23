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
  setSessionTeacherId,
  setSessionIsMainUser,
  setSessionUserRol,
} from '../../storage/sessionStorage';

function LoginContainer({ showSnackbar, message, loginDispatch, history }) {
  const [studentsTypes, setStudentsType] = useState(null);
  const [userType, setUserType] = useState(null);
  const handleLogin = ({ identification, password }) => {
    loginDispatch({ identification, password })
      .then((user) => {
        if (typeof user !== 'string') {
          if (Array.isArray(user)) {
            setStudentsType(user);
          } else {
            setUserType(user);
          }
        } else {
          history.push('/inicio');
        }
      })
      .catch((err) => console.warn(err));
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

  const setUser = (userTypeSelected) => {
    const user = getSessionUser();
    setSessionUserRol(userTypeSelected.user_type);
    if (userTypeSelected.user_type === 'T') setSessionTeacherId(user.teacher.id);

    if (userTypeSelected.user_type === 'A') setSessionIsMainUser(!!user.administrator.principal);

    if (userTypeSelected.user_type === 'S' && user.student.length === 1) {
      const [student] = user.student;
      user.student = student;
      setSessionUser(user);
      setSessionStudentId(student.id);
    } else {
      setUserType(null);
      setStudentsType(user.student);
    }
    history.push('/inicio');
  };
  const handleCloseSetUser = () => {
    setStudentsType(null);
    setUserType(null);
    removeSessionGeoToken();
  };
  return (
    <LoginForm
      showMenssageFloat={showSnackbar}
      handleForgotPassword={handleForgotPassword}
      menssageFloat={message}
      handleLogin={handleLogin}
      studentsTypes={studentsTypes}
      userType={userType}
      handleSetStudent={setStudent}
      handleSetUserType={setUser}
      handleCloseSetUser={handleCloseSetUser}
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
