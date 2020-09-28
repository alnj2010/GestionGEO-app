import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChangePasswordForm from '../../components/ChangePassword';
import { changePassword } from '../../actions/miPerfil';

class ChangePassword extends Component {
  componentDidMount = () => {};

  componentWillUnmount = () => {};

  savePassword = (payload) => {
    const { changePasswordDispatch } = this.props;

    changePasswordDispatch(payload);
  };

  render() {
    // const {
    // } = this.props;

    return <ChangePasswordForm savePassword={this.savePassword} />;
  }
}

ChangePassword.propTypes = {
  changePasswordDispatch: PropTypes.func.isRequired,
};

const mS = () => ({});

const mD = {
  changePasswordDispatch: changePassword,
};

export default connect(mS, mD)(ChangePassword);
