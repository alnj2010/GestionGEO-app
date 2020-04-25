import React, { Component } from 'react';
import { func, object } from 'prop-types';
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

export class AdminDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findAdminById, define } = this.props;
    if (match.params.id) findAdminById(match.params.id);
    define('administrador');
  };

  componentWillUnmount = () => {
    this.props.cleanSelectedAdmin();
    this.props.cleanDialog();
  };

  saveAdmin = (values) => {
    const { match, updateAdmin, findAdminById, saveAdmin, history } = this.props;
    const payload = { ...values };

    if (match.params.id) updateAdmin({ ...payload, ...match.params });
    else
      saveAdmin({ ...payload }).then((response) => {
        if (response) {
          findAdminById(response).then((res) => history.push(`edit/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleAdminDelete = () => {
    const { deleteAdmin, history, match } = this.props;
    deleteAdmin(match.params.id).then((res) => history.push('/administradores'));
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
  deleteAdmin: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  updateAdmin: func.isRequired,
  findAdminById: func.isRequired,
  saveAdmin: func.isRequired,
};

const mS = (state) => ({
  admin: state.adminReducer.selectedAdmin,
});

const mD = {
  findAdminById,
  updateAdmin,
  saveAdmin,
  deleteAdmin,
  define,
  cleanSelectedAdmin,
  cleanDialog,
};

AdminDetailContainer = connect(mS, mD)(AdminDetailContainer);

export default AdminDetailContainer;
