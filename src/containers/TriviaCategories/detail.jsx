import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import TriviaCategoryDetail from '../../components/TriviaCategories/detail';
import {
  saveTriviaCategory,
  findTriviaCategoryById,
  cleanSelectedTriviaCategory,
  deleteTriviaCategory,
  updateTriviaCategory,
} from '../../actions/triviaCategory';
import { define, cleanDialog } from '../../actions/dialog';

export class TriviaCategoryDetailContainer extends Component {

  componentDidMount = () => {
    const { match, findTriviaCategoryById, define } = this.props;
    if (match.params.id) findTriviaCategoryById(match.params.id);
    define('trivia category');
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedTriviaCategory();
    this.props.cleanDialog();
  };

  handleSaveCategory = values => {
    const {
      history,
      match,
      findTriviaCategoryById,
      updateTriviaCategory,
      saveTriviaCategory,
    } = this.props;
    if (match.params.id)
      updateTriviaCategory({ ...values, ...match.params }).then(res =>
        findTriviaCategoryById(match.params.id),
      );
    else
      saveTriviaCategory({ ...values }).then(response => {
        if (response) {
          findTriviaCategoryById(response).then(res =>
            history.push(`edit/${response}`),
          );
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleTriviaCategoryDelete = () => {
    const { deleteTriviaCategory, history, match } = this.props;
    deleteTriviaCategory(match.params.id).then(res => {
      if (res) history.push('/trivia-categories');
    });
  };

  render() {
    const {
      triviaCategory: { id },
    } = this.props;
    
    return (
      <TriviaCategoryDetail
        handleSaveCategory={this.handleSaveCategory}
        goBack={this.goBack}
        categoryId={id}
        handleTriviaCategoryDelete={this.handleTriviaCategoryDelete}
      />
    );
  }
}

TriviaCategoryDetailContainer.propTypes = {
  deleteTriviaCategory: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  findTriviaCategoryById: func.isRequired,
  updateTriviaCategory: func.isRequired,
  saveTriviaCategory: func.isRequired,
};

const mS = state => ({
  triviaCategory: state.triviaCategoryReducer.selectedTriviaCategory,
});

const mD = {
  saveTriviaCategory,
  findTriviaCategoryById,
  cleanSelectedTriviaCategory,
  deleteTriviaCategory,
  updateTriviaCategory,
  define,
  cleanDialog,
};

TriviaCategoryDetailContainer = connect(
  mS,
  mD,
)(TriviaCategoryDetailContainer);

export default TriviaCategoryDetailContainer;
