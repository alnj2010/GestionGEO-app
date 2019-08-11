import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, change, reset } from 'redux-form';
import QuestionDetail from '../../components/Questions/detail';
import {
  saveQuestion,
  findQuestionById,
  cleanSelectedQuestion,
  deleteQuestion,
  updateQuestion,
} from '../../actions/question';
import { define, cleanDialog } from '../../actions/dialog';

export class QuestionDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findQuestionById, define } = this.props;
    if (match && match.params.id) findQuestionById(match.params.id);
    if (match) define('question');
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedQuestion();
  };

  handleSaveQuestion = values => {
    const {
      history,
      match,
      findQuestionById,
      updateQuestion,
      saveQuestion,
      trivia,
      triviaQuestionLevels,
      triviaQuestions,
      cleanSelectedQuestion,
      change,
      reset,
    } = this.props;
    if (!trivia && match.params.id)
      updateQuestion({ ...values, ...match.params }).then(res =>
        findQuestionById(match.params.id),
      );
    else
      saveQuestion({ ...values }).then(response => {
        if (response) {
          if (trivia) {
            findQuestionById(response).then(res => {
              if (
                triviaQuestionLevels.filter(
                  trivQuestion => trivQuestion.value === res.level,
                ).length > 0
              ) {
                const questions = [...triviaQuestions];
                questions.push({
                  value: res.id,
                  label: `${res.title} - level ${res.level}`,
                  ...res,
                });
                change('trivia', 'questions', questions);
              }
              if (values.create) {
                cleanSelectedQuestion();
                reset('question');
              } else trivia.setState({ addQuestion: false });
            });
          } else {
            if (values.create) {
              cleanSelectedQuestion();
              reset('question');
            } else
              findQuestionById(response).then(res =>
                history.push(`edit/${response}`),
              );
          }
        }
      });
  };

  goBack = () => {
    const { history, trivia } = this.props;
    if (trivia) trivia.setState({ addQuestion: false });
    else history.goBack();
  };

  handleQuestionDelete = () => {
    const { deleteQuestion, history, match } = this.props;
    deleteQuestion(match.params.id).then(res => history.push('/questions'));
  };
  render() {
    const {
      question: { id, questionBrands },
    } = this.props;
    return (
      <QuestionDetail
        onSubmit={this.handleSaveQuestion}
        goBack={this.goBack}
        questionId={id}
        handleQuestionDelete={this.handleQuestionDelete}
        questionBrands={questionBrands}
      />
    );
  }
}

QuestionDetailContainer.propTypes = {
  deleteQuestion: func.isRequired,
  history: object,
  match: object,
  findQuestionById: func.isRequired,
  updateQuestion: func.isRequired,
  saveQuestion: func.isRequired,
};

const mS = state => ({
  question: state.questionReducer.selectedQuestion,
  triviaQuestions: selector(state, 'questions'),
  triviaQuestionLevels: selector(state, 'levels'),
});

const mD = {
  saveQuestion,
  findQuestionById,
  cleanSelectedQuestion,
  deleteQuestion,
  updateQuestion,
  define,
  cleanDialog,
  change,
  reset,
};

const selector = formValueSelector('trivia');
QuestionDetailContainer = connect(
  mS,
  mD,
)(QuestionDetailContainer);

export default QuestionDetailContainer;
