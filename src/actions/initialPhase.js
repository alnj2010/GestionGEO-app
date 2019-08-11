import { initialPhase } from '../services/initialPhase';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'initialPhase/list',
  SELECT: `initialPhase/select`,
  UPDATE: `initialPhase/update`,
  CLEAN_SELECTED_PHASE: `initialPhase/clean_selected`,
};

export const getList = () => async dispatch => {
  return initialPhase
    .getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const selectPhase = data => async dispatch => {
  dispatch({ type: ACTIONS.SELECT, payload: { selectedPhase: data } });
};

export const findPhaseById = id => async dispatch => {
  return initialPhase
    .findById(id)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedPhase: response },
      });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedPhase = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_PHASE,
    payload: {},
  });
};

export const updatePhase = phase => async dispatch => {
  const payload = {
    id: phase.id,
    position: phase.position ? Number.parseInt(phase.position) : 0,
    title: phase.title,
  };
  return initialPhase
    .update(payload)
    .then(response => {
      if (phase.photoAndroid)
        return initialPhase
          .uploadAndroidPhoto(phase.photoAndroid, phase.id)
          .then(res => {
            if (phase.photoiOS)
              return initialPhase
                .uploadiOSPhoto(phase.photoiOS, res.id)
                .then(resp => {
                  show('Phase Updated', 'success')(dispatch);
                  return true;
                });
            else {
              show('Phase Updated', 'success')(dispatch);
              return true;
            }
          })
          .catch(error => {
            show(error, 'error')(dispatch);
            return false;
          });
      else {
        show('Phase Updated', 'success')(dispatch);
        return true;
      }
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const savePhase = phase => async dispatch => {
  const payload = {
    title: phase.title,
    position: phase.position ? Number.parseInt(phase.position) : 0,
  };
  return initialPhase
    .save(payload)
    .then(res => {
      return initialPhase
        .uploadAndroidPhoto(phase.photoAndroid, res.id)
        .then(response => {
          return initialPhase
            .uploadiOSPhoto(phase.photoiOS, res.id)
            .then(resp => {
              show('Phase Saved', 'success')(dispatch);
              return res.id;
            });
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

export const deletePhase = phaseId => async dispatch => {
  return initialPhase
    .delete(phaseId)
    .then(response => {
      show('Phase deleted', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};
