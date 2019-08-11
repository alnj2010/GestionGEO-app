import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { Form, reduxForm, change, submit } from 'redux-form';
import { object, func, bool, string } from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';

import RenderFields from '../RenderFields'

const styles = theme => ({
  inputLabel: {
    paddingTop: '4%',
  },
  input: {
    alignSelf: 'center',
  },
  form: {
    paddingLeft: '5%',
  },
  largeIcon: {
    width: '36.5%',
    height: '36.5%',
    cursor: 'pointer',
  },
  profilePhoto: {
    width: 360,
    height: 360,
    cursor: 'pointer',
  },
  buttonContainer: { paddingTop: '2%' },
  save: {
    color: 'white',
    backgroundColor: '#61A956',
    '&:hover': {
      backgroundColor: 'rgb(78, 127, 71)',
    },
  },
  fileInput: {
    display: 'none',
  },
  date: { boxSizing: 'content-box', paddingTop: '4%' },
  lastSave: { justifyContent: 'flex-end', display: 'flex' },
  error: {
    color: 'red',
  },
  checkbox: {
    padding: 0,
    paddingTop: '6%',
  },
});

class QuestionDetail extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  handleDialogShow = (action, func) => {
    this.setState({ func: func }, () => {
      this.props.show(action);
    });
  };

  render = () => {
    const {
      classes,
      handleSubmit,
      goBack,
      questionId,
      handleQuestionDelete,
      pristine,
      submitting,
      valid,
      submit,
    } = this.props;
    const { func } = this.state;
    return (
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <h3> {questionId ? `Question: ${questionId}` : 'New Question'}</h3>
            <hr />
          </Grid>
          <Grid item xs={6} className={classes.form}>
            <Grid container>
              <RenderFields >{[
                { label: 'Title', field: 'title', id: 'title', type: 'text' },
                { label: 'Question', field: 'question', id: 'question', type: 'text' },
                { label: 'Option 1', field: 'firstOption', id: 'first-option', type: 'text' },
                { label: 'Option 2', field: 'secondOption', id: 'second-option', type: 'text' },
              ]}</RenderFields>
            </Grid>
          </Grid>
          <Grid item xs={6} className={classes.form}>
            <Grid container>
            <RenderFields >{[
              { label: 'Option 3', field: 'thirdOption', id: 'third-option', type: 'text' },
              { label: 'Option 4', field: 'fourthOption', id: 'fourth-option', type: 'text' },
              { label: 'Answer', field: 'answer', id: 'answer', type: 'text' },
              { label: 'Level', field: 'level', id: 'level', type: 'select', options: [
                  { key: '1', value: 1 },
                  { key: '2', value: 2 },
                  { key: '3', value: 3 },
                  { key: '4', value: 4 },
                ] },
            ]}</RenderFields>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer}>
                  <Grid item xs={4}>
                    <Button variant="contained" onClick={goBack}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    {questionId ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          this.handleDialogShow('delete', handleQuestionDelete)
                        }
                      >
                        Delete
                      </Button>
                    ) : null}
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      className={classes.save}
                      onClick={() =>
                        questionId
                          ? this.handleDialogShow('update', submit)
                          : submit('question')
                      }
                      disabled={!valid || pristine || submitting}
                    >
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Dialog handleAgree={func} />
      </Form>
    );
  };
}

QuestionDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  goBack: func.isRequired,
  questionId: string,
  handleQuestionDelete: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
};

const questionValidation = values => {
  const errors = {};
  if (!values.title) errors.title = 'Title is required';

  if (!values.question) errors.question = 'Question is required';

  if (!values.firstOption) errors.firstOption = 'First option is required';

  if (!values.secondOption) errors.secondOption = 'Second option is required';

  if (!values.thirdOption) errors.thirdOption = 'Third option is required';

  if (!values.fourthOption) errors.fourthOption = 'Fourth option is required';

  if (!values.answer) errors.answer = 'Answer is required';
  else if (
    values.answer !== values.firstOption &&
    values.answer !== values.secondOption &&
    values.answer !== values.thirdOption &&
    values.answer !== values.fourthOption
  )
    errors.answer = 'Answer should be one of the options';
  if (!values.level) errors.level = 'Level is required';

  return errors;
};

QuestionDetail = reduxForm({
  form: 'question',
  validate: questionValidation,
  enableReinitialize: true,
})(QuestionDetail);

QuestionDetail = connect(
  state => ({
    initialValues: {
      title: state.questionReducer.selectedQuestion.title,
      question: state.questionReducer.selectedQuestion.text,
      answer: state.questionReducer.selectedQuestion.answer,
      level: state.questionReducer.selectedQuestion.level,
      firstOption: state.questionReducer.selectedQuestion.alternatives
        ? state.questionReducer.selectedQuestion.alternatives.text[0]
        : '',
      secondOption: state.questionReducer.selectedQuestion.alternatives
        ? state.questionReducer.selectedQuestion.alternatives.text[1]
        : '',
      thirdOption: state.questionReducer.selectedQuestion.alternatives
        ? state.questionReducer.selectedQuestion.alternatives.text[2]
        : '',
      fourthOption: state.questionReducer.selectedQuestion.alternatives
        ? state.questionReducer.selectedQuestion.alternatives.text[3]
        : '',
    },
    action: state.dialogReducer.action,
  }),
  { change, show, submit },
)(QuestionDetail);

export default withStyles(styles)(QuestionDetail);
