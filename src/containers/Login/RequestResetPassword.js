import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RequestResetPassword from '../../components/Login/RequestResetPassword';
import { requestResetPassword } from '../../actions/user';

function RequestResetPasswordContainer({ requestResetPasswordDispatch, history }) {
  const handleForgotPassword = (data) => {
    requestResetPasswordDispatch(data)
      .then(() => history.push('/'))
      .catch(() => history.push('/'));
  };
  return <RequestResetPassword handleForgotPassword={handleForgotPassword} />;
}

RequestResetPasswordContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  requestResetPasswordDispatch: PropTypes.func.isRequired,
};

const mS = () => ({});

const mD = {
  requestResetPasswordDispatch: requestResetPassword,
};

const RequestResetPasswordContainerWrapper = connect(mS, mD)(RequestResetPasswordContainer);

export default RequestResetPasswordContainerWrapper;
