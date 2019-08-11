import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Button,
} from '@material-ui/core';

import {
  Form,
  reduxForm
} from 'redux-form';

import RenderFields from '../RenderFields'

const styles = theme => ({
    inputLabel: {
      paddingTop: '4%',
    },
    input: {
      alignSelf: 'center',
    },
    buttonContainer: { paddingTop: '2%' },
    save: {
      width:135,
      color: 'white',
      backgroundColor: '#61A956',
      '&:hover': {
        backgroundColor: 'rgb(78, 127, 71)',
      },
    },
    containerTextArea:{
      paddingTop:35
    },
    error: {
      color: 'red',
    },
  });

class RedeemCoupon extends Component {

    render(){
        const {handleSubmit, pristine, submitting, classes} = this.props;
        return(
        <Form onSubmit={handleSubmit}>
            <h3> Redeem Coupon - Settings </h3>
            <hr />

            <Grid item xs={4} container>
                <RenderFields >{[
                    { label: 'Support email: ', field: 'supportEmail', id: 'supportEmail', type: 'email' },

                ]}</RenderFields>
                <Typography variant="subheading" gutterBottom>
                  Show Codes:
                </Typography>
                <Grid container>
                    <Grid item xs>
                        <RenderFields >{[
                            { label: 'Bar Code', field: 'barcode', id: 'barcode', type: 'checkbox'}
                        ]}</RenderFields>
                    </Grid>
                    <Grid item xs>
                        <RenderFields >{[
                            { label: 'QR code', field: 'qrcode', id: 'qrcode', type: 'checkbox'}
                        ]}</RenderFields>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={classes.containerTextArea}>
                <Grid item xs >
                  <Grid container>
                    <Grid item xs={12}><Typography variant="subheading" gutterBottom>Instructions: </Typography></Grid>
                    <Grid item xs={8} container>
                    <RenderFields >{[
                          {  field: 'redeemInstruction', id: 'redeemInstruction', type: 'text-area', title:false, rows:12}
                    ]}</RenderFields>
                    </Grid> 
                  </Grid>                   
                  
                </Grid>
                <Grid item xs>
                  <Typography variant="subheading" gutterBottom>Error subtitle: </Typography>
                  <RenderFields >{[
                      {  field: 'redeemErrorSubtitle', id: 'redeemErrorSubtitle', type: 'text-area', title:false}
                  ]}</RenderFields>

                  <Typography variant="subheading" gutterBottom>Error message: </Typography>
                  <RenderFields >{[
                      {  field: 'redeemErrorMsg', id: 'redeemErrorMsg', type: 'text-area', title:false}
                  ]}</RenderFields>
                  <Grid container item xs={12} justify="flex-end" className={classes.buttonContainer}>
                    <Button variant="contained" type="submit" className={classes.save} disabled={pristine || submitting}> Save Changes </Button>
                  </Grid>
                  <Grid item xs={6}></Grid>
                                      
                </Grid>
                
            </Grid>
        </Form>)    
    }
}
const redeemCouponValidation = (values) =>{
  const errors={};

  if(!values.redeemInstruction) errors.redeemInstruction="Instruction must not be empty"
  if(!values.redeemErrorSubtitle) errors.redeemErrorSubtitle="Error subtitle must not be empty"
  if(!values.redeemErrorMsg) errors.redeemErrorMsg="Error message must not be empty"

  if(!values.supportEmail){
    errors.supportEmail="Email must not be empty"
   
  }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.supportEmail)){
    errors.supportEmail = 'Invalid email address'      
  }

  if(!values.barcode && !values.qrcode){
    errors.barcode="At least one option selected is required."
  }
  
  return errors;
}

RedeemCoupon = reduxForm({
  form:'redeemCouponConfig',
  validate: redeemCouponValidation,
  enableReinitialize: true,
})(RedeemCoupon)

RedeemCoupon = connect(
  state => {    
    return {
      initialValues: {
        redeemInstruction: state.couponReducer.settingsRC.redeemInstructions,
        barcode: state.couponReducer.settingsRC.barCode === "true",
        qrcode: state.couponReducer.settingsRC.QRCode === "true",
        redeemErrorSubtitle: state.couponReducer.settingsRC.redeemErrorSubtitle,
        redeemErrorMsg: state.couponReducer.settingsRC.redeemErrorMessage,
        supportEmail: state.couponReducer.settingsRC.supportEmail,
      }
    };
  }
)(RedeemCoupon);

export default withStyles(styles)(RedeemCoupon);