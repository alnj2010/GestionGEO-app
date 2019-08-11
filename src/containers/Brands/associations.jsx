import React, { Component } from 'react';
import AssociationsList from '../../components/Brands/associations';
import { array, func } from 'prop-types';
import { connect } from 'react-redux';
import {
  getList,
  deleteBrandCategory,
  saveBrandCategory,
  updateBrandCategory,
} from '../../actions/brandsCategories';

import { getList as getListBrands } from '../../actions/brand';

import { getList as getListCategories } from '../../actions/category';

class BrandsAssociationsContainer extends Component {
  componentDidMount = () => {
    const { getList, getListBrands, getListCategories } = this.props;
    getList();
    getListBrands();
    getListCategories();
  };

  handleDelete = (categoryId, brandId) => {
    const { getList, deleteBrandCategory } = this.props;
    deleteBrandCategory(categoryId, brandId).then(res => getList());
  };

  handleAdd = data => {
    const { getList, saveBrandCategory } = this.props;
    saveBrandCategory(data).then(res => getList());
  };

  handleUpdate = data => {
    const { getList, updateBrandCategory } = this.props;
    updateBrandCategory(data).then(res => getList());
  };

  render = () => {
    const { brandsCategories, brands, categories } = this.props;
    return (
      <AssociationsList
        brandsCategories={brandsCategories}
        brands={brands}
        categories={categories}
        isLoading={false}
        handleDelete={this.handleDelete}
        handleAdd={this.handleAdd}
        handleUpdate={this.handleUpdate}
      />
    );
  };
}

BrandsAssociationsContainer.propTypes = {
  brands: array,
  brandsCategories: array,
  categories: array,
  getList: func.isRequired,
  deleteBrandCategory: func.isRequired,
  getListBrands: func.isRequired,
  getListCategories: func.isRequired,
  saveBrandCategory: func.isRequired,
  updateBrandCategory: func.isRequired,
};

const mS = state => ({
  brandsCategories: state.brandsCategories.list,
  brands: state.brandReducer.list,
  categories: state.categoryReducer.list,
});

const mD = {
  getList,
  getListBrands,
  getListCategories,
  deleteBrandCategory,
  saveBrandCategory,
  updateBrandCategory,
};

BrandsAssociationsContainer = connect(
  mS,
  mD,
)(BrandsAssociationsContainer);

export default BrandsAssociationsContainer;
