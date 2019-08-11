import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { getList, deletePhase } from '../../actions/initialPhase';
import { define, cleanDialog, show } from '../../actions/dialog';
import PhasesList from '../../components/InitialPhase';

export class PhasesListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
    const { getList, define } = this.props;
    getList().then(() => this.setState({ isLoading: false }));
    define('Phase');
  };

  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  handleDeletePhase = id => {
    const { getList, deletePhase } = this.props;
    deletePhase(id).then(res => getList());
  };

  render() {
    const { phases, history, show } = this.props;
    const { isLoading } = this.state;
    return (
      <PhasesList
        phases={phases}
        isLoading={isLoading}
        history={history}
        handlePhaseDetail={this.handlePhaseDetail}
        handleDeletePhase={this.handleDeletePhase}
        show={show}
      />
    );
  }
}

PhasesListContainer.propTypes = {
  phases: array,
  history: object.isRequired,
  getList: func.isRequired,
  deletePhase: func.isRequired,
};

const mS = state => ({
  phases: state.initialPhaseReducer.list,
});

const mD = {
  getList,
  deletePhase,
  cleanDialog,
  define,
  show,
};

const PhasesListPage = connect(
  mS,
  mD,
)(PhasesListContainer);

export default PhasesListPage;
