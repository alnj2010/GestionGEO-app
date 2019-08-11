import { Wallet } from '../services/wallet';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'wallet/list',
  SELECT: 'wallet/select',
  CLEAN_SELECTED_PACKAGE: 'wallet/clean_selected',
};

export const getList = () => async dispatch => {
  return Wallet.getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: response });
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveWallet = wallet => async dispatch => {
  const payload = {
    price: wallet.price ? Number.parseInt(wallet.price) : 0,
    coin: wallet.coin ? Number.parseInt(wallet.coin) : 0,
    doubloon: wallet.doubloon ? Number.parseInt(wallet.doubloon) : 0,
    totalCoin: wallet.totalCoin ? Number.parseInt(wallet.totalCoin) : 0,
    skuGoogle: wallet.skuGoogle,
    skuIos: wallet.skuIos,
    totalDoubloon: wallet.totalDoubloon
      ? Number.parseInt(wallet.totalDoubloon)
      : 0,
    status: wallet.status === 'true' ? true : false,
  };
  return Wallet.save(payload)
    .then(res => {
      show('Package Saved', 'success')(dispatch);
      return res.id;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updateWallet = wallet => async dispatch => {
  const payload = {
    id: wallet.id,
    price: wallet.price ? Number.parseInt(wallet.price) : 0,
    coin: wallet.coin ? Number.parseInt(wallet.coin) : 0,
    doubloon: wallet.doubloon ? Number.parseInt(wallet.doubloon) : 0,
    totalCoin: wallet.totalCoin ? Number.parseInt(wallet.totalCoin) : 0,
    skuGoogle: wallet.skuGoogle,
    skuIos: wallet.skuIos,
    totalDoubloon: wallet.totalDoubloon
      ? Number.parseInt(wallet.totalDoubloon)
      : 0,
    status: wallet.status === 'true' ? true : false,
  };
  return Wallet.update(payload)
    .then(response => {
      show('Package Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteWallet = id => async dispatch => {
  return Wallet.delete(id)
    .then(response => {
      show('Package Deleted', 'success')(dispatch);
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedWallet = () => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_PACKAGE,
    payload: {},
  });
};
