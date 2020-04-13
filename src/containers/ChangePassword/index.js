import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChangePasswordForm from '../../components/ChangePassword';
import {
  changePassword,
} from '../../actions/miPerfil';

export class ChangePassword extends Component {
  componentDidMount = () => {
  };
  componentWillUnmount = () => {
  };

  savePassword=(payload)=>{
    const {
     changePassword
    } = this.props;

    changePassword(payload)
  }

  render() {
    //const {
    //} = this.props;

    return (
        <ChangePasswordForm
            savePassword={this.savePassword}
        />
    );
  }
}

ChangePassword.propTypes = {

};

const mS = state => ({
});

const mD = {
  changePassword,
};

ChangePassword = connect(
  mS,
  mD,
)(ChangePassword);

export default ChangePassword;
