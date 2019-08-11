import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { object, func, string, bool } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
} from '@material-ui/core';
import {
  Form,
  reduxForm,
  change,
  submit,
  formValueSelector,
} from 'redux-form';
import Barcode from 'react-barcode';
import QRCode from 'qrcode.react';
import Dialog from '../Dialog';
import { show } from '../../actions/dialog';
import AdminNotes from '../AdminNotes';
import RenderFields from '../RenderFields'

const styles = theme => ({
  inputLabel: {
    paddingTop: '4%',
  },
  rightInputLabel: {
    paddingTop: '4%',
    paddingLeft: '4%',
  },
  input: {
    alignSelf: 'center',
  },
  form: {
    paddingLeft: '5%',
  },
  smallIcon: {
    width: '36.5%',
    height: '36.5%',
    cursor: 'pointer',
  },
  largeIcon: {
    width: '70%',
    height: '70%',
    cursor: 'pointer',
  },
  avatarPhoto: {
    width: '50%',
    height: '50%',
    cursor: 'pointer',
  },

  photo: {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  buttonContainer: { paddingTop: '2%' },
  save: {
    color: 'white',
    backgroundColor: '#61A956',
    '&:hover': {
      backgroundColor: 'rgb(78, 127, 71)',
    },
  },
  fileInput: {
    display: 'none',
  },
  date: { boxSizing: 'content-box', paddingTop: '4%' },
  lastSave: { justifyContent: 'flex-end', display: 'flex' },
  error: {
    color: 'red',
  }
});

class CouponDetail extends Component {
  constructor() {
    super();
    // eslint-disable-next-line
    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }

    this.state = {
      func: null,
    };
  }

 handleDialogShow = (action, func) => {
   this.setState({ func: func }, () => {
     this.props.show(action);
    });
  };

  render = () => {
    const {
      classes,
      handleSubmit,
      handleSaveCoupon,
      couponId,
      pristine,
      submitting,
      valid,
      avatar,
      qrcode,
      barcode,
      handleCouponDelete,
      goBack,
      active,
      submit,
      saveAdminNotes,
      categories, 
      brands,
      menu,
      change,
      category,
    } = this.props;
    const { func } = this.state;
    let date=new Date();
    
    let brandsOption=brands.filter(brand => brand.brandCategories && brand.brandCategories.some(brandCat=>brandCat.category && brandCat.category.id === category))
                .map(item => ({key:item.name,value:item.id}))
    return (
      <Fragment>
        <Grid container>
          <Form onSubmit={handleSubmit(handleSaveCoupon)}>
            <Grid container>
              <Grid item xs={12}>
                <h3> {couponId ? `Coupon: ${couponId}` : 'New Coupon'}</h3>
                <hr />
              </Grid>
              <Grid item xs={6} className={classes.form}>
                <Grid container>
                  <RenderFields >{[
                    { label: 'Coupon Title', field: 'title', id: 'title', type: 'text' },
                    { label: 'Category Association', field: 'category', id: 'category', type: 'select', options: categories.map(category => { return { key: category.name, value: category.id } }) , disabled:!!couponId },
                    { label: 'Brand Association', field: 'brand', id: 'brand', type: 'select', options: brandsOption , disabled:!!couponId },
                    { label: 'Starting Date', field: 'initialDate', id: 'initial-date', type: 'datetime-local', minDate:date.addDays(1), disabled:!!couponId },
                    { label: 'Final Date', field: 'finalDate', id: 'final-date', type: 'datetime-local', minDate:date.addDays(1), disabled:!!couponId },
                    { label: 'Coupon Apperance', field: 'apperance', id: 'apperance', type: 'label', disabled:!!couponId },
                    { label: 'Regular Menu', field: 'menu', id: 'regular-menu', type: 'checkbox', disabled:!!couponId },
                    { label: 'Reg. Treasure Hunt Challenge', field: 'regTreasure', id: 'treasure-challenge', type: 'switch', disabled:!!couponId||menu, checked:!menu },
                    { label: 'Treasure Hunt Weekly Challenge', field: 'weeklyTreasure', id: 'weekly-treasure-challenge', type: 'switch', disabled:!!couponId||menu, checked:!menu },
                    { label: 'Treasure Hunt Premium Challenge', field: 'premiumTreasure', id: 'premium-treasure-challenge', type: 'switch', disabled:!!couponId||menu, checked:!menu },
                    { label: 'Aditional doubloons for winning the coupon', field: 'points', id: 'points', type: 'text' },
                    { label: 'Adicional doubloons for sharing on FB the winning coupon', field: 'fbPoints', id: 'fb-points', type: 'text' },
                  ]}</RenderFields>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <RenderFields >{[
                        { field: 'photo', id: 'photo', type: 'file', avatar:avatar, change:change, images: [
                          {label:' Coupon Avatar', classesPhoto:classes.avatarPhoto, classesDefault:classes.smallIcon },
                          {label:'Coupon Image',  classesPhoto:classes.photo, classesDefault:classes.largeIcon }]
                        },  
                        { label: 'Coupon Description', field: 'description', id: 'description', type: 'text-area' },
                        { label: 'Inventory of Coupon', field: 'inventory', id: 'inventory', type: 'text' , disabled:!!couponId},
                        { label: 'Coupon Value ( % )', field: 'value', id: 'value', type: 'number', min:0, max:100 , disabled:!!couponId},
                        { label: 'QR code', field: 'qrcode', id: 'qrcode', type: 'text' , disabled:!!couponId},
                        { label: 'BAR code', field: 'barcode', id: 'barcode', type: 'text' , disabled:!!couponId},
                      ]}</RenderFields>
                    </Grid>
                  </Grid>
                  {barcode ? (
                    <Fragment>
                      <Grid item xs={12}>
                        <Grid container>
                          <Barcode value={barcode} displayValue={false} />
                        </Grid>
                      </Grid>
                    </Fragment>
                  ) : null}
                    {qrcode ? (
                    <Fragment>
                      <Grid item xs={12}>
                        <Grid container>
                          <QRCode value={qrcode} renderAs="svg" />
                        </Grid>
                      </Grid>
                    </Fragment>
                  ) : null}
                  <Grid item xs={12}>
                    <Grid container className={classes.buttonContainer}>
                      <Grid item xs={4}>
                        <Button variant="contained" onClick={goBack}>
                          Cancel
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        {couponId ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              this.handleDialogShow(
                                'delete',
                                handleCouponDelete,
                              )
                            }
                          >
                            Delete
                          </Button>
                        ) : null}
                     
                      </Grid>
                      { active ? (
                        <Grid item xs={4}>
                          <Button
                            variant="contained"
                            className={classes.save}
                            onClick={() =>
                              couponId
                                ? this.handleDialogShow('update', submit)
                                : submit('coupon')
                            }
                            disabled={!valid || pristine || submitting}
                          >
                            Save Changes
                          </Button>
                        </Grid>
                      ): null}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
          <hr />
          <Grid item xs={12}>
            {couponId ? (
              <AdminNotes onSubmit={saveAdminNotes} parent={this} />
            ) : (
              <Fragment>
                <hr />
                <h3>Admin Notes will be avaliable after you create a coupon</h3>
              </Fragment>
            )}
          </Grid>
        </Grid>
        <Dialog handleAgree={func} />
      </Fragment>
    );
  };
}

CouponDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  handleSaveCoupon: func.isRequired,
  playerId: string,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
  avatar: string,
  handleCouponDelete: func.isRequired,
  goBack: func.isRequired,
};

const couponValidation = values => {
  const errors = {};
  if(values.photo && values.photo.type!=='image/jpeg' && values.photo.type!=='image/jpg' && values.photo.type!=='image/png' )
    errors.photo='Image mime type must be JPG or PNG'
  if (!values.title) errors.title = 'Title must not be empty';
  if (!values.category) errors.category = 'Category must not be empty';
  if (!values.brand) errors.brand = 'Brand must not be empty';
  if (!values.initialDate || values.initialDate === 'Invalid date')
    errors.initialDate = 'Starting date must not be empty';
    
  if (!values.finalDate || values.finalDate === 'Invalid date')
    errors.finalDate = 'Final date must not be empty';
  else if (new Date(values.finalDate) < new Date(values.initialDate))
    errors.finalDate = 'Pick date-time greater than the initial date';
  if (
    !values.menu &&
    !values.regTreasure &&
    !values.weeklyTreasure &&
    !values.premiumTreasure
  )
    errors.apperance = 'At least one apperance must be selected';
  if (!values.points) errors.points = 'Doubloons must not be empty';
  else if (!/(?=[0-9])/.test(values.points))
    errors.points = 'Doubloons must only contain numbers';

  if (!values.fbPoints) errors.fbPoints = 'Doubloons must not be empty';
  else if (!/(?=[0-9])/.test(values.fbPoints))
    errors.fbPoints = 'Doubloons must only contain numbers';

  if (!values.description) errors.description = 'Description must not be empty';

  if (!values.inventory) errors.inventory = 'Inventory must not be empty';
  else if (!/(?=[0-9])/.test(values.inventory))
    errors.inventory = 'Inventory must only contain numbers';

  if (!values.value) errors.value = 'Value must not be empty';
  else if (!/(?=[0-9])/.test(values.value))
    errors.value = 'Value must only contain numbers';
  else if(values.value < 0 ||  values.value > 100){
    errors.value = 'Value must be between 0 and 100';
  }
  
  if(!values.qrcode && !values.barcode){
    errors.qrcode = 'At least one of the QA or BAR fields must be filled';
    errors.barcode = 'At least one of the QA or BAR fields must be filled';
  }
   
  return errors;
};

CouponDetail = reduxForm({
  form: 'coupon',
  validate: couponValidation,
  enableReinitialize: true,
  touchOnChange: true,
  touchOnBlur: true
})(CouponDetail);

const selector = formValueSelector('coupon');

CouponDetail = connect(
  state => ({
    initialValues: {
      title: state.couponReducer.selectedCoupon.title,
      category: state.couponReducer.selectedCoupon.category
        ? state.couponReducer.selectedCoupon.category.id
        : null,
      brand: state.couponReducer.selectedCoupon.brand
        ? state.couponReducer.selectedCoupon.brand.id
        : null,
      initialDate: moment(
        new Date(state.couponReducer.selectedCoupon.start),
      ).format('YYYY-MM-DDTHH:mm'),
      finalDate: moment(
        new Date(state.couponReducer.selectedCoupon.end),
      ).format('YYYY-MM-DDTHH:mm'),
      menu: state.couponReducer.selectedCoupon.menu,

      regTreasure: state.couponReducer.selectedCoupon.menu ? false : 
      (state.couponReducer.selectedCoupon.challengeTypes ? 
          state.couponReducer.selectedCoupon.challengeTypes.some( item => item.type==="Regular Challenge" ) :false),
  
      weeklyTreasure: state.couponReducer.selectedCoupon.menu ? false : 
      (state.couponReducer.selectedCoupon.challengeTypes ? 
          state.couponReducer.selectedCoupon.challengeTypes.some( item => item.type==="Weekly Challenge" ) :false),
    
      premiumTreasure: state.couponReducer.selectedCoupon.menu ? false : 
      (state.couponReducer.selectedCoupon.challengeTypes ? 
          state.couponReducer.selectedCoupon.challengeTypes.some( item => item.type==="Premium Challenge" ) :false),

      points: state.couponReducer.selectedCoupon.points
        ? `${state.couponReducer.selectedCoupon.points}`
        : null,
      fbPoints: state.couponReducer.selectedCoupon.share
        ? `${state.couponReducer.selectedCoupon.share}`
        : null,
      description: state.couponReducer.selectedCoupon.description,
      inventory: state.couponReducer.selectedCoupon.amount
        ? `${state.couponReducer.selectedCoupon.amount}`
        : null,
      value: state.couponReducer.selectedCoupon.value
        ? `${state.couponReducer.selectedCoupon.value}`
        : null,
      qrcode: state.couponReducer.selectedCoupon.QRCode
        ? state.couponReducer.selectedCoupon.QRCode
        : null,
      barcode: state.couponReducer.selectedCoupon.barCode
        ? state.couponReducer.selectedCoupon.barCode
        : null,
      avatar: state.couponReducer.selectedCoupon.avatar,
    },
    avatar: selector(state, 'avatar'),
    qrcode: selector(state, 'qrcode'),
    barcode: selector(state, 'barcode'),
    menu: selector(state, 'menu'),
    category:selector(state, 'category'),
  }),
  { change, submit, show },
)(CouponDetail);

export default withStyles(styles)(CouponDetail);
