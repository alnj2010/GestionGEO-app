import React, {Component} from 'react'
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import LocationDetail from '../../components/Locations/detail';
import { findLocationById, updateLocation, saveLocation,updateAdminNotes, cleanSelectedLocation,deleteLocation } from '../../actions/location';
import {define, cleanDialog } from '../../actions/dialog';

export class LocationDetailContainer extends Component {

    componentDidMount = () => {
      const {
        match,
         findLocationById,
         define
      } = this.props;
        
      if (match.params.id) findLocationById(match.params.id)
      define('location');
    };

    componentWillUnmount = () => {
      this.props.cleanSelectedLocation()
      this.props.cleanDialog();
    };
  
    handleSaveLocation = values => {
      const {
        history,
        match,
        findLocationById,
        updateLocation,
        saveLocation,
      } = this.props;
      
      if (match.params.id)
        updateLocation({ ...values, ...match.params }).then(res => {
          if (res) findLocationById(match.params.id);
        });
      else
        saveLocation({ ...values }).then(response => {
          if (response) {
            findLocationById(response).then(res =>
              history.push(`edit/${response}`),
            );
          }
        });
    };

    saveAdminNotes = values => {
      const { match, updateAdminNotes } = this.props;
      updateAdminNotes({ ...values, id: match.params.id });
    };   

    goBack = () => {
      const { history } = this.props;
      history.goBack();
    };

    handleLocationDelete = () => {
      const { deleteLocation, history, match } = this.props;
      deleteLocation(match.params.id).then(res => history.push('/locations'));
    };  
  
    render() {
      const { 
        location: { id },
      } = this.props;
      return ( 
        <LocationDetail 
          handleLocationDelete={this.handleLocationDelete}
          locationId={id} 
          goBack={this.goBack}
          handleSaveLocation={this.handleSaveLocation}
          saveAdminNotes={this.saveAdminNotes}
          />
      );
    }
  }
  
  LocationDetailContainer.propTypes = {
    history: object.isRequired,
    match: object.isRequired,
    findLocationById: func.isRequired,
    updateLocation: func.isRequired,
    saveLocation: func.isRequired,
    deleteLocation: func.isRequired,
  };
  
  const mS = state => ({
    location: state.locationReducer.selectedLocation
  });
  
  const mD = {
    findLocationById,
    cleanDialog,
    saveLocation,
    updateLocation,
    updateAdminNotes,
    cleanSelectedLocation,
    deleteLocation,
    define,
  };
  
  LocationDetailContainer = connect(
    mS,
    mD,
  )(LocationDetailContainer);
  
  export default LocationDetailContainer;