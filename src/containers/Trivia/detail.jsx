import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import TriviaDetail from '../../components/Trivia/detail';
import {
  saveTrivia,
  findTriviaById,
  cleanSelectedTrivia,
  deleteTrivia,
  updateTrivia,
  getCategoryList,
} from '../../actions/minigame';
import {
  getList as getQuestionsList,
  getListByName as getQuestionsListByName,
} from '../../actions/question';
import { define, cleanDialog } from '../../actions/dialog';

export class TriviaDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findTriviaById, define, getCategoryList } = this.props;
    if (match && match.params.id) findTriviaById(match.params.id);
    getCategoryList();
    if (match) define('trivia');
  };

  componentWillUnmount = () => {
    this.props.cleanSelectedTrivia();
  };

  handleSaveTrivia = values => {
    const {
      history,
      match,
      findTriviaById,
      updateTrivia,
      saveTrivia,
    } = this.props;
    if (match.params.id)
      updateTrivia({ ...values, ...match.params }).then(res => {
        if (res) findTriviaById(match.params.id);
      });
    else
      saveTrivia({ ...values }).then(response => {
        if (response)
          findTriviaById(response).then(res =>
            history.push(`edit/${response}`),
          );
      });
  };

  loadQuestionOptions = (value, callback) => {
    const {
      getQuestionsList,
      getQuestionsListByName,
      selectedLevels,
    } = this.props;
    if (value)
      return getQuestionsListByName(value).then(res => {
        const questions = res.filter(question => {
          if (
            selectedLevels.filter(
              selectedLevel => selectedLevel.value === question.level,
            ).length > 0
          )
            return true;
          return false;
        });
        callback(
          questions.map(question => {
            return {
              label: `${question.title} - level ${question.level}`,
              value: question.id,
              ...question,
            };
          }),
        );
      });
    else
      return getQuestionsList().then(res => {
        const questions = res.map(question => {
          return { label: question.title, value: question.id };
        });
        callback(questions);
      });
  };

  loadLevelOptions = (value, callback) => {
    callback(
      [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
      ].filter(level => !value || level.label === value),
    );
  };

  goBack = () => {
    const { history, trivia } = this.props;
    if (trivia) trivia.setState({ addTrivia: false });
    else history.goBack();
  };

  handleTriviaDelete = () => {
    const { deleteTrivia, history, match } = this.props;
    deleteTrivia(match.params.id).then(res => history.push('/minigame/trivia'));
  };
  render() {
    const {
      trivia: { id },
      history,
      categories,
    } = this.props;
    return (
      <TriviaDetail
        onSubmit={this.handleSaveTrivia}
        goBack={this.goBack}
        triviaId={id}
        handleTriviaDelete={this.handleTriviaDelete}
        history={history}
        categories={categories}
        loadQuestionOptions={this.loadQuestionOptions}
        loadLevelOptions={this.loadLevelOptions}
      />
    );
  }
}

TriviaDetailContainer.propTypes = {
  deleteTrivia: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  findTriviaById: func.isRequired,
  updateTrivia: func.isRequired,
  saveTrivia: func.isRequired,
};

const selector = formValueSelector('trivia');
const mS = state => ({
  trivia: state.minigameReducer.selectedTrivia,
  categories: state.minigameReducer.categoryList,
  selectedLevels: selector(state, 'levels'),
});

const mD = {
  saveTrivia,
  findTriviaById,
  cleanSelectedTrivia,
  deleteTrivia,
  updateTrivia,
  define,
  cleanDialog,
  getCategoryList,
  getQuestionsList,
  getQuestionsListByName,
};

TriviaDetailContainer = connect(
  mS,
  mD,
)(TriviaDetailContainer);

export default TriviaDetailContainer;
