import { Zipcode} from '../services/zipcode';
import { show } from './snackbar';
import { changeNotes } from './adminNotes';

export const ACTIONS = {
  LIST: 'zipcode/list',
  SELECT: `zipcode/select`,
  CLEAN_SELECTED_ZIPCODE: `zipcode/clean_selected`,
};

export const getList = () => async dispatch => {
  return Zipcode.getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findZipcodeById = id => async dispatch => {
 
  return Zipcode.findById(id)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedZipcode: response },
      });
      changeNotes(response.adminNotes)(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveZipcode = zipcode => async dispatch => {

  const payload = {
    location: {
      id: zipcode.location
    },
    longitude: parseFloat(zipcode.long),
    latitude: parseFloat(zipcode.lat),
    city: zipcode.city,
    state: zipcode.state,
    code: zipcode.code,
  };

  return Zipcode.save(payload)
    .then(res => {     
      show('Zipcode Saved', 'success')(dispatch);
      return res.id;        
    })
    .catch(error => {
        show(error, 'error')(dispatch);
        return false;
    });
};

export const updateZipcode = zipcode => async dispatch => {
  const payload = {
    id:zipcode.id,
    location: {
      id: zipcode.location
    },
    longitude: parseFloat(zipcode.long),
    latitude: parseFloat(zipcode.lat),
    city: zipcode.city,
    state: zipcode.state,
    code: zipcode.code,
  };
  return Zipcode.update(payload)
    .then(response => {

      dispatch({ type: ACTIONS.SELECT, payload: response });
      show('Zipcode Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updateAdminNotes = zipcode => async dispatch => {
  const payload = {
    id: zipcode.id,
    adminNotes: zipcode.adminNotes,
  };
  return Zipcode.update(payload)
    .then(response => {
      changeNotes(response.adminNotes)(dispatch);
      show('Zipcode Updated', 'success')(dispatch);
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteZipcode = zipcodeId => async dispatch => {
  return Zipcode.delete(zipcodeId)
    .then(response => {
      show('Zipcode deleted', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedZipcode = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_ZIPCODE,
    payload: {},
  });
};