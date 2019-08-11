import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import CategoryDetail from '../../components/Categories/detail';
import {
  saveCategory,
  findCategoryById,
  cleanSelectedCategory,
  deleteCategory,
  updateAdminNotes,
  updateCategory,
} from '../../actions/category';
import { define, cleanDialog } from '../../actions/dialog';

export class CategoryDetailContainer extends Component {

  componentDidMount = () => {
    const { match, findCategoryById, define } = this.props;
    if (match.params.id) findCategoryById(match.params.id);
    define('category');
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedCategory();
    this.props.cleanDialog();
  };

  handleSaveCategory = values => {
    const {
      history,
      match,
      findCategoryById,
      updateCategory,
      saveCategory,
    } = this.props;
    if (match.params.id)
      updateCategory({ ...values, ...match.params }).then(res =>
        findCategoryById(match.params.id),
      );
    else
      saveCategory({ ...values }).then(response => {
        if (response) {
          findCategoryById(response).then(res =>
            history.push(`edit/${response}`),
          );
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleCategoryDelete = () => {
    const { deleteCategory, history, match } = this.props;
    deleteCategory(match.params.id).then(res => {
      if (res) history.push('/categories');
    });
  };


  saveAdminNotes = values => {
    const { match, updateAdminNotes } = this.props;
    updateAdminNotes({ ...values, id: match.params.id });
  };

  render() {
    const {
      category: { id, categoryBrands },
    } = this.props;
    return (
      <CategoryDetail
        handleSaveCategory={this.handleSaveCategory}
        goBack={this.goBack}
        categoryId={id}
        handleCategoryDelete={this.handleCategoryDelete}
        categoryBrands={categoryBrands}
        saveAdminNotes={this.saveAdminNotes}
      />
    );
  }
}

CategoryDetailContainer.propTypes = {
  deleteCategory: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  findCategoryById: func.isRequired,
  updateCategory: func.isRequired,
  saveCategory: func.isRequired,
};

const mS = state => ({
  category: state.categoryReducer.selectedCategory,
});

const mD = {
  saveCategory,
  findCategoryById,
  cleanSelectedCategory,
  deleteCategory,
  updateCategory,
  define,
  cleanDialog,
  updateAdminNotes,
};

CategoryDetailContainer = connect(
  mS,
  mD,
)(CategoryDetailContainer);

export default CategoryDetailContainer;
