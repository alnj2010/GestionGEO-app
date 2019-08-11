import React, { Component } from 'react';
import TriviaCategoriesList from '../../components/TriviaCategories';
import { array, func } from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteTriviaCategory } from '../../actions/triviaCategory';

class TriviaCategoriesContainer extends Component {
  componentDidMount = () => {
    const { getList, define } = this.props;
    getList();
    define('trivia category');
  };

  handleDeleteTriviaCategory = id => {
    const { getList, deleteTriviaCategory } = this.props;
    deleteTriviaCategory(id).then(res => getList());
  };

  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  render = () => {
    const { history, triviaCategories, show } = this.props;
    return (
      <TriviaCategoriesList
        triviaCategories={triviaCategories}
        isLoading={false}
        handleDeleteTriviaCategory={this.handleDeleteTriviaCategory}
        history={history}
        show={show}
      />
    );
  };
}

TriviaCategoriesContainer.propTypes = {
  triviaCategories: array,
  getList: func.isRequired,
  deleteTriviaCategory: func.isRequired,
};

const mS = state => ({
  triviaCategories: state.triviaCategoryReducer.list,
});

const mD = {
  getList,
  deleteTriviaCategory,
  cleanDialog,
  define,
  show,
};

TriviaCategoriesContainer = connect(
  mS,
  mD,
)(TriviaCategoriesContainer);

export default TriviaCategoriesContainer;
