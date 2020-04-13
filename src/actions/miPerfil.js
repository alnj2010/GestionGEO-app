import { MiPerfil } from '../services/miPerfil';
import { show } from './snackbar';
import { setSessionUser, getSessionUser } from '../storage/sessionStorage';

export const ACTIONS = {
    SELECT: `perfil/select`,
    CLEAN_SELECTED_PERFIL: `perfil/clean-selected`,
};

export const findMiPerfil = () => (dispatch) => {
    dispatch({
        type: ACTIONS.SELECT,
        payload: { selectedMiPerfil: MiPerfil.findMiPerfil() },
    });
    return true;
};

export const cleanSelectedMiPerfil = (id) => async (dispatch) => {
    dispatch({
        type: ACTIONS.CLEAN_SELECTED_PERFIL,
        payload: {},
    });
};

export const updateMiPerfil = (perfil) => async (dispatch) => {
    const payload = {
        identification: perfil.identification,
        first_name: perfil.firstName,
        second_name: perfil.secondName,
        first_surname: perfil.firstSurname,
        second_surname: perfil.secondSurname,
        mobile: perfil.mobile,
        telephone: perfil.telephone,
        work_phone: perfil.workPhone,
        email: perfil.email,
        sex: perfil.sex,
        nationality: perfil.nationality,
        level_instruction: perfil.levelInstruction,
    };
    return MiPerfil.update(payload)
        .then(() => {
            dispatch({
                type: ACTIONS.SELECT,
                payload: { selectedMiPerfil: payload },
            });
            show('Pefil actualizado', 'success')(dispatch);
            let value = getSessionUser();
            setSessionUser({ ...value, ...payload });
            return true;
        })
        .catch((error) => {
            show(error, 'error')(dispatch);
            return false;
        });
};

export const changePassword = (data) => async (dispatch) => {
    const payload = {
        id: getSessionUser().id,
        old_password: data.oldPassword,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
    };

    return MiPerfil.changePassword(payload)
        .then(() => {
            show('Pefil actualizado', 'success')(dispatch);
            return true;
        })
        .catch((error) => {
            show(error, 'error')(dispatch);
            return false;
        });
};
