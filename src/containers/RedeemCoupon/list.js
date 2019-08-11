import React, { Component } from 'react';
import RedeemCouponList from '../../components/RedeemCoupon/list';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { getListRC } from '../../actions/coupon';

export class RedeemCouponListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
    const { getListRC } = this.props;
    getListRC().then(() => this.setState({ isLoading: false }));
  };


  render() {
    const { coupons, history } = this.props;
    const { isLoading } = this.state;
    return (
      <RedeemCouponList
        coupons={coupons}
        isLoading={isLoading}
        history={history}
      />
    );
  }
}

RedeemCouponListContainer.propTypes = {
  coupons: array,
  history: object.isRequired,
  getListRC: func.isRequired,
};

const mS = state => ({
  coupons: state.couponReducer.listRC,
});

const mD = {
  getListRC,
};

RedeemCouponListContainer = connect(
  mS,
  mD,
)(RedeemCouponListContainer);

export default RedeemCouponListContainer;