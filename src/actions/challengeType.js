import { ChallengeType } from '../services/challengeType';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'challenge_type/list',
  SELECT: `challenge_type/select`,
};

export const getList = () => async dispatch => {
  return ChallengeType.getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findChallengeTypeById = id => async dispatch => {
  return ChallengeType.findById(id)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedChallengeType: response },
      });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};