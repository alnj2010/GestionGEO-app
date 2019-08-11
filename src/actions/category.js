import { Category } from '../services/category';
import { show } from './snackbar';
import { changeNotes } from './adminNotes';

export const ACTIONS = {
  LIST: 'category/list',
  SELECT: 'category/select',
  CLEAN_SELECTED_CATEGORY: 'category/clean_selected',
};

export const getList = () => async dispatch => {
  return Category.getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: response });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findCategoryById = id => async dispatch => {
  return Category.findById(id)
    .then(response => {
      changeNotes(response.adminNotes)(dispatch);
      dispatch({ type: ACTIONS.SELECT, payload: response });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveCategory = category => async dispatch => {
  const payload = {
    name: category.name,
    description: category.description,
    position: Number.parseInt(category.position),
  };
  return Category.save(payload)
    .then(res => {
      return Category.uploadPhoto(category.photo, res.id)
        .then(response => {
          show('Category Saved', 'success')(dispatch);
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

export const updateCategory = category => async dispatch => {
  const payload = {
    id: category.id,
    name: category.name,
    description: category.description,
    position: Number.parseInt(category.position),
  };
  return Category.update(payload)
    .then(response => {
      if (category.photo)
        return Category.uploadPhoto(category.photo, category.id)
          .then(response => {
            show('Category Updated', 'success')(dispatch);
            return true;
          })
          .catch(error => {
            show(error, 'error')(dispatch);
            return false;
          });
      else show('Category Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updateAdminNotes = category => async dispatch => {
  const payload = {
    id: category.id,
    adminNotes: category.adminNotes,
  };
  return Category.update(payload)
    .then(response => {
      changeNotes(response.adminNotes)(dispatch);
      show('Category Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteCategory = id => async dispatch => {
  return Category.delete(id)
    .then(response => {
      show('Category Deleted', 'success')(dispatch);
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedCategory = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_CATEGORY,
    payload: {},
  });
};
