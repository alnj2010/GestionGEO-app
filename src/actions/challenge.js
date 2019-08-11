import { Challenge} from '../services/challenge';
import { show } from './snackbar';
import { changeNotes } from './adminNotes';

export const ACTIONS = {
  LIST: 'challenge/list',
  SELECT: `challenge/select`,
  CLEAN_SELECTED_CHALLENGE: `challenge/clean_selected`,
};

export const getList = () => async dispatch => {
  return Challenge.getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: response });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const findChallengeById = id => async dispatch => {
 
  return Challenge.findById(id)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: response,
      });
      changeNotes(response.adminNotes)(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveChallenge = challenge => async dispatch => {
  const payload = {
    title: challenge.title,
    type: {
      id: challenge.type,
    },
    zipcode: {
      id: challenge.zipcode
    },
    startingDate: new Date(challenge.startingDate),
    finalDate: new Date(challenge.finalDate),
    winners: parseInt(challenge.winners),
    coupons: challenge.coupons.map(coupon=>({id:coupon})),
    winnersCoupon: parseInt(challenge.winnersCoupon),
    prizes: challenge.prizes.map(prize=>({id:prize})),
    winnersPrize: parseInt(challenge.winnersPrize),
    doubloonsReward: parseInt(challenge.doubloonsReward),
    coinsReward: parseInt(challenge.coinsReward),
    finalPercentage: parseInt(challenge.finalPercentage),
    shareDoubloons: parseInt(challenge.shareDoubloons),
    specialHint: challenge.specialHint,
    firstPlaces: parseInt(challenge.firstPlaces),
    secondPlaces: parseInt(challenge.secondPlaces),
    thirdPlaces: parseInt(challenge.thirdPlaces),
  };
  return Challenge.save(payload)
    .then( res => { 
      delete res.sentNotifications; 
      delete res.deleteAt;
      challenge.mapPoints=challenge.mapPoints.map((point,index) => ({
        trivias:point.trivias.map(trivia=>({id:trivia})),
        hint: point.hint, 
        latitude: parseFloat(point.latitude), 
        longitude: parseFloat(point.longitude), 
        order: index+1, 
        ratio:parseFloat(point.ratio)
      })) 
      return Challenge.update({...res, mapPoints: challenge.mapPoints})} )
    .then(res => {
           
      show('Challenge Saved', 'success')(dispatch);
      return res.id;        
    })
    .catch(error => {
        show(error, 'error')(dispatch);
        return false;
    });
};

export const updateChallenge = challenge => async dispatch => {
  const payload = {
    id:challenge.id,
    title: challenge.title,
    type: {
      id: challenge.type,
    },
    zipcode: {
      id: challenge.zipcode
    },
    startingDate: new Date(challenge.startingDate),
    finalDate: new Date(challenge.finalDate),
    winners: parseInt(challenge.winners),
    coupons: challenge.coupons.map(coupon=>({id:coupon})),
    winnersCoupon: parseInt(challenge.winnersCoupon),
    prizes: challenge.prizes.map(prize=>({id:prize})),
    winnersPrize: parseInt(challenge.winnersPrize),
    doubloonsReward: parseInt(challenge.doubloonsReward),
    coinsReward: parseInt(challenge.coinsReward),
    finalPercentage: parseInt(challenge.finalPercentage),
    shareDoubloons: parseInt(challenge.shareDoubloons),
    mapPoints: challenge.mapPoints.map((point,index) => ({
      trivias:point.trivias.map(trivia=>({id:trivia})),
      hint: point.hint, 
      latitude: parseFloat(point.latitude), 
      longitude: parseFloat(point.longitude), 
      order: index+1, 
      ratio:parseFloat(point.ratio)
    })),
    specialHint: challenge.specialHint,
    firstPlaces: parseInt(challenge.firstPlaces),
    secondPlaces: parseInt(challenge.secondPlaces),
    thirdPlaces: parseInt(challenge.thirdPlaces),
  };
  return Challenge.update(payload)
    .then(response => {

      dispatch({ type: ACTIONS.SELECT, payload: response });
      show('Challenge Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};


export const updateSpecialHint = challenge => async dispatch => {
  const payload = {
    id: challenge.id,
    specialHint: challenge.specialHint,
  };
  return Challenge.updateSpecialHint(payload)
    .then(response => {
      changeNotes(response.adminNotes)(dispatch);
      show('Challenge Updated', 'success')(dispatch);
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const deleteChallenge = challengeId => async dispatch => {
  return Challenge.delete(challengeId)
    .then(response => {
      show('Challenge deleted', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedChallenge = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_CHALLENGE,
    payload: {},
  });
};