import { BrandCategory } from '../services/brandsCategories';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'brandsCategories/list',
  SELECT: 'brandsCategories/select',
  CLEAN_SELECTED_BRAND: 'brandsCategories/clean_selected',
};

export const getList = () => async dispatch => {
  return BrandCategory.getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: response });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findBrandCategoryById = id => async dispatch => {
  return BrandCategory.findById(id)
    .then(response => {
      dispatch({ type: ACTIONS.SELECT, payload: response });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveBrandCategory = brandCategory => async dispatch => {
  const payload = {
    position: Number.parseInt(brandCategory.position),
    category: {
      id: brandCategory.category,
    },
    brand: {
      id: brandCategory.brand,
    },
  };
  return BrandCategory.save(payload)
    .then(res => {
      show('Brand - Category Saved', 'success')(dispatch);
      return res.id;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updateBrandCategory = brandCategory => async dispatch => {
  const payload = {
    position: Number.parseInt(brandCategory.position),
    category: {
      id: brandCategory.category,
    },
    brand: {
      id: brandCategory.brand,
    },
  };
  return BrandCategory.update(payload)
    .then(response => {
      show('Brand - Category Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteBrandCategory = (idCategory, idBrand) => async dispatch => {
  return BrandCategory.delete(idCategory, idBrand)
    .then(response => {
      show('BrandCategory Deleted', 'success')(dispatch);
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedBrandCategory = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_BRAND,
    payload: {},
  });
};
