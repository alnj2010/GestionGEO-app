import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChangePasswordForm from '../../components/ChangePassword';
import { changePassword } from '../../actions/miPerfil';

class ChangePassword extends Component {
  componentDidMount = () => {};

  componentWillUnmount = () => {};

  savePassword = (payload) => {
    const { changePasswordDispatch, history } = this.props;

    changePasswordDispatch(payload)
      .then(() => history.goBack())
      .catch((err) => console.warn(err));
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    // const {
    // } = this.props;

    return <ChangePasswordForm savePassword={this.savePassword} goBack={this.goBack} />;
  }
}

ChangePassword.propTypes = {
  changePasswordDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func }).isRequired,
};

const mS = () => ({});

const mD = {
  changePasswordDispatch: changePassword,
};

export default connect(mS, mD)(ChangePassword);
