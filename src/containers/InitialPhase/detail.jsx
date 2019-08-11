import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import PhaseDetail from '../../components/InitialPhase/detail';
import {
  savePhase,
  findPhaseById,
  cleanSelectedPhase,
  deletePhase,
  updatePhase,
} from '../../actions/initialPhase';
import { define, cleanDialog } from '../../actions/dialog';

export class PhaseDetailContainer extends Component {
  constructor() {
    super();
    this.state = {
      photoAndroid: null,
      photoiOS: null,
      androidRatio: true,
      iOSRatio: true,
    };
  }
  componentDidMount = () => {
    const { match, findPhaseById, define } = this.props;
    if (match.params.id) findPhaseById(match.params.id);
    define('phase');
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedPhase();
    this.props.cleanDialog();
  };

  handleSavePhase = values => {
    const {
      history,
      match,
      findPhaseById,
      updatePhase,
      savePhase,
    } = this.props;
    const { photoAndroid, photoiOS, androidRatio, iOSRatio } = this.state;
    if (!androidRatio && !iOSRatio)
      throw new SubmissionError({
        photoAndroid: 'Please introduce a photo with a valid ratio of 16:9',
        photoiOS: 'Please introduce a photo with a valid ratio of 19.5:9',
        _error: 'Invalid ratio!',
      });
    else if (!androidRatio)
      throw new SubmissionError({
        photoAndroid: 'Please introduce a photo with a valid ratio of 16:9',
        _error: 'Invalid ratio!',
      });
    else if (!iOSRatio)
      throw new SubmissionError({
        photoiOS: 'Please introduce a photo with a valid ratio of 19.5:9',
        _error: 'Invalid ratio!',
      });
    if (match.params.id)
      updatePhase({ ...values, ...match.params, photoAndroid, photoiOS }).then(
        res => findPhaseById(match.params.id),
      );
    else
      savePhase({ ...values, photoAndroid, photoiOS }).then(response => {
        if (response) {
          findPhaseById(response).then(res => history.push(`edit/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handlePhaseDelete = () => {
    const { deletePhase, history, match } = this.props;
    deletePhase(match.params.id).then(res => history.push('/initial-phase'));
  };

  storePhoto = (system, file) => {
    if (system === 'android') this.setState({ photoAndroid: file });
    else this.setState({ photoiOS: file });
  };

  setRatio = (system, validRatio) => {
    if (system === 'android') this.setState({ androidRatio: validRatio });
    else this.setState({ iOSRatio: validRatio });
  };

  render() {
    const {
      phase: { id },
    } = this.props;
    return (
      <PhaseDetail
        handleSavePhase={this.handleSavePhase}
        goBack={this.goBack}
        phaseId={id}
        handlePhaseDelete={this.handlePhaseDelete}
        storePhoto={this.storePhoto}
        setRatio={this.setRatio}
      />
    );
  }
}

PhaseDetailContainer.propTypes = {
  deletePhase: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  findPhaseById: func.isRequired,
  updatePhase: func.isRequired,
  savePhase: func.isRequired,
};

const mS = state => ({
  phase: state.initialPhaseReducer.selectedPhase,
});

const mD = {
  savePhase,
  findPhaseById,
  cleanSelectedPhase,
  deletePhase,
  updatePhase,
  define,
  cleanDialog,
};

PhaseDetailContainer = connect(
  mS,
  mD,
)(PhaseDetailContainer);

export default PhaseDetailContainer;
