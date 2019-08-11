import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import {updateSettingsRC,getSettingsRC} from '../../actions/coupon'
import RedeemCoupon from '../../components/RedeemCoupon';
export class SettingsContainer extends Component {
  componentDidMount() {    
    this.props.getSettingsRC()
  }

  updateSettingsRC = (values) =>{    
    this.props.updateSettingsRC(values).then(res =>  this.props.getSettingsRC());
  }
  render() {
    return <RedeemCoupon onSubmit={this.updateSettingsRC} />;
  }
}

SettingsContainer.propTypes = {
  getSettingsRC: func.isRequired,
  updateSettingsRC: func.isRequired,
};

const mS = state => ({});

const mD = {
  getSettingsRC,
  updateSettingsRC
};

SettingsContainer = connect(
  mS,
  mD,
)(SettingsContainer);

export default SettingsContainer
