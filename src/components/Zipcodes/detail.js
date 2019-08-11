import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { object, func, string, bool } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MapContainer from '../MapContainer'
import {
  Grid,
  Button
} from '@material-ui/core';
import {
  Form,
  reduxForm,
  change,
  submit,
  formValueSelector
} from 'redux-form';
import Dialog from '../Dialog';
import { show } from '../../actions/dialog';
import AdminNotes from '../AdminNotes';
import RenderFields from '../RenderFields'
import Geocode from "react-geocode-multi-language";

  const styles = theme => ({
    inputLabel: {
      paddingTop: 0,
    },
    input: {
      alignSelf: 'center',
    },
    form: {
      paddingLeft: '5%',
      width:'100%'
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

class ZipcodeDetail extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          func: null,
        };   
    }

      handleDialogShow = (action, func) => {
        this.setState({ func: func }, () => {
          this.props.show(action);
        });
      };

      handleDragEnd = event => {
        this.props.change("lat", event.latLng.lat())
        this.props.change("long", event.latLng.lng())
         Geocode.fromLatLng(event.latLng.lat(), event.latLng.lng()).then(
          response => {
            let code=response.results[0].address_components.find(data=>data.types.some(type=>type==="postal_code"));
            let city = response.results[0].address_components.find(data=>data.types.some(type=>type==="locality"));
            let state= response.results[0].address_components.find(data=>data.types.some(type=>type==="administrative_area_level_1"));
            this.props.change("code", code ? code.long_name : '')
            this.props.change("city", city ? city.long_name : '')
            this.props.change("state",  state ? state.long_name : '')
          },
          error => {
            console.error(error);
          }
        );
      }
    

      render(){
          const {
            classes,
            handleSubmit,
            zipcodeId,
            pristine,
            submitting,
            valid,
            goBack,
            submit,
            saveAdminNotes,
            handleSaveZipcode,
            handleZipcodeDelete,
            locations,
            lat,
            long,
          } = this.props;
          const { func } = this.state;
          return (
            <React.Fragment>
               <Grid container>
                  <h3> {zipcodeId ? `Zip Code: ${zipcodeId}` : 'New Zip Code'}</h3>                                                   
                </Grid>
                <hr />
                <Grid container>
                  <Form onSubmit={handleSubmit(handleSaveZipcode)} className={classes.form}>
                    <RenderFields >{[
                      { label: 'Location', field: 'location', id: 'location', styles:{width:"50%"}, type: 'select', options: locations.map(location => { return { key: location.title, value: location.id } }) }, 
                      { label: 'Latitude', field: 'lat', id: 'lat', type: 'text', disabled:true },
                      { label: 'Longitude', field: 'long', id: 'long', type: 'text',disabled:true },
                      { label: 'City', field: 'city', id: 'city', type: 'text', disabled:true },
                      { label: 'State', field: 'state', id: 'state', type: 'text', disabled:true },
                      { label: 'Zip Code', field: 'code', id: 'code', type: 'text', disabled:true },
                    ]}</RenderFields>
                    <Grid item xs={8}>
                      <MapContainer handleDragEnd={this.handleDragEnd} lat={lat} lng={long} ></MapContainer>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container className={classes.buttonContainer} justify="flex-end" >
                        <Grid item xs={2}>
                          <Button variant="contained" onClick={goBack}>
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item xs={2}>
                        {zipcodeId ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              this.handleDialogShow(
                                'delete',
                                handleZipcodeDelete,
                              )
                            }
                          >
                            Delete
                          </Button>
                        ) : null}
                     
                      </Grid>
                          <Grid item xs={2}>
                            <Button
                              variant="contained"
                              className={classes.save}
                              onClick={() =>
                                zipcodeId
                                  ? this.handleDialogShow('update', submit)
                                  : submit('zipcode')
                              }
                              disabled={!valid || pristine || submitting}
                            >
                              Save Changes
                            </Button>
                          </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                  
                  <Grid item xs={12}>
                    {zipcodeId ? (
                      <AdminNotes onSubmit={saveAdminNotes} parent={this} />
                    ) : (
                      <Fragment>
                        <hr />
                        <h3> Admin Notes will be avaliable after you create a zipcode</h3>
                      </Fragment>
                    )}
                  </Grid>
                </Grid>
                <Dialog handleAgree={func} />

            </React.Fragment> 
            )
      }

}
const zipcodeValidation = values => {
  const errors = {};
  if(!values.location) errors.location = "Location must not be empty"

  if(!values.lat) errors.lat = "Latitude must not be empty"
  else if (!/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,20})?))$/.test(values.lat)) 
    errors.lat = "Enter a valid latitude"

  if(!values.long) errors.long = "Longitude must not be empty"
  else if (!/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,20})?))$/.test(values.long)) 
    errors.long = "Enter a valid longitude"

  if(!values.city) errors.city = "City must not be empty"
  if(!values.state) errors.state = "State must not be empty"
  
  if(!values.code) errors.code = "Zip Code must not be empty"
  else if (!/^[0-9]{5}(?:-[0-9]{4})?$/.test(values.code)) 
    errors.code = "Enter a valid Zip Code"


  return errors;
};

ZipcodeDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  handleSaveZipcode: func.isRequired,
  playerId: string,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
  photo: string,
  goBack: func.isRequired,
};

ZipcodeDetail = reduxForm({
  form: 'zipcode',
  validate: zipcodeValidation,
  enableReinitialize: true,
})(ZipcodeDetail);
const selector = formValueSelector('zipcode')
ZipcodeDetail = connect(
  state => ({
    initialValues: {
      location: state.zipcodeReducer.selectedZipcode.location
      ? state.zipcodeReducer.selectedZipcode.location.id
      : null,
      lat: state.zipcodeReducer.selectedZipcode ? state.zipcodeReducer.selectedZipcode.latitude :null,
      long: state.zipcodeReducer.selectedZipcode ? state.zipcodeReducer.selectedZipcode.longitude :null,
      city: state.zipcodeReducer.selectedZipcode ? state.zipcodeReducer.selectedZipcode.city :null,
      state: state.zipcodeReducer.selectedZipcode ? state.zipcodeReducer.selectedZipcode.state :null,
      code: state.zipcodeReducer.selectedZipcode ? state.zipcodeReducer.selectedZipcode.code :null,
    },
    lat: selector(state, 'lat'),
    long: selector(state, 'long'),
  }),
  { change, submit, show },
)(ZipcodeDetail);

export default withStyles(styles)(ZipcodeDetail);