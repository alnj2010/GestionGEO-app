import { Coupon } from '../services/coupon';
import { show } from './snackbar';
import { changeNotes } from './adminNotes';

export const ACTIONS = {
  LIST: 'coupon/list',
  SELECT: `coupon/select`,
  UPDATE: `coupon/update`,
  CLEAN_SELECTED_COUPON: `coupon/clean_selected`,
  GET_SETTINGS: 'coupon/get_settings',
  LIST_RC: 'coupon/list_redeem_coupon',
  SELECT_RC:'coupon/select_redeem_coupon',
};

export const getList = () => async dispatch => {
  return Coupon.getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return response;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const selectCoupon = data => async dispatch => {
  dispatch({ type: ACTIONS.SELECT, payload: { selectedCoupon: data } });
};

export const findCouponById = id => async dispatch => {
  return Coupon.findById(id)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedCoupon: response },
      });
      changeNotes(response.adminNotes)(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanSelectedCoupon = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_COUPON,
    payload: {},
  });
};

export const updateAdminNotes = coupon => async dispatch => {
  const payload = {
    id: coupon.id,
    adminNotes: coupon.adminNotes,
  };
  return Coupon.update(payload)
    .then(response => {
      changeNotes(response.adminNotes)(dispatch);
      show('Coupon Updated', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updateCoupon = coupon => async dispatch => {
  const payload = {
    id: coupon.id,
    title: coupon.title,
    description: coupon.description,
    start: coupon.initialDate,
    end: coupon.finalDate,
    regular: coupon.menu ? coupon.menu : false,
    hallengeTypes: coupon.challengeTypes,
    points: Number.parseInt(coupon.points),
    share: Number.parseInt(coupon.fbPoints),
    amount: Number.parseInt(coupon.inventory),
    value: Number.parseInt(coupon.value),
    category: { id: coupon.category },
    brand: { id: coupon.brand },
    QRCode:coupon.qrcode,
    barCode:coupon.barcode
  };
  return Coupon.update(payload)
    .then(response => {
      if (coupon.photo)
        return Coupon.uploadPhoto(coupon.photo, coupon.id)
          .then(res => {
            show('Coupon Updated', 'success')(dispatch);
            return true;
          })
          .catch(error => {
            show(error, 'error')(dispatch);
            return false;
          });
      else {
        show('Coupon Updated', 'success')(dispatch);
        return true;
      }
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const saveCoupon = coupon => async dispatch => {
  const payload = {
    title: coupon.title,
    description: coupon.description,
    start: coupon.initialDate,
    end: coupon.finalDate,
    regular: coupon.menu ? coupon.menu : false,
    challengeTypes: coupon.challengeTypes,
    points: Number.parseInt(coupon.points),
    share: Number.parseInt(coupon.fbPoints),
    amount: Number.parseInt(coupon.inventory),
    value: Number.parseInt(coupon.value),
    category: { id: coupon.category },
    brand: { id: coupon.brand },
    QRCode:coupon.qrcode,
    barCode:coupon.barcode
  };
  return Coupon.save(payload)
    .then(res => {
      return Coupon.uploadPhoto(coupon.photo, res.id)
        .then(response => {
          show('Coupon Saved', 'success')(dispatch);
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

export const deleteCoupon = couponId => async dispatch => {
  return Coupon.delete(couponId)
    .then(response => {
      show('Coupon deleted', 'success')(dispatch);
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const updateSettingsRC = data => async dispatch => {

  const payload = [
    { key: 'redeemInstructions', value: data.redeemInstruction },
    { key: 'barCode', value: data.barcode ? "true":"false" },
    { key: 'QRCode', value: data.qrcode ? "true":"false" },
    { key: 'redeemErrorSubtitle', value: data.redeemErrorSubtitle },
    { key: 'redeemErrorMessage', value: data.redeemErrorMsg },
    { key: 'supportEmail', value: data.supportEmail },
  ];
return Coupon.updateSettingsRC(payload)
.then(response => {
  show('Settings Updated', 'success')(dispatch);
  return true;
})
.catch(error => {
  show(error, 'error')(dispatch);
  return false;
});

}

export const getSettingsRC = () => async dispatch => {

return Coupon.getSettingsRC()
.then(response => {
  dispatch({
    type: ACTIONS.GET_SETTINGS,
    payload: { settingsRC: response },
  });
  return true;
})
.catch(error => {
  show(error, 'error')(dispatch);
  return false;
});

};

export const getListRC = () => async dispatch => {
  return Coupon.getListRC()
    .then(response => {
      dispatch({ type: ACTIONS.LIST_RC, payload: { listRC: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const getDetailRC = id => async dispatch => {
  return Coupon.findRCById(id)
    .then(response => {
      dispatch({
        type: ACTIONS.SELECT_RC,
        payload: { selectedRC: response },
      });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};
