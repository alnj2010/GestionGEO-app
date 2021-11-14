import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  findAdminById,
  updateAdmin,
  deleteAdmin,
  cleanSelectedAdmin,
  saveAdmin,
} from '../../actions/admin';
import { restorePassword } from '../../actions/user';
import { cleanUserToConvert, setUserToConvert } from '../../actions/userToConvert';
import AdminDetail from '../../components/Admins/detail';
import { define, cleanDialog } from '../../actions/dialog';
import {
  getSessionUser,
  getSessionIsMainUser,
  removeSessionGeoToken,
} from '../../storage/sessionStorage';

import { COORDINATOR_ROL } from '../../services/constants';

class AdminDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findAdminByIdDispatch, defineDispatch } = this.props;
    if (match.params.id) findAdminByIdDispatch(match.params.id);
    defineDispatch('administrador');
  };

  componentWillReceiveProps(nextProps) {
    const {
      match,
      findAdminByIdDispatch,
      defineDispatch,
      cleanSelectedAdminDispatch,
      cleanDialogDispatch,
    } = this.props;
    if (nextProps.match.params.id !== match.params.id) {
      cleanSelectedAdminDispatch();
      cleanDialogDispatch();
      findAdminByIdDispatch(nextProps.match.params.id);
      defineDispatch('administrador');
    }
  }

  componentWillUnmount = () => {
    const {
      cleanSelectedAdminDispatch,
      cleanDialogDispatch,
      cleanUserToConvertDispatch,
      match,
    } = this.props;
    cleanSelectedAdminDispatch();
    cleanDialogDispatch();
    if (!match.params.id) cleanUserToConvertDispatch();
  };

  saveAdmin = (values) => {
    const {
      match,
      updateAdminDispatch,
      findAdminByIdDispatch,
      saveAdminDispatch,
      history,
    } = this.props;
    const payload = { ...values };

    if (match.params.id) {
      updateAdminDispatch({ ...payload, ...match.params }).then(() => {
        const {
          administrator: { rol: rolSesionActual },
        } = getSessionUser();
        const isMain = getSessionIsMainUser() === 'true';
        if (
          rolSesionActual === COORDINATOR_ROL.COORDINADOR &&
          isMain &&
          values.principal &&
          values.rol === COORDINATOR_ROL.COORDINADOR
        ) {
          removeSessionGeoToken();
          history.push('/');
        }
      });
    } else
      saveAdminDispatch({ ...payload }).then((response) => {
        if (response) {
          findAdminByIdDispatch(response).then(() => history.push(`modificar/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.push('/usuarios/administradores');
  };

  convertUserTo = ({ userType, userData }) => {
    const { history, setUserToConvertDispatch } = this.props;
    setUserToConvertDispatch(userData);
    history.push(`/usuarios/${userType}/agregar`);
  };

  handleAdminDelete = () => {
    const { deleteAdminDispatch, history, match } = this.props;
    deleteAdminDispatch(match.params.id).then(() => history.push('/usuarios/administradores'));
  };

  handleRestoreUser = () => {
    const { restorePasswordDispatch, match } = this.props;
    restorePasswordDispatch(match.params.id);
  };

  render() {
    const { admin, match } = this.props;
    return (
      <AdminDetail
        convertUserTo={this.convertUserTo}
        admin={admin}
        saveAdmin={this.saveAdmin}
        goBack={this.goBack}
        adminId={match.params.id}
        handleRestoreUser={this.handleRestoreUser}
        handleAdminDelete={this.handleAdminDelete}
      />
    );
  }
}

AdminDetailContainer.propTypes = {
  admin: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  }).isRequired,

  updateAdminDispatch: PropTypes.func.isRequired,
  findAdminByIdDispatch: PropTypes.func.isRequired,
  saveAdminDispatch: PropTypes.func.isRequired,
  deleteAdminDispatch: PropTypes.func.isRequired,
  cleanSelectedAdminDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  cleanUserToConvertDispatch: PropTypes.func.isRequired,
  restorePasswordDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  setUserToConvertDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  admin: state.adminReducer.selectedAdmin,
});

const mD = {
  findAdminByIdDispatch: findAdminById,
  updateAdminDispatch: updateAdmin,
  saveAdminDispatch: saveAdmin,
  deleteAdminDispatch: deleteAdmin,
  defineDispatch: define,
  cleanSelectedAdminDispatch: cleanSelectedAdmin,
  cleanDialogDispatch: cleanDialog,
  restorePasswordDispatch: restorePassword,
  cleanUserToConvertDispatch: cleanUserToConvert,
  setUserToConvertDispatch: setUserToConvert,
};

export default connect(mS, mD)(AdminDetailContainer);
