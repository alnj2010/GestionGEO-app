import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { getList, deleteQuestion } from '../../actions/question';
import { define, cleanDialog, show } from '../../actions/dialog';
import QuestionsList from '../../components/Questions';

class QuestionsListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
    const { getList, define } = this.props;
    getList().then(() => this.setState({ isLoading: false }));
    define('question');
  };

  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  handleDeleteQuestion = id => {
    const { getList, deleteQuestion } = this.props;
    deleteQuestion(id).then(res => getList());
  };

  render() {
    const { questions, history, show } = this.props;
    const { isLoading } = this.state;
    return (
      <QuestionsList
        questions={questions}
        isLoading={isLoading}
        history={history}
        handleQuestionDetail={this.handleQuestionDetail}
        handleDeleteQuestion={this.handleDeleteQuestion}
        show={show}
      />
    );
  }
}

QuestionsListContainer.propTypes = {
  questions: array,
  history: object.isRequired,
  getList: func.isRequired,
  deleteQuestion: func.isRequired,
  cleanDialog: func.isRequired,
  define: func.isRequired,
  show: func.isRequired,
};

const mS = state => ({
  questions: state.questionReducer.list,
});

const mD = {
  getList,
  deleteQuestion,
  cleanDialog,
  define,
  show,
};

const QuestionsListPage = connect(
  mS,
  mD,
)(QuestionsListContainer);

export default QuestionsListPage;
