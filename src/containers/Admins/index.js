import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteAdmin } from '../../actions/admin';
import AdminsList from '../../components/Admins';

export class AdminsListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const { getList, define } = this.props;
    getList().then(() => this.setState({ isLoading: false }));
    define('administrador');
  };

  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  handleDeleteAdmin = (id) => {
    const { getList, deleteAdmin } = this.props;
    deleteAdmin(id).then((res) => getList());
  };

  render() {
    const { admins, history, show } = this.props;
    const { isLoading } = this.state;
    return (
      <AdminsList
        admins={admins}
        isLoading={isLoading}
        history={history}
        handleAdminDetail={this.handleAdminDetail}
        handleDeleteAdmin={this.handleDeleteAdmin}
        show={show}
      />
    );
  }
}

AdminsListContainer.propTypes = {
  admins: array,
  history: object.isRequired,
  getList: func.isRequired,
  deleteAdmin: func.isRequired,
};

const mS = (state) => ({
  admins: state.adminReducer.list,
});

const mD = {
  getList,
  deleteAdmin,
  cleanDialog,
  define,
  show,
};

AdminsListContainer = connect(mS, mD)(AdminsListContainer);

export default AdminsListContainer;
