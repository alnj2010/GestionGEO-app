import React, { Component } from 'react';
import BrandsList from '../../components/Brands';
import { array, func } from 'prop-types';
import { connect } from 'react-redux';
import { getList, deleteBrand } from '../../actions/brand';
import { define, cleanDialog, show } from '../../actions/dialog';

class BrandsContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
    const { getList, define } = this.props;
    getList().then(() => this.setState({ isLoading: false }));
    define('brand');
  };

  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  handleDeleteBrand = id => {
    const { getList, deleteBrand } = this.props;
    deleteBrand(id).then(res => getList());
  };

  render = () => {
    const { history, brands, show } = this.props;
    const { isLoading } = this.state;
    return (
      <BrandsList
        brands={brands}
        isLoading={isLoading}
        handleDeleteBrand={this.handleDeleteBrand}
        history={history}
        show={show}
      />
    );
  };
}

BrandsContainer.propTypes = {
  brands: array,
  getList: func.isRequired,
  deleteBrand: func.isRequired,
};

const mS = state => ({
  brands: state.brandReducer.list,
});

const mD = {
  getList,
  deleteBrand,
  cleanDialog,
  define,
  show,
};

BrandsContainer = connect(
  mS,
  mD,
)(BrandsContainer);

export default BrandsContainer;
