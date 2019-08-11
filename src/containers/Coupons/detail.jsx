import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import CouponDetail from '../../components/Coupons/detail';
import {
  saveCoupon,
  findCouponById,
  cleanSelectedCoupon,
  deleteCoupon,
  updateAdminNotes,
  updateCoupon,
} from '../../actions/coupon';
import { getFullList as getBrandList } from '../../actions/brand';
import { getList as getCategoryList } from '../../actions/category';
import { getList as getChallengeTypeList } from '../../actions/challengeType';
import { define, cleanDialog } from '../../actions/dialog';

export class CouponDetailContainer extends Component {

  componentDidMount = () => {
    const {
      match,
      findCouponById,
      define,
      getBrandList,
      getChallengeTypeList,
      getCategoryList,
    } = this.props;
    getBrandList();
    getCategoryList();
    getChallengeTypeList();
    if (match.params.id) findCouponById(match.params.id);
    define('coupon');
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedCoupon();
    this.props.cleanDialog();
  };

  handleSaveCoupon = values => {
    const {
      history,
      match,
      findCouponById,
      updateCoupon,
      saveCoupon,
      challengeTypes,
    } = this.props;

    values.challengeTypes=challengeTypes
    .filter((item => (item.type==="Regular Challenge" && values.regTreasure && !values.regular ) || 
           (item.type==="Weekly Challenge" && values.weeklyTreasure  && !values.regular ) ||
           (item.type==="Premium Challenge" && values.premiumTreasure  && !values.regular)) );                                          

    if (match.params.id)
      updateCoupon({ ...values, ...match.params}).then(res => {
        if (res) findCouponById(match.params.id);
      });
    else
      saveCoupon({ ...values }).then(response => {
        if (response) {
          findCouponById(response).then(res =>
            history.push(`edit/${response}`),
          );
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleCouponDelete = () => {
    const { deleteCoupon, history, match } = this.props;
    deleteCoupon(match.params.id).then(res => history.push('/coupons'));
  };

  saveAdminNotes = values => {
    const { match, updateAdminNotes } = this.props;
    updateAdminNotes({ ...values, id: match.params.id });
  };

  render() {
    const {
      coupon: { id, end },
      categories,
      brands
    } = this.props;
    return (
      <CouponDetail
        handleSaveCoupon={this.handleSaveCoupon}
        goBack={this.goBack}
        couponId={id}
        handleCouponDelete={this.handleCouponDelete}
        saveAdminNotes={this.saveAdminNotes}
        categories={categories}
        brands={brands}
        active={end && new Date(end) < new Date() ? false : true}
      />
    );
  }
}

CouponDetailContainer.propTypes = {
  deleteCoupon: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  findCouponById: func.isRequired,
  updateCoupon: func.isRequired,
  saveCoupon: func.isRequired,
};

const mS = state => ({
  coupon: state.couponReducer.selectedCoupon,
  categories: state.categoryReducer.list,
  brands: state.brandReducer.list,
  challengeTypes: state.challengeTypeReducer.list,
});

const mD = {
  saveCoupon,
  findCouponById,
  cleanSelectedCoupon,
  deleteCoupon,
  updateCoupon,
  define,
  cleanDialog,
  updateAdminNotes,
  getBrandList,
  getCategoryList,
  getChallengeTypeList
};

CouponDetailContainer = connect(
  mS,
  mD,
)(CouponDetailContainer);

export default CouponDetailContainer;
