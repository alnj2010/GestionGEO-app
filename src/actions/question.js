import { Question } from '../services/question';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'question/list',
  SELECT: 'question/select',
  CLEAN_SELECTED_QUESTION: 'question/clean_selected',
};

export const getList = () => async dispatch => {
  return Question.getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: response });
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const getListByName = name => async dispatch => {
  return Question.getListByName(name)
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: response });
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findQuestionById = id => async dispatch => {
  return Question.findById(id)
    .then(response => {
      dispatch({ type: ACTIONS.SELECT, payload: response });
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveQuestion = question => async dispatch => {
  const payload = {
    title: question.title,
    answer: question.answer,
    level: question.level,
    text: question.question,
    alternatives: {
      text: [
        question.firstOption,
        question.secondOption,
        question.thirdOption,
        question.fourthOption,
      ],
    },
  };
  return Question.save(payload)
    .then(res => {
      show('Question Saved', 'success')(dispatch);
      return res.id;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updateQuestion = question => async dispatch => {
  const payload = {
    id: question.id,
    title: question.title,
    answer: question.answer,
    level: question.level,
    text: question.question,
    alternatives: {
      text: [
        question.firstOption,
        question.secondOption,
        question.thirdOption,
        question.fourthOption,
      ],
    },
  };
  return Question.update(payload)
    .then(response => {
      show('Question Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteQuestion = id => async dispatch => {
  return Question.delete(id)
    .then(response => {
      show('Question Deleted', 'success')(dispatch);
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedQuestion = () => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_QUESTION,
    payload: {},
  });
};
