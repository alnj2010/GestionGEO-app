import { User } from '../services/user';
import { Brand } from '../services/brand';
import { show } from './snackbar';
import { changeNotes } from './adminNotes';

export const ACTIONS = {
  LIST: 'player/list',
  LIST_WINNERS: 'player/list_winners',
  SELECT: `player/select`,
  UPDATE: `player/update`,
  CLEAN_SELECTED_PLAYER: `player/clean-selected`,
};

export const getList = () => async dispatch => {
  return User.getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const getWinners = () => async dispatch => {
  return User.getWinnersList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST_WINNERS, payload: { winners: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const selectPlayer = data => async dispatch => {
  dispatch({ type: ACTIONS.SELECT, payload: { selectedPlayer: data } });
};

export const findPlayerById = id => async dispatch => {
  return User.findById(id)
    .then(response => {
      response[0].profile.birthday = new Date(
        response[0].profile.birthday.replace(/-/g, '/').replace(/T.+/, ''),
      );
      response[0].password = '******';
      changeNotes(response[0].profile.adminNotes)(dispatch);
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedPlayer: response[0] },
      });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedPlayer = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_PLAYER,
    payload: {},
  });
};

export const updatePlayer = player => async dispatch => {
  const payload = {
    id: player.id,
    email: player.email,
    name: player.name,
    last: player.lastName,
    password: player.password,
    profile: {
      gender: player.gender,
      birthday: player.birthdate,
      phone: player.phone,
      phoneCode: player.phoneCode,
      country: player.country,
      region: player.region,
      city: player.city,
      zip: player.zip,
    },
  };
  return User.update(payload)
    .then(response => {
      if (player.photo)
        return User.uploadPhoto(player.photo, player.id)
          .then(response => {
            response.profile.birthday = new Date(
              response.profile.birthday.replace(/-/g, '/').replace(/T.+/, ''),
            );
            response.password = '******';
            dispatch({
              type: ACTIONS.SELECT,
              payload: { selectedPlayer: response },
            });
            show('Player Updated', 'success')(dispatch);
            return true;
          })
          .catch(error => {
            show(error, 'error')(dispatch);
            return false;
          });
      else {
        response.profile.birthday = new Date(
          response.profile.birthday.replace(/-/g, '/').replace(/T.+/, ''),
        );
        response.password = '******';
        dispatch({
          type: ACTIONS.SELECT,
          payload: { selectedPlayer: response },
        });
        show('Player Updated', 'success')(dispatch);
      }
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updateAdminNotes = player => async dispatch => {
  const payload = {
    id: player.id,
    profile: {
      adminNotes: player.adminNotes,
    },
  };
  return User.update(payload)
    .then(response => {
      changeNotes(response.profile.adminNotes)(dispatch);
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const savePlayer = player => async dispatch => {
  let brands = await Brand.getRandom(
    player.birthdate.toISOString(),
    player.gender,
  );
  const payload = {
    email: player.email,
    password: player.password,
    name: player.name,
    last: player.lastName,
    role: 'player',
    gender: player.gender,
    birthday: player.birthdate.toISOString(),
    phone: player.phone,
    phoneCode: player.phoneCode,
    country: player.country,
    region: player.region,
    city: player.city,
    zip: player.zip,
    brands: [brands[0].id, brands[1].id, brands[2].id],
    adminNotes: player.adminNotes,
    adminCreated: true,
  };

  return User.save(payload)
    .then(res => {
      return User.uploadPhoto(player.photo, res.id)
        .then(response => {
          show('Player Saved', 'success')(dispatch);
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

export const deletePlayer = playerId => async dispatch => {
  return User.delete(playerId)
    .then(response => {
      show('Player deleted', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};
