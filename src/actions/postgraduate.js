import { Postgraduate } from '../services/postgraduate';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'postgraduate/list',
  SELECT: `postgraduate/select`,
  UPDATE: `postgraduate/update`,
  CLEAN_SELECTED_POSTGRADUATE: `postgraduate/clean-selected`,
};

export const getList = () => async dispatch => {
  return Postgraduate.getPostgraduateList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findPostgraduateById = id => async dispatch => {
  return Postgraduate.findPostgraduateById(id)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedPostgraduate: response },
      });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedPostgraduate = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_POSTGRADUATE,
    payload: {},
  });
};

export const updatePostgraduate = postgraduate => async dispatch => {
  const payload = {
    id: postgraduate.id,
    postgraduate_name:postgraduate.postgraduateName,
    num_cu:parseInt(postgraduate.numCu),
  };
  return Postgraduate.update(payload)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedPostgraduate: response },
      });
      show('Postgrado actualizado', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const savePostgraduate = postgraduate => async dispatch => {
  const payload = {
   postgraduate_name:postgraduate.postgraduateName,
   num_cu:postgraduate.numCu,
  };
  return Postgraduate.savePostgraduate(payload)
    .then(res => {
      show('Postgrado guardado', 'success')(dispatch);
      return res.id;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deletePostgraduate = postgraduateId => async dispatch => {
  return Postgraduate.delete(postgraduateId)
    .then(response => {
      show('Postgrado eliminado', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};
