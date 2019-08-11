import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
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
  },
});

class BrandDetail extends Component {
  constructor() {
    super();
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
      handleSaveBrand,
      brandId,
      pristine,
      submitting,
      valid,
      avatar,
      handleBrandDelete,
      goBack,
      submit,
      saveAdminNotes,
      change
    } = this.props;
    const { func } = this.state;
    return (
      <Fragment>
        <Grid container>
          <Form onSubmit={handleSubmit(handleSaveBrand)}>
            <Grid container>
              <Grid item xs={12}>
                <h3> {brandId ? `Brand: ${brandId}` : 'New Brand'}</h3>
                <hr />
              </Grid>
              <Grid item xs={6} className={classes.form}>
                <Grid container>
                  <RenderFields >{[
                    { label: 'Brand Title', field: 'name', id: 'title', type: 'text' },
                    { label: 'Brand min Age', field: 'minAge', id: 'minAge', type: 'text'},
                    { label: 'Brand max Age', field: 'maxAge', id: 'maxAge', type: 'text'},
                    { label: 'Brand Preferred Gender', field: 'prefGender', id: 'prefGender', type: 'select', options: [ { value: 'male', key: 'Male' }, { value: 'female', key: 'Female' }] },
                    { label: 'Brand Header', field: 'header', id: 'header', type: 'text'},
                    { label: 'Brand Description', field: 'description', id: 'description', type: 'text-area'},
                  ]}</RenderFields>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                <RenderFields >{[
                  { field: 'photo', id: 'photo', type: 'file', avatar:avatar, change:change, images: [
                    {label:' Brand Avatar', classesPhoto:classes.avatarPhoto, classesDefault:classes.smallIcon },
                    {label:'Brand Image',  classesPhoto:classes.photo, classesDefault:classes.largeIcon }]
                  }            
                ]}</RenderFields>     
                  <Grid item xs={12}>
                    <Grid container className={classes.buttonContainer}>
                      <Grid item xs={4}>
                        <Button variant="contained" onClick={goBack}>
                          Cancel
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        {brandId ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              this.handleDialogShow('delete', handleBrandDelete)
                            }
                          >
                            Delete
                          </Button>
                        ) : null}
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          variant="contained"
                          className={classes.save}
                          onClick={() =>
                            brandId
                              ? this.handleDialogShow('update', submit)
                              : submit('brand')
                          }
                          disabled={!valid || pristine || submitting}
                        >
                          Save Changes
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
          <hr />
          <Grid item xs={12}>
            {brandId ? (
              <AdminNotes onSubmit={saveAdminNotes} parent={this} />
            ) : (
              <Fragment>
                <hr />
                <h3> Admin Notes will be avaliable after you create a brand</h3>
              </Fragment>
            )}
          </Grid>
        </Grid>
        <Dialog handleAgree={func} />
      </Fragment>
    );
  };
}

BrandDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  handleSaveBrand: func.isRequired,
  playerId: string,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
  avatar: string,
  handleBrandDelete: func.isRequired,
  goBack: func.isRequired,
};

const brandValidation = values => {
  const errors = {};

  if(values.photo && values.photo.type!=='image/jpeg' && values.photo.type!=='image/jpg' && values.photo.type!=='image/png' )
    errors.photo='Image mime type must be JPG or PNG'

  if (!values.name) errors.name = 'Brand name is required';

  if (!values.description) errors.description = 'Brand description is required';

  if (!values.minAge) errors.minAge = 'Brand minAge is required';
  else if (!/^([\d])+$/.test(values.minAge))
    errors.minAge = 'Brand minAge must not contain letters';
  else if (Number.parseInt(values.minAge) < 0)
    errors.minAge = 'Brand minAge must be greater than 0';
  else if (Number.parseInt(values.minAge) > 100)
    errors.minAge = 'Brand minAge must be lesser than 100';

  if (!values.maxAge) errors.maxAge = 'Brand maxAge is required';
  else if (!/^([\d])+$/.test(values.maxAge))
    errors.maxAge = 'Brand maxAge must not contain letters';
  else if (Number.parseInt(values.maxAge) < 0)
    errors.maxAge = 'Brand maxAge must be greater than 0';
  else if (Number.parseInt(values.maxAge) > 100)
    errors.maxAge = 'Brand maxAge must be lesser than 100';

  if (!values.prefGender) errors.prefGender = 'Brand prefGender is required';

  if (!values.header) errors.header = 'Brand header is required';

  return errors;
};

BrandDetail = reduxForm({
  form: 'brand',
  validate: brandValidation,
  enableReinitialize: true,
})(BrandDetail);

const selector = formValueSelector('brand');

BrandDetail = connect(
  state => ({
    initialValues: {
      name: state.brandReducer.selectedBrand.name
        ? state.brandReducer.selectedBrand.name
        : '',
      description: state.brandReducer.selectedBrand.description
        ? state.brandReducer.selectedBrand.description
        : '',
      minAge: state.brandReducer.selectedBrand.minAge,
      maxAge: state.brandReducer.selectedBrand.maxAge,
      prefGender: state.brandReducer.selectedBrand.prefGender,
      header: state.brandReducer.selectedBrand.header,
      avatar: state.brandReducer.selectedBrand.image,
    },
    avatar: selector(state, 'avatar'),
  }),
  { change, submit, show },
)(BrandDetail);

export default withStyles(styles)(BrandDetail);
