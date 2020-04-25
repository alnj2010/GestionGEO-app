import { ACTIONS } from '../actions/miPerfil';

const initialState = {
  selectedMiPerfil: {},
};

const miPerfilReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_PERFIL:
      return { ...state, selectedMiPerfil: {} };
    default:
      return state;
  }
};

export default miPerfilReducer;
