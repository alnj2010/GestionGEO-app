import React, {Component} from 'react'
import { connect } from 'react-redux';
import { getDetailRC } from '../../actions/coupon';
import RedeemCouponDetail from '../../components/RedeemCoupon/detail';
import { func} from 'prop-types';


export class RedeemCouponDetailContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
      };
 
    }
    componentDidMount = () => {
        const {
          match,
          getDetailRC,
        } = this.props;
        
        if (match.params.id) getDetailRC(match.params.id).then(() => this.setState({ isLoading: false }));

      };
  
  
    render() {
      const { coupons,
        match:{ 
          params:{ name, lastname}
        }
      } = this.props;
      const { isLoading } = this.state;
      return ( 
        <RedeemCouponDetail name={name} lastname={lastname} coupons={coupons} isLoading={isLoading}/>
      );
    }
  }
  
  RedeemCouponDetailContainer.propTypes = {
    getDetailRC: func.isRequired
  };
  
  const mS = state => ({
    coupons: state.couponReducer.selectedRC
  });
  
  const mD = {
    getDetailRC
  };
  
  RedeemCouponDetailContainer = connect(
    mS,
    mD,
  )(RedeemCouponDetailContainer);
  
  export default RedeemCouponDetailContainer;