import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteZipcode } from '../../actions/zipcode';
import ZipcodesList from '../../components/Zipcodes';

export class ZipcodesContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
      this.props.getList().then(() => this.setState({ isLoading: false }));
      define('zipcode');
  };
  componentWillUnmount = () => {
    this.props.cleanDialog();
  };
  handleDeleteZipcode = (id) => {
    const { getList, deleteZipcode } = this.props;
    deleteZipcode(id).then(res => getList());
  }

  render() {
    const { zipcodes, history, show } = this.props;
    const { isLoading } = this.state;

    return <ZipcodesList 
            zipcodes={zipcodes}
            isLoading={isLoading}
            history={history}
            handleDeleteZipcode={this.handleDeleteZipcode}
            show={show}
            />
   
  }
}

ZipcodesContainer.propTypes = {
    zipcodes: array,
    history: object.isRequired,
    getList: func.isRequired,
    deleteZipcode: func.isRequired,
};

const mS = state => ({
    zipcodes: state.zipcodeReducer.list,
});

const mD = {
    getList,
    deleteZipcode,
    cleanDialog,
    define,
    show,
};

const ZipcodesPage = connect(
  mS,
  mD,
)(ZipcodesContainer);

export default ZipcodesPage;
