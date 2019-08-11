import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { change, reset } from 'redux-form';
import ScratchOffDetail from '../../components/ScratchOff/detail';
import {
  saveScratchOff,
  findScratchOffById,
  cleanSelectedScratchOff,
  deleteScratchOff,
  updateScratchOff
} from '../../actions/scratchOff';
import { show } from '../../actions/snackbar';
import { define, cleanDialog } from '../../actions/dialog';

export class ScratchOffDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findScratchOffById, define } = this.props;
    if (match && match.params.id) findScratchOffById(match.params.id);
    if (match) define('scratch off');
  };

  componentWillUnmount = () => {
    this.props.cleanSelectedScratchOff();
  };

  handleSaveScratchOff = values => {
    const {
      history,
      match,
      findScratchOffById,
      updateScratchOff,
      saveScratchOff,
    } = this.props;


    if (match.params.id)
      updateScratchOff({ ...values, ...match.params }).then(res =>
        findScratchOffById(match.params.id),
      );
    else
      saveScratchOff({ ...values }).then(response => {
        if (response) {
          findScratchOffById(response).then(res =>
            history.push(`edit/${response}`),
          );
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleScratchOffDelete = () => {
    const { deleteScratchOff, history, match } = this.props;
    deleteScratchOff(match.params.id).then(res =>
      history.push('/minigame/scratch-off'),
    );
  };

  render() {
    const { match } = this.props;

    return (
      <ScratchOffDetail
        onSubmit={this.handleSaveScratchOff}
        goBack={this.goBack}
        scratchOffId={match.params.id}
        handleScratchOffDelete={this.handleScratchOffDelete}
      />
    );
  }
}

ScratchOffDetailContainer.propTypes = {
  deleteScratchOff: func.isRequired,
  history: object,
  match: object,
  findScratchOffById: func.isRequired,
  updateScratchOff: func.isRequired,
  saveScratchOff: func.isRequired,
};

const mS = state => ({
});

const mD = {
  saveScratchOff,
  findScratchOffById,
  cleanSelectedScratchOff,
  deleteScratchOff,
  updateScratchOff,
  define,
  cleanDialog,
  change,
  reset,
  show,
};

ScratchOffDetailContainer = connect(
  mS,
  mD,
)(ScratchOffDetailContainer);

export default ScratchOffDetailContainer;
