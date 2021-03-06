import { User } from '../services/user';
import { Constance } from '../services/constance';
import { show } from './snackbar';
import { getSessionUserId, getSessionUser, setSessionUser } from '../storage/sessionStorage';

export const ACTIONS = {
  LIST: 'admin/list',
  SELECT: `admin/select`,
  UPDATE: `admin/update`,
  CLEAN_SELECTED_ADMIN: `admin/clean-selected`,
};

export const getList = () => async (dispatch) => {
  return User.getAdminList()
    .then((response) => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const findAdminById = (id) => async (dispatch) => {
  return User.findAdminById(id)
    .then((response) => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedAdmin: response },
      });
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const cleanSelectedAdmin = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_ADMIN,
    payload: {},
  });
};

export const cleanGetList = () => async (dispatch) => {
  dispatch({ type: ACTIONS.LIST, payload: { list: [] } });
};

export const updateAdmin = (admin) => async (dispatch) => {
  const payload = {
    id: admin.id,
    first_name: admin.firstName,
    second_name: admin.secondName,
    first_surname: admin.firstSurname,
    second_surname: admin.secondSurname,
    identification: admin.identification,
    email: admin.email,
    mobile: admin.mobile,
    telephone: admin.telephone,
    work_phone: admin.workPhone,
    rol: admin.rol,
    sex: admin.sex,
    active: admin.active,
    nationality: admin.nationality,
    level_instruction: admin.levelInstruction,
    principal: admin.principal,
    with_disabilities: admin.withDisabilities,
  };
  return User.update(payload)
    .then((response) => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedAdmin: response },
      });
      show('Administrador actualizado', 'success')(dispatch);
      if (admin.id === getSessionUserId()) {
        const value = getSessionUser();
        setSessionUser({
          ...value,
          ...payload,
          administrator: {
            ...value.administrator,
            rol: payload.rol,
            principal: payload.principal,
          },
        });
      }
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const saveAdmin = (admin) => async (dispatch) => {
  const payload = {
    email: admin.email,
    first_name: admin.firstName,
    second_name: admin.secondName,
    first_surname: admin.firstSurname,
    second_surname: admin.secondSurname,
    identification: admin.identification,
    mobile: admin.mobile,
    telephone: admin.telephone,
    work_phone: admin.workPhone,
    rol: admin.rol,
    sex: admin.sex,
    active: admin.active,
    nationality: admin.nationality,
    level_instruction: admin.levelInstruction,
    principal: admin.principal,
    with_disabilities: admin.withDisabilities,
  };
  return User.saveAdmin(payload)
    .then((res) => {
      show('Administrador guardado', 'success')(dispatch);
      return res.id;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const deleteAdmin = (adminId) => async (dispatch) => {
  return User.delete(adminId)
    .then(() => {
      show('Administrador eliminado', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const getReport = (initial, final) => async (dispatch) => {
  return Constance.getReport(initial, final)
    .then(() => {
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};
