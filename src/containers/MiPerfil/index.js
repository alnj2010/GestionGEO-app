import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findMiPerfil, updateMiPerfil, cleanSelectedMiPerfil } from '../../actions/miPerfil';
import MiPerfil from '../../components/MiPerfil';
import { define, cleanDialog } from '../../actions/dialog';

class MiPerfilContainer extends Component {
  componentDidMount = () => {
    const { findMiPerfilDispatch, defineDispatch } = this.props;
    findMiPerfilDispatch();
    defineDispatch('perfil');
  };

  componentWillUnmount = () => {
    const { cleanSelectedMiPerfilDispatch, cleanDialogDispatch } = this.props;
    cleanSelectedMiPerfilDispatch();
    cleanDialogDispatch();
  };

  updateMiPerfil = (values) => {
    const { updateMiPerfilDispatch } = this.props;
    updateMiPerfilDispatch(values);
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack('/administradores');
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
  miPerfil: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  }).isRequired,

  findMiPerfilDispatch: PropTypes.func.isRequired,
  updateMiPerfilDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  cleanSelectedMiPerfilDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  miPerfil: state.miPerfilReducer.selectedMiPerfil,
});

const mD = {
  findMiPerfilDispatch: findMiPerfil,
  updateMiPerfilDispatch: updateMiPerfil,
  defineDispatch: define,
  cleanSelectedMiPerfilDispatch: cleanSelectedMiPerfil,
  cleanDialogDispatch: cleanDialog,
};

export default connect(mS, mD)(MiPerfilContainer);
