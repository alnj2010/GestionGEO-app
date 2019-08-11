import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteLocation } from '../../actions/location';
import LocationsList from '../../components/Locations';

export class LocationsContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
      this.props.getList().then(() => this.setState({ isLoading: false }));
      define('location');
  };
  componentWillUnmount = () => {
    this.props.cleanDialog();
  };
  handleDeleteLocation = (id) => {
    const { getList, deleteLocation } = this.props;
    deleteLocation(id).then(res => getList());
  }

  render() {
    const { locations, history, show } = this.props;
    const { isLoading } = this.state;

    return <LocationsList 
            locations={locations}
            isLoading={isLoading}
            history={history}
            handleDeleteLocation={this.handleDeleteLocation}
            show={show}
            />
   
  }
}

LocationsContainer.propTypes = {
    locations: array,
    history: object.isRequired,
    getList: func.isRequired,
    deleteLocation: func.isRequired,
};

const mS = state => ({
    locations: state.locationReducer.list,
});

const mD = {
    getList,
    deleteLocation,
    cleanDialog,
    define,
    show,
};

const LocationsPage = connect(
  mS,
  mD,
)(LocationsContainer);

export default LocationsPage;
