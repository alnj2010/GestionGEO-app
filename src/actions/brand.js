import { Brand } from '../services/brand';
import { show } from './snackbar';
import { changeNotes } from './adminNotes';

export const ACTIONS = {
  LIST: 'brand/list',
  SELECT: 'brand/select',
  CLEAN_SELECTED_BRAND: 'brand/clean_selected',
};

export const getList = () => async dispatch => {
  return Brand.getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: response });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const getFullList = () => async dispatch => {
  return Brand.getFullList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: response });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findBrandById = id => async dispatch => {
  return Brand.findById(id)
    .then(response => {
      dispatch({ type: ACTIONS.SELECT, payload: response });
      changeNotes(response.adminNotes)(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveBrand = brand => async dispatch => {
  const payload = {
    name: brand.name,
    minAge: Number.parseInt(brand.minAge),
    maxAge: Number.parseInt(brand.maxAge),
    prefGender: brand.prefGender,
    header: brand.header,
    description: brand.description,
    adminNotes: '',
  };
  return Brand.save(payload)
    .then(res => {
      return Brand.uploadPhoto(brand.photo, res.id)
        .then(response => {
          show('Brand Saved', 'success')(dispatch);
          return res.id;
        })
        .catch(error => {
          show(error, 'error')(dispatch);
          return false;
        });
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updateBrand = brand => async dispatch => {
  const payload = {
    id: brand.id,
    name: brand.name,
    minAge: Number.parseInt(brand.minAge),
    maxAge: Number.parseInt(brand.maxAge),
    prefGender: brand.prefGender,
    header: brand.header,
    description: brand.description,
    adminNotes: brand.adminNotes,
  };
  return Brand.update(payload)
    .then(response => {
      if (brand.photo)
        return Brand.uploadPhoto(brand.photo, brand.id)
          .then(response => {
            dispatch({ type: ACTIONS.SELECT, payload: response });
            show('Brand Updated', 'success')(dispatch);
            return true;
          })
          .catch(error => {
            show(error, 'error')(dispatch);
            return false;
          });
      else {
        dispatch({ type: ACTIONS.SELECT, payload: response });
        show('Brand Updated', 'success')(dispatch);
      }
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updateAdminNotes = brand => async dispatch => {
  const payload = {
    id: brand.id,
    adminNotes: brand.adminNotes,
  };
  return Brand.update(payload)
    .then(response => {
      changeNotes(response.adminNotes)(dispatch);
      show('Brand Updated', 'success')(dispatch);
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteBrand = id => async dispatch => {
  return Brand.delete(id)
    .then(response => {
      show('Brand Deleted', 'success')(dispatch);
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedBrand = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_BRAND,
    payload: {},
  });
};
