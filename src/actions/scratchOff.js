import { ScratchOff } from '../services/scratchOff';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'scratch-off/list',
  SELECT: 'scratch-off/select',
  CLEAN_SELECTED_SCRATCH_OFF: 'scratch-off/clean_selected'
};

export const getList = () => async dispatch => {
  return ScratchOff.getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: response });
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findScratchOffById = id => async dispatch => {
  return ScratchOff.findById(id)
    .then(response => {
      dispatch({ type: ACTIONS.SELECT, payload: response });
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveScratchOff = scratchOff => async dispatch => {
  const payload = {
    title: scratchOff.title,
    gridType: scratchOff.gridType,
    luckyNumbers: scratchOff.luckyNumbers,
    bowlNumbers: Number.parseInt(scratchOff.bowlNumbers),
    maxPrizeCoins: Number.parseInt(scratchOff.maxPrizeCoins),
    maxPrizeDoubloons: Number.parseInt(scratchOff.maxPrizeDoubloons),
    maxWinners: Number.parseInt(scratchOff.maxWinners),
  };
  return ScratchOff.save(payload)
    .then(res => {
      show('Scratch Off Saved', 'success')(dispatch);
      return res.id;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updateScratchOff = scratchOff => async dispatch => {
  const payload = {
    id: scratchOff.id,
    title: scratchOff.title,
    gridType: scratchOff.gridType,
    luckyNumbers: {numbers:scratchOff.luckyNumbers} ,
    bowlNumbers: Number.parseInt(scratchOff.bowlNumbers),
    maxPrizeCoins: Number.parseInt(scratchOff.maxPrizeCoins),
    maxPrizeDoubloons: Number.parseInt(scratchOff.maxPrizeDoubloons),
    maxWinners: Number.parseInt(scratchOff.maxWinners),
  };
  return ScratchOff.update(payload)
    .then(response => {
      show('Scratch Off Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteScratchOff = id => async dispatch => {
  return ScratchOff.delete(id)
    .then(response => {
      show('Scratch Off Deleted', 'success')(dispatch);
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedScratchOff = () => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_SCRATCH_OFF,
    payload: {},
  });
};