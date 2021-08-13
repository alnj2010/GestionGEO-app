import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteAdmin, cleanGetList } from '../../actions/admin';
import { getConstance } from '../../actions/student';
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
    getListDispatch()
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false }));
    defineDispatch('administrador');
  };

  componentWillUnmount = () => {
    const { cleanDialogDispatch, cleanGetListDispatch } = this.props;
    cleanDialogDispatch();
    cleanGetListDispatch();
  };

  handleDeleteAdmin = (id) => {
    const { getListDispatch, deleteAdminDispatch } = this.props;
    deleteAdminDispatch(id).then(() => getListDispatch());
  };

  render() {
    const { admins, history, showDispatch, getConstanceDispatch } = this.props;
    const { isLoading } = this.state;
    return (
      <AdminsList
        admins={admins}
        getConstance={getConstanceDispatch}
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
  getConstanceDispatch: PropTypes.func.isRequired,
  deleteAdminDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  cleanGetListDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  showDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  admins: state.adminReducer.list,
});

const mD = {
  getListDispatch: getList,
  getConstanceDispatch: getConstance,
  deleteAdminDispatch: deleteAdmin,
  cleanDialogDispatch: cleanDialog,
  cleanGetListDispatch: cleanGetList,
  defineDispatch: define,
  showDispatch: show,
};

export default connect(mS, mD)(AdminsListContainer);
