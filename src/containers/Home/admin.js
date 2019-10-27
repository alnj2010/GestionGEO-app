import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminHome from '../../components/Home/admin'

export class AdminHomeContainer extends Component {
  componentDidMount = () => {
  };
  componentWillUnmount = () => {
  };

  render() {
    const {
    } = this.props;

    return (
        <AdminHome/>
    );
  }
}

AdminHomeContainer.propTypes = {

};

const mS = state => ({
});

const mD = {

};

AdminHomeContainer = connect(
  mS,
  mD,
)(AdminHomeContainer);

export default AdminHomeContainer;
