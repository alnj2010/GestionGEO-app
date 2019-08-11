import { Minigame } from '../services/minigame';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'minigame/list',
  LIST_CATEGORY: 'minigame/list_category',
  SELECT_TRIVIA: 'minigame/select_trivia',
  CLEAN_SELECTED_TRIVIA: 'minigame/clean_selected_trivia',
};

export const getTriviaList = () => async dispatch => {
  return Minigame.getTriviaList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: response });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const getCategoryList = () => async dispatch => {
  return Minigame.getCategoryList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST_CATEGORY, payload: response });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findTriviaById = id => async dispatch => {
  return Minigame.findTriviaById(id)
    .then(response => {
      dispatch({ type: ACTIONS.SELECT_TRIVIA, payload: response });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveTrivia = minigame => async dispatch => {
  const payload = {
    name: minigame.title,
    level: minigame.level,
    time: minigame.time ? Number.parseInt(minigame.time) : 0,
    points: minigame.doubloons ? Number.parseInt(minigame.doubloons) : 0,
    coins: minigame.coins ? Number.parseInt(minigame.coins) : 0,
    category: {
      id: minigame.category,
    },
    questions: [...minigame.questions],
  };
  return Minigame.saveTrivia(payload)
    .then(res => {
      show('Minigame Saved', 'success')(dispatch);
      return res.id;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updateTrivia = minigame => async dispatch => {
  const payload = {
    id: minigame.id,
    name: minigame.title,
    level: minigame.level,
    time: minigame.time ? Number.parseInt(minigame.time) : 0,
    points: minigame.doubloons ? Number.parseInt(minigame.doubloons) : 0,
    coins: minigame.coins ? Number.parseInt(minigame.coins) : 0,
    category: {
      id: minigame.category,
    },
    questions: [...minigame.questions],
  };
  return Minigame.updateTrivia(payload)
    .then(response => {
      show('Minigame Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteTrivia = id => async dispatch => {
  return Minigame.deleteTrivia(id)
    .then(response => {
      show('Minigame Deleted', 'success')(dispatch);
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedTrivia = () => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_TRIVIA,
    payload: {},
  });
};
