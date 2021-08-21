export const ACTIONS = {
  SELECT: `user-to-convert/select`,
  CLEAN_SELECTED_USER_TO_CONVERT: `user-to-convert/clean-selected`,
};

export const cleanUserToConvert = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_USER_TO_CONVERT,
    payload: {},
  });
};

export const setUserToConvert = (user) => async (dispatch) => {
  const payload = {
    identification: user.identification,
    first_name: user.firstName,
    second_name: user.secondName,
    first_surname: user.firstSurname,
    second_surname: user.secondSurname,
    mobile: user.mobile,
    telephone: user.telephone,
    work_phone: user.workPhone,
    email: user.email,
    nationality: user.nationality,
    sex: user.sex,
    country: user.country,
    level_instruction: user.levelInstruction,
    with_disabilities: user.withDisabilities,
    active: user.active,
  };

  dispatch({
    type: ACTIONS.SELECT,
    payload: { selectedUserToConvert: payload },
  });
  return true;
};
