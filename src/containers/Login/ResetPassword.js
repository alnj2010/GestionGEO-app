import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import ResetPassword from '../../components/Login/ResetPassword';
import { resetPassword } from '../../actions/user';

function ResetPasswordContainer({ resetPasswordDispatch, history, location: { search } }) {
  const queryObject = queryString.parse(search);
  useEffect(() => {
    if (!queryObject || !queryObject.token) {
      history.push('/');
    }
  }, []);
  const handleResetPassword = (data) => {
    resetPasswordDispatch({ ...queryObject })
      .then(() => null)
      .catch(() => history.push('/'));
  };
  return <ResetPassword handleResetPassword={handleResetPassword} />;
}

ResetPasswordContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  resetPasswordDispatch: PropTypes.func.isRequired,
};

const mS = () => ({});

const mD = {
  resetPasswordDispatch: resetPassword,
};

const ResetPasswordContainerWrapper = connect(mS, mD)(ResetPasswordContainer);

export default ResetPasswordContainerWrapper;
