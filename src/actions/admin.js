import { User } from '../services/user';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'admin/list',
  SELECT: `admin/select`,
  UPDATE: `admin/update`,
  CLEAN_SELECTED_ADMIN: `admin/clean-selected`,
};

export const getList = () => async dispatch => {
  return User.getAdminList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const selectAdmin = data => async dispatch => {
  dispatch({ type: ACTIONS.SELECT, payload: { selectedAdmin: data } });
};

export const findAdminById = id => async dispatch => {
  return User.findAdminById(id)
    .then(response => {
      response[0].password = '******';
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedAdmin: response[0] },
      });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedAdmin = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_ADMIN,
    payload: {},
  });
};

export const updateAdmin = admin => async dispatch => {
  const payload = {
    id: admin.id,
    email: admin.email,
    password: admin.password,
    name: admin.name,
    last: admin.lastName,
  };
  return User.update(payload)
    .then(response => {
      response.password = '******';
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedAdmin: response },
      });
      show('Admin Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveAdmin = admin => async dispatch => {
  const payload = {
    email: admin.email,
    password: admin.password,
    name: admin.name,
    last: admin.lastName,
    role: 'admin',
    adminCreated: true,
  };
  return User.saveAdmin(payload)
    .then(res => {
      show('Admin Saved', 'success')(dispatch);
      return res.id;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteAdmin = adminId => async dispatch => {
  return User.delete(adminId)
    .then(response => {
      show('Admin deleted', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};
