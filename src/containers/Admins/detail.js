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
import AdminDetail from '../../components/Admins/detail';
import { define, cleanDialog } from '../../actions/dialog';

class AdminDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findAdminByIdDispatch, defineDispatch } = this.props;
    if (match.params.id) findAdminByIdDispatch(match.params.id);
    defineDispatch('administrador');
  };

  componentWillUnmount = () => {
    const { cleanSelectedAdminDispatch, cleanDialogDispatch } = this.props;
    cleanSelectedAdminDispatch();
    cleanDialogDispatch();
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

    if (match.params.id) updateAdminDispatch({ ...payload, ...match.params });
    else
      saveAdminDispatch({ ...payload }).then((response) => {
        if (response) {
          findAdminByIdDispatch(response).then(() => history.push(`edit/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleAdminDelete = () => {
    const { deleteAdminDispatch, history, match } = this.props;
    deleteAdminDispatch(match.params.id).then(() => history.push('/administradores'));
  };

  render() {
    const { admin } = this.props;
    return (
      <AdminDetail
        admin={admin}
        saveAdmin={this.saveAdmin}
        goBack={this.goBack}
        adminId={admin.id}
        handleAdminDelete={this.handleAdminDelete}
      />
    );
  }
}

AdminDetailContainer.propTypes = {
  admin: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,

  schoolPrograms: PropTypes.shape({}).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,

  updateAdminDispatch: PropTypes.func.isRequired,
  findAdminByIdDispatch: PropTypes.func.isRequired,
  saveAdminDispatch: PropTypes.func.isRequired,
  deleteAdminDispatch: PropTypes.func.isRequired,
  cleanSelectedAdminDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
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
};

export default connect(mS, mD)(AdminDetailContainer);
