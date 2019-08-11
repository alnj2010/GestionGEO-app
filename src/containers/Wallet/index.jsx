import React, { Component } from 'react';
import WalletList from '../../components/Wallet';
import { array, func } from 'prop-types';
import { connect } from 'react-redux';
import {
  getList,
  deleteWallet,
  saveWallet,
  updateWallet,
} from '../../actions/wallet';

class WalletsContainer extends Component {
  componentDidMount = () => {
    const { getList } = this.props;
    getList();
  };

  handleDelete = walletId => {
    const { getList, deleteWallet } = this.props;
    deleteWallet(walletId).then(res => getList());
  };

  handleAdd = data => {
    const { getList, saveWallet } = this.props;
    saveWallet(data).then(res => getList());
  };

  handleUpdate = data => {
    const { getList, updateWallet } = this.props;
    updateWallet(data).then(res => getList());
  };

  render = () => {
    const { packages } = this.props;
    return (
      <WalletList
        packages={packages}
        isLoading={false}
        handleDelete={this.handleDelete}
        handleAdd={this.handleAdd}
        handleUpdate={this.handleUpdate}
      />
    );
  };
}

WalletsContainer.propTypes = {
  packages: array,
  getList: func.isRequired,
  deleteWallet: func.isRequired,
  saveWallet: func.isRequired,
  updateWallet: func.isRequired,
};

const mS = state => ({
  packages: state.walletReducer.list,
});

const mD = {
  getList,
  deleteWallet,
  updateWallet,
  saveWallet,
};

WalletsContainer = connect(
  mS,
  mD,
)(WalletsContainer);

export default WalletsContainer;
