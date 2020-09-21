import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteAdmin } from '../../actions/admin';
import AdminsList from '../../components/Admins';

class AdminsListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const { getListDispatch, defineDispatch } = this.props;
    getListDispatch().then(() => this.setState({ isLoading: false }));
    defineDispatch('administrador');
  };

  componentWillUnmount = () => {
    const { cleanDialogDispatch } = this.props;
    cleanDialogDispatch();
  };

  handleDeleteAdmin = (id) => {
    const { getListDispatch, deleteAdminDispatch } = this.props;
    deleteAdminDispatch(id).then(() => getListDispatch());
  };

  render() {
    const { admins, history, showDispatch } = this.props;
    const { isLoading } = this.state;
    return (
      <AdminsList
        admins={admins}
        isLoading={isLoading}
        history={history}
        handleAdminDetail={this.handleAdminDetail}
        handleDeleteAdmin={this.handleDeleteAdmin}
        show={showDispatch}
      />
    );
  }
}

AdminsListContainer.propTypes = {
  admins: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({}).isRequired,

  getListDispatch: PropTypes.func.isRequired,
  deleteAdminDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  showDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  admins: state.adminReducer.list,
});

const mD = {
  getListDispatch: getList,
  deleteAdminDispatch: deleteAdmin,
  cleanDialogDispatch: cleanDialog,
  defineDispatch: define,
  showDispatch: show,
};

export default connect(mS, mD)(AdminsListContainer);
