import { Prize} from '../services/prize';
import { show } from './snackbar';
import { changeNotes } from './adminNotes';

export const ACTIONS = {
  LIST: 'prize/list',
  SELECT: `prize/select`,
  CLEAN_SELECTED_PRIZE: `prize/clean_selected`,
};

export const getList = () => async dispatch => {
  return Prize.getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findPrizeById = id => async dispatch => {
  return Prize.findById(id)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedPrize: response },
      });
      changeNotes(response.adminNotes)(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updateAdminNotes = prize => async dispatch => {
  const payload = {
    id: prize.id,
    adminNotes: prize.adminNotes,
  };
  return Prize.update(payload)
    .then(response => {
      changeNotes(response.adminNotes)(dispatch);
      show('Prize Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updatePrize = prize => async dispatch => {
  const payload = {
    id:prize.id,
    title: prize.title,
    category: { id: prize.category },
    brand: { id: prize.brand },
    initialDate: new Date(prize.initialDate),
    finalDate: new Date(prize.finalDate),
    regular: !!prize.regular,
    challengeTypes: prize.challengeTypes,
    winningDoubloons:  Number.parseInt(prize.winningDoubloons),
    sharingDoubloons: Number.parseInt(prize.sharingDoubloons),
    description: prize.description,
    internalDescription: prize.internalDescription,
    inventory: Number.parseInt(prize.inventory),
    value: Number.parseInt(prize.value),
  };
  return Prize.update(payload)
    .then(response => {
      if (prize.photo)
        return Prize.uploadPhoto(prize.photo, prize.id)
          .then(res => {
            show('Prize Updated', 'success')(dispatch);
            return true;
          })
          .catch(error => {
            show(error, 'error')(dispatch);
            return false;
          });
      else {
        show('Prize Updated', 'success')(dispatch);
        return true;
      }
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const savePrize = prize => async dispatch => {
  const payload = {
    title: prize.title,
    category: { id: prize.category },
    brand: { id: prize.brand },
    initialDate: new Date(prize.initialDate),
    finalDate: new Date(prize.finalDate),
    regular: !!prize.regular,
    challengeTypes: prize.challengeTypes,
    winningDoubloons:  Number.parseInt(prize.winningDoubloons),
    sharingDoubloons: Number.parseInt(prize.sharingDoubloons),
    description: prize.description,
    internalDescription: prize.internalDescription,
    inventory: Number.parseInt(prize.inventory),
    value: Number.parseInt(prize.value),
  };
  
  return Prize.save(payload)
    .then(res => {
      return Prize.uploadPhoto(prize.photo, res.id)
        .then(response => {
          show('Prize Saved', 'success')(dispatch);
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

export const cleanSelectedPrize = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_PRIZE,
    payload: {},
  });
};

export const deletePrize = prizeId => async dispatch => {
  return Prize.delete(prizeId)
    .then(response => {
      show('Prize deleted', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};