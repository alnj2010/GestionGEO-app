import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { object, func, string, bool } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import {
  Form,
  Field,
  reduxForm,
  change,
  submit,
  formValueSelector,
} from 'redux-form';
import Dialog from '../Dialog';
import { show } from '../../actions/dialog';
import './font.css';

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
  lastSave: { justifyContent: 'flex-end', display: 'flex' },
  error: {
    color: 'red',
  },

  iphoneFrameContent: {
    paddingTop: '2vh',
    textAlign: 'center',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1,
  },
  androidFrameContent: {
    paddingTop: '1.5vh',
    textAlign: 'center',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1,
  },
  iphoneFrameButton: {
    height: 24.2,
    width: '100%',
    borderRadius: 20,
    color: 'white',
    border: ' 2px solid #C39E53',
    maxWidth: '27%',
    fontSize: 16,
    lineHeight: 0.7,
    letterSpacing: -0.13,
    textAlign: 'center',
    fontFamily: 'Zing Rust',
    marginLeft: 15,
  },
  iphoneFrameFooter: {
    display: 'flex',
    width: '142%',
    position: 'absolute',
    marginTop: -59,
  },
  iphoneImage: {
    borderRadius: '4%',
    width: '31vh',
    height: '66vh',
  },
  capture: {
    display: 'flex',
    justifyContent: 'center',
  },
  phoneGrid: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class InitialPhaseDetail extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  renderFileInput = params => {
    const { classes } = this.props;
    const {
      meta: { error },
    } = params;

    return (
      <Fragment>
        <input
          id={params.id}
          type="file"
          accept="image/*"
          className={classes.fileInput}
          onChange={this.handleFileChange}
          {...params}
        />
        {error && <span className={classes.error}>{error}</span>}
      </Fragment>
    );
  };

  handleFileChange = event => {
    const _ = this;
    const reader = new FileReader();
    let type = '';
    reader.onload = e => {
      var img = new Image();
      if (type === 'photo-android')
        _.props.change('photoAndroid', e.target.result);
      else _.props.change('photoiOS', e.target.result);
      img.onload = e => {
        if (type === 'photo-android')
          _.props.setRatio(
            'android',
            Math.abs(img.width * 16 - img.height * 9) < 20 &&
              img.height >= img.width,
          );
        else
          _.props.setRatio(
            'iOS',
            Math.abs(img.width * 19.5 - img.height * 9) < 20 &&
              img.height >= img.width,
          );
      };
      img.src = reader.result;
    };
    if (event.target.files[0]) {
      if (event.target.id === 'photo-android')
        this.props.storePhoto('android', event.target.files[0]);
      else this.props.storePhoto('iOS', event.target.files[0]);
      type = event.target.id;
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  handleFileUpload = id => {
    document.getElementById(id).click();
  };

  handleDialogShow = (action, func) => {
    this.setState({ func: func }, () => {
      this.props.show(action);
    });
  };

  validateImageFormat = imageFile => {
   
    if (imageFile && imageFile[0]!=='h') {
      const type = imageFile.split(";",1)[0].split("/",2)[1];
      if (type!=='jpg' && type!=='png' && type!=='jpeg' ) {
        return `Image mime type must be JPG or PNG`;
      }
    }
  };


  render = () => {
    const {
      classes,
      handleSubmit,
      handleSavePhase,
      phaseId,
      pristine,
      submitting,
      valid,
      photoAndroid,
      photoiOS,
      position,
      handlePhaseDelete,
      goBack,
      submit,
    } = this.props;
    const { func } = this.state;
    return (
      <Form onSubmit={handleSubmit(handleSavePhase)}>
        <Grid container>
          <Grid item xs={12}>
            <h3> {phaseId ? `Phase: ${phaseId}` : 'New Phase'}</h3>
            <hr />
          </Grid>
          <Grid item xs={6} className={classes.form}>
            <Grid container>
              <RenderFields >{[
                { label: 'Image Title', field: 'title', id: 'title', type: 'text' },
                { label: 'Position', field: 'position', id: 'position', type: 'number' },
              ]}</RenderFields>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer}>
                  <Grid item xs={4}>
                    <Button variant="contained" onClick={goBack}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    {phaseId ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          this.handleDialogShow('delete', handlePhaseDelete)
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
                        phaseId
                          ? this.handleDialogShow('update', submit)
                          : submit('phase')
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
          <Grid item xs={6} />
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  {phaseId ? (
                    <Grid item xs={12} className={classes.capture}>
                      <h2> {`Capture #${position}`}</h2>
                    </Grid>
                  ) : null}
                  <Field
                    id="photo-ios"
                    name="photoiOS"
                    component={this.renderFileInput}
                    validate={[this.validateImageFormat]}
                  />
                  <Grid item xs={12} className={classes.phoneGrid}>
                    <div
                      className={classes.iphoneFrameContainer}
                      onClick={() => this.handleFileUpload('photo-ios')}
                    >
                      <div className={classes.iphoneFrameContent}>
                        {photoiOS ? (
                          <Fragment>
                            <img
                              id="phone"
                              src={photoiOS}
                              frameBorder="0"
                              alt="ex"
                              className={classes.iphoneImage}
                            />
                            <div className={classes.iphoneFrameFooter}>
                              <Button className={classes.iphoneFrameButton}>
                                Sign In
                              </Button>
                              <Button className={classes.iphoneFrameButton}>
                                Register
                              </Button>
                            </div>
                          </Fragment>
                        ) : null}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              {phaseId ? (
                <Grid item xs={12} className={classes.capture}>
                  <h2> {`Capture #${position}`}</h2>
                </Grid>
              ) : null}
              <Field
                id="photo-android"
                name="photoAndroid"
                component={this.renderFileInput}
                validate={[this.validateImageFormat]}
              />
              <Grid item xs={12} className={classes.phoneGrid}>
                <div
                  className={classes.androidFrameContainer}
                  onClick={() => this.handleFileUpload('photo-android')}
                >
                  <div className={classes.androidFrameContent}>
                    {photoAndroid ? (
                      <Fragment>
                        <img
                          id="phone"
                          src={photoAndroid}
                          frameBorder="0"
                          alt="ex"
                          className={classes.iphoneImage}
                        />
                        <div className={classes.iphoneFrameFooter}>
                          <Button className={classes.iphoneFrameButton}>
                            Sign In
                          </Button>
                          <Button className={classes.iphoneFrameButton}>
                            Register
                          </Button>
                        </div>
                      </Fragment>
                    ) : null}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Dialog handleAgree={func} />
      </Form>
    );
  };
}

InitialPhaseDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  handleSavePhase: func.isRequired,
  playerId: string,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
  photo: string,
  handlePhaseDelete: func.isRequired,
  goBack: func.isRequired,
};

const phaseValidation = values => {
  const errors = {};

  if (!values.title) errors.title = 'Title is required';
  if (!values.position) errors.position = 'Position is required';
  else if (!/^([\d])+$/.test(values.position))
    errors.position =
      'Position must not contain letters and should be positive';
  else if (values.position < 1)
    errors.position = 'Position must be greater than 0';
  return errors;
};

InitialPhaseDetail = reduxForm({
  form: 'initialPhase',
  validate: phaseValidation,
  enableReinitialize: true,
})(InitialPhaseDetail);

const selector = formValueSelector('initialPhase');

InitialPhaseDetail = connect(
  state => ({
    initialValues: {
      title: state.initialPhaseReducer.selectedPhase.title,
      position: state.initialPhaseReducer.selectedPhase.position
        ? state.initialPhaseReducer.selectedPhase.position + ''
        : null,
      photoAndroid: state.initialPhaseReducer.selectedPhase.androidPicture,
      photoiOS: state.initialPhaseReducer.selectedPhase.iOSPicture,
    },
    photoAndroid: selector(state, 'photoAndroid'),
    photoiOS: selector(state, 'photoiOS'),
    position: selector(state, 'position'),
  }),
  { change, submit, show },
)(InitialPhaseDetail);

export default withStyles(styles)(InitialPhaseDetail);
