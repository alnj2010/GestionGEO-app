import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { findMiPerfil, updateMiPerfil, cleanSelectedMiPerfil } from '../../actions/miPerfil';
import MiPerfil from '../../components/MiPerfil';
import { define, cleanDialog } from '../../actions/dialog';

export class MiPerfilContainer extends Component {
  componentDidMount = () => {
    this.props.findMiPerfil();
    this.props.define('perfil');
  };

  componentWillUnmount = () => {
    this.props.cleanSelectedMiPerfil();
    this.props.cleanDialog();
  };

  updateMiPerfil = (values) => {
    const { updateMiPerfil } = this.props;
    updateMiPerfil(values);
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { miPerfil } = this.props;
    return (
      <MiPerfil
        updateMiPerfil={this.updateMiPerfil}
        goBack={this.goBack}
        miPerfilId={miPerfil.id}
        miPerfil={miPerfil}
      />
    );
  }
}

MiPerfilContainer.propTypes = {
  history: object.isRequired,
  match: object.isRequired,
  updateMiPerfil: func.isRequired,
  findMiPerfil: func.isRequired,
};

const mS = (state) => ({
  miPerfil: state.miPerfilReducer.selectedMiPerfil,
});

const mD = {
  findMiPerfil,
  updateMiPerfil,
  define,
  cleanSelectedMiPerfil,
  cleanDialog,
};

MiPerfilContainer = connect(mS, mD)(MiPerfilContainer);

export default MiPerfilContainer;
