import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { getList, deleteScratchOff } from '../../actions/scratchOff';
import { define, cleanDialog, show } from '../../actions/dialog';
import ScratchOffList from '../../components/ScratchOff';

export class ScratchOffListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
    const { getList, define } = this.props;
    getList().then(() => this.setState({ isLoading: false }));
    define('scratch off');
  };

  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  handleDeleteScratchOff = id => {
    const { getList, deleteScratchOff } = this.props;
    deleteScratchOff(id).then(res => getList());
  };

  render() {
    const { scratchOffs, history, show } = this.props;
    const { isLoading } = this.state;
    return (
      <ScratchOffList
        scratchOffs={scratchOffs}
        isLoading={isLoading}
        history={history}
        handleDeleteScratchOff={this.handleDeleteScratchOff}
        show={show}
      />
    );
  }
}

ScratchOffListContainer.propTypes = {
  scratchOffs: array,
  history: object.isRequired,
  getList: func.isRequired,
  deleteScratchOff: func.isRequired,
};

const mS = state => ({
  scratchOffs: state.scratchOffReducer.list,
});

const mD = {
  getList,
  deleteScratchOff,
  cleanDialog,
  define,
  show,
};

const ScratchOffListPage = connect(
  mS,
  mD,
)(ScratchOffListContainer);

export default ScratchOffListPage;
