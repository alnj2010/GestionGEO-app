import { InviteCode } from '../services/inviteCode';
import { show } from './snackbar';

export const ACTIONS = {
  GET_SETUP: 'inviteCode/get_setup',
  LIST_INVITATIONS: 'inviteCode/list_invitations',
  LIST_USER_INVITATIONS: 'inviteCode/list_user_invitations',
};

export const updateSetup = data => async dispatch => {
  const setup = [
    { key: 'referalPoints', value: data.pointUser },
    { key: 'referalCoins', value: data.coinUser },
    { key: 'referalPointsGets', value: data.pointReferred },
    { key: 'referalCoinsGets', value: data.coinReferred },
    { key: 'referalMax', value: data.maxInvitation },
    { key: 'referalTime', value: data.rangeInvitation },
    { key: 'referalActive', value: data.retribution ? '1' : '0' },
  ];
  return InviteCode.updateSetup(setup)
    .then(response => {
      show('Setup Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const getSetup = () => async dispatch => {
  return InviteCode.getSetup()
    .then(response => {
      dispatch({
        type: ACTIONS.GET_SETUP,
        payload: { setup: response },
      });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const getInvitations = () => async dispatch => {
  return InviteCode.getList()
    .then(response => {
      dispatch({
        type: ACTIONS.LIST_INVITATIONS,
        payload: { list: response },
      });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const getUserInvitations = userId => async dispatch => {
  return InviteCode.getUserInvitations(userId)
    .then(response => {
      dispatch({
        type: ACTIONS.LIST_USER_INVITATIONS,
        payload: response,
      });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};
