import { Location} from '../services/location';
import { show } from './snackbar';
import { changeNotes } from './adminNotes';

export const ACTIONS = {
  LIST: 'location/list',
  SELECT: `location/select`,
  CLEAN_SELECTED_LOCATION: `location/clean_selected`,
};

export const getList = () => async dispatch => {
  return Location.getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findLocationById = id => async dispatch => {
 
  return Location.findById(id)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedLocation: response },
      });
      changeNotes(response.adminNotes)(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveLocation = location => async dispatch => {
  const payload = {
    title: location.title,
    country: location.country,
  };
  return Location.save(payload)
    .then(res => {     
      show('Location Saved', 'success')(dispatch);
      return res.id;        
    })
    .catch(error => {
        show(error, 'error')(dispatch);
        return false;
    });
};

export const updateLocation = location => async dispatch => {
  const payload = {
    id: location.id,
    title: location.title,
    country: location.country,
  };
  return Location.update(payload)
    .then(response => {

      dispatch({ type: ACTIONS.SELECT, payload: response });
      show('Location Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updateAdminNotes = location => async dispatch => {
  const payload = {
    id: location.id,
    adminNotes: location.adminNotes,
  };
  return Location.update(payload)
    .then(response => {
      changeNotes(response.adminNotes)(dispatch);
      show('Location Updated', 'success')(dispatch);
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteLocation = locationId => async dispatch => {
  return Location.delete(locationId)
    .then(response => {
      show('Location deleted', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedLocation = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_LOCATION,
    payload: {},
  });
};