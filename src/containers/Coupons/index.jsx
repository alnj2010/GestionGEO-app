import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteCoupon } from '../../actions/coupon';
import CouponsList from '../../components/Coupons';

export class CouponsListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
    const { getList, define } = this.props;
    getList().then(() => this.setState({ isLoading: false }));
    define('coupon');
  };
  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  handleDeleteCoupon = id => {
    const { getList, deleteCoupon } = this.props;
    deleteCoupon(id).then(res => getList());
  };

  render() {
    const { coupons, history, show } = this.props;
    const { isLoading } = this.state;
    return (
      <CouponsList
        coupons={coupons}
        isLoading={isLoading}
        history={history}
        handleCouponDetail={this.handleCouponDetail}
        handleDeleteCoupon={this.handleDeleteCoupon}
        show={show}
      />
    );
  }
}

CouponsListContainer.propTypes = {
  coupons: array,
  history: object.isRequired,
  getList: func.isRequired,
  deleteCoupon: func.isRequired,
};

const mS = state => ({
  coupons: state.couponReducer.list,
});

const mD = {
  getList,
  deleteCoupon,
  cleanDialog,
  define,
  show,
};

const CouponsListPage = connect(
  mS,
  mD,
)(CouponsListContainer);

export default CouponsListPage;
