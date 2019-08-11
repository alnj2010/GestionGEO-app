import React, { Component } from 'react';
import CategoriesList from '../../components/Categories';
import { array, func } from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteCategory } from '../../actions/category';

class CategoriesContainer extends Component {
  componentDidMount = () => {
    const { getList, define } = this.props;
    getList();
    define('category');
  };

  handleDeleteCategory = id => {
    const { getList, deleteCategory } = this.props;
    deleteCategory(id).then(res => getList());
  };

  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  render = () => {
    const { history, categories, show } = this.props;
    return (
      <CategoriesList
        categories={categories}
        isLoading={false}
        handleDeleteCategory={this.handleDeleteCategory}
        history={history}
        show={show}
      />
    );
  };
}

CategoriesContainer.propTypes = {
  categories: array,
  getList: func.isRequired,
  deleteCategory: func.isRequired,
};

const mS = state => ({
  categories: state.categoryReducer.list,
});

const mD = {
  getList,
  deleteCategory,
  cleanDialog,
  define,
  show,
};

CategoriesContainer = connect(
  mS,
  mD,
)(CategoriesContainer);

export default CategoriesContainer;
