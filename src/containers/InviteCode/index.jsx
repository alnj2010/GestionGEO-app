import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { getSetup, updateSetup } from '../../actions/inviteCode';
import InviteCodeForm from '../../components/InviteCode';
export class setupContainer extends Component {
  componentDidMount() {
    this.props.getSetup();
  }

  submit = values => {
    this.props.updateSetup(values).then(res => this.props.getSetup());
  };
  render() {
    return <InviteCodeForm onSubmit={this.submit} />;
  }
}

setupContainer.propTypes = {
  getSetup: func.isRequired,
  updateSetup: func.isRequired,
};

const mS = state => ({});

const mD = {
  getSetup,
  updateSetup,
};

const setupPage = connect(
  mS,
  mD,
)(setupContainer);

export default setupPage;
