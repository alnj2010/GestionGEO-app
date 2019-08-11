import { Link } from '../services/externalLink';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'link/list',
  SELECT: 'link/select',
  CLEAN_SELECTED_LINK: 'link/clean_selected',
};

export const getList = () => async dispatch => {
  return Link.getList()
    .then(response => {
      dispatch({
        type: ACTIONS.LIST,
        payload: response,
      });
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveLink = link => async dispatch => {
  return Link.save(link)
    .then(res => {
      show('Link Saved', 'success')(dispatch);
      return res.id;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updateLink = link => async dispatch => {
  return Link.update(link)
    .then(response => {
      show('Link Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteLink = title => async dispatch => {
  return Link.delete(title)
    .then(response => {
      show('Link Deleted', 'success')(dispatch);
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedLink = () => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_QUESTION,
    payload: {},
  });
};
