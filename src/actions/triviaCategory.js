import { TriviaCategory } from '../services/triviaCategory';
import { show } from './snackbar';
import { changeNotes } from './adminNotes';

export const ACTIONS = {
  LIST: 'trivia-category/list',
  SELECT: 'trivia-category/select',
  CLEAN_SELECTED_TRIVIA_CATEGORY: 'trivia-category/clean_selected',
};

export const getList = () => async dispatch => {
  return TriviaCategory.getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: response });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findTriviaCategoryById = id => async dispatch => {
  return TriviaCategory.findById(id)
    .then(response => {
      dispatch({ type: ACTIONS.SELECT, payload: response });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveTriviaCategory = category => async dispatch => {
  const payload = {
    name: category.name,
    description: category.description,
  };
  return TriviaCategory.save(payload)
    .then(res => {
      return TriviaCategory.uploadPhoto(category.photo, res.id)
        .then(response => {
          show('TriviaCategory Saved', 'success')(dispatch);
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

export const updateTriviaCategory = category => async dispatch => {
  const payload = {
    id: category.id,
    name: category.name,
    description: category.description,
  };
  return TriviaCategory.update(payload)
    .then(response => {
      if (category.photo)
        return TriviaCategory.uploadPhoto(category.photo, category.id)
          .then(response => {
            show('TriviaCategory Updated', 'success')(dispatch);
            return true;
          })
          .catch(error => {
            show(error, 'error')(dispatch);
            return false;
          });
      else show('TriviaCategory Updated', 'success')(dispatch);
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
  return TriviaCategory.update(payload)
    .then(response => {
      changeNotes(response.adminNotes)(dispatch);
      show('TriviaCategory Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteTriviaCategory = id => async dispatch => {
  return TriviaCategory.delete(id)
    .then(response => {
      show('TriviaCategory Deleted', 'success')(dispatch);
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedTriviaCategory = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_TRIVIA_CATEGORY,
    payload: {},
  });
};
