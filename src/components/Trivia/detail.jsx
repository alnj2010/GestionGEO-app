import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  Grid,
  Typography,
  withStyles,
  TextField,
  MenuItem,
  Paper,
  Chip,
  Button,
  Fab,
} from '@material-ui/core';
import {
  Form,
  Field,
  reduxForm,
  change,
  submit,
  formValueSelector,
} from 'redux-form';
import Add from '@material-ui/icons/Add';

import MultiSelect from 'react-select/lib/Async';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import QuestionsList from '../Questions';
import QuestionDetail from '../../containers/Questions/detail';
import Dialog from '../Dialog';
import { show, define } from '../../actions/dialog';
import RenderFields from '../RenderFields'

const styles = theme => ({
  inputLabel: {
    paddingTop: '4%',
  },
  input: {
    alignSelf: 'center',
  },
  error: {
    color: 'red',
  },
  root: {
    flexGrow: 1,
    height: 250,
  },
  inputSelect: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1000,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  save: {
    color: 'white',
    backgroundColor: '#61A956',
    '&:hover': {
      backgroundColor: 'rgb(78, 127, 71)',
    },
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.inputSelect,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class TriviaDetail extends Component {
  state = {
    addQuestion: false,
    func: null,
    questionsToDelete: [],
    levelToDelete: {},
  };
  renderMultiSelect = params => {
    const { classes, theme } = this.props;
    const { name, value, onBlur, onChange, onFocus } = params.input;
    const {
      meta: { touched, error },
    } = params;
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };
    return (
      <Grid container>
        <Grid item xs={12} className={classes.input}>
          <MultiSelect
            name={name}
            value={value}
            onChange={params.changeHandler(onChange)}
            onBlur={() => onBlur(value)}
            onFocus={onFocus}
            classes={classes}
            styles={selectStyles}
            textFieldProps={{
              InputLabelProps: {
                shrink: true,
              },
            }}
            loadOptions={params.loadOptions}
            defaultOptions={params.default}
            components={components}
            placeholder={params.placeholder}
            isMulti
          />
        </Grid>
        <Grid item xs={6}>
          {touched && error && <span className={classes.error}>{error}</span>}
        </Grid>
      </Grid>
    );
  };
  multiLevelsChangeHandler = func => {
    return (values, state) => {
      const { triviaQuestions, define } = this.props;
      if (state.action === 'remove-value' && triviaQuestions) {
        const questions = triviaQuestions.filter(
          question => question.level !== state.removedValue.value,
        );
        if (questions.length !== triviaQuestions.length) {
          define('level');
          this.setState(
            {
              questionsToDelete: questions,
              levelToDelete: state.removedValue.value,
            },
            this.handleDialogShow('delete', this.handleLevelDelete),
          );
        } else
          func(
            values.map(value => {
              return { value: value.value, label: value.label, ...value };
            }),
          );
      } else
        func(
          values.map(value => {
            return { value: value.value, label: value.label, ...value };
          }),
        );
    };
  };

  multiQuestionsChangeHandler = func => {
    return function handleMultiHandler(values) {
      func(
        values.map(value => {
          return { value: value.value, label: value.label, ...value };
        }),
      );
    };
  };

  handleDialogShow = (action, func) => {
    this.setState({ func: func }, () => {
      this.props.show(action);
    });
  };

  handleLevelDelete = () => {
    const { questionsToDelete, levelToDelete } = this.state;
    const { change, selectedLevels, define } = this.props;
    change(
      'levels',
      selectedLevels.filter(level => level.value !== levelToDelete),
    );
    change('questions', questionsToDelete);
    define('trivia');
  };

  render = () => {
    const {
      triviaId,
      classes,
      goBack,
      handleTriviaDelete,
      valid,
      pristine,
      submit,
      submitting,
      handleSubmit,
      loadLevelOptions,
      loadQuestionOptions,
      triviaQuestions,
      categories
    } = this.props;
    const { addQuestion, func } = this.state;
    return (
      <Fragment>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <h3> {triviaId ? `Trivia: ${triviaId}` : 'New Trivia'}</h3>
                  <hr />
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <RenderFields >{[
                        { label: 'Title', field: 'title', id: 'title', type: 'text'},
                        { label: 'Category', field: 'category', id: 'category', type: 'select', 
                          options: categories.map(category => ({ key: category.name, value: category.id }))
                        },
                        { label: 'Level', field: 'level', id: 'level', type: 'select', 
                          options: [
                            { value: 1, key: '1' },
                            { value: 2, key: '2' },
                            { value: 3, key: '3' },
                            { value: 4, key: '4' },
                          ]
                        },
                        { label: 'Timer (secs)', field: 'time', id: 'time', type: 'text'}
                    ]}</RenderFields>
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={12} className={classes.inputLabel}>
                      <Typography variant="subheading" gutterBottom>
                        <b>Prizes</b>
                      </Typography>
                    </Grid>
                    <RenderFields >{[
                        { label: 'Coins (per question)', field: 'coins', id: 'coins', type: 'text'},
                        { label: 'Doubloons', field: 'doubloons', id: 'doubloons', type: 'text'}
                    ]}</RenderFields>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <h3> Questions</h3>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={16}>
                    <Grid item xs={12}>
                      <Field
                        name="levels"
                        component={this.renderMultiSelect}
                        id="levels"
                        label="levels"
                        placeholder="Select multiple levels"
                        loadOptions={loadLevelOptions}
                        default={true}
                        changeHandler={this.multiLevelsChangeHandler}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="questions"
                        component={this.renderMultiSelect}
                        id="questions"
                        label="questions"
                        placeholder="Select multiple questions"
                        loadOptions={loadQuestionOptions}
                        default={false}
                        changeHandler={this.multiQuestionsChangeHandler}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container className={classes.buttonContainer}>
                    <Grid item xs={4}>
                      <Button variant="contained" onClick={goBack}>
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      {triviaId ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() =>
                            this.handleDialogShow('delete', handleTriviaDelete)
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
                          triviaId
                            ? this.handleDialogShow('update', submit)
                            : submit('trivia')
                        }
                        disabled={!valid || pristine || submitting}
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Grid>
          {addQuestion ? (
            <QuestionDetail trivia={this} />
          ) : (
            <Grid item xs={12}>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="Add"
                onClick={() => this.setState({ addQuestion: true })}
              >
                <Add />
                Add New Question
              </Fab>
            </Grid>
          )}

          <Grid item xs={12}>
            <QuestionsList
              questions={triviaQuestions}
              isLoading={false}
              noActions={true}
            />
          </Grid>
        </Grid>
        <Dialog handleAgree={func} />
      </Fragment>
    );
  };
}
const triviaValidation = values => {
  const errors = {};
  if (!values.title) errors.title = 'Title is required';
  if (!values.category) errors.category = 'Category is required';
  if (!values.level) errors.level = 'Level is required';
  if (!values.time) errors.time = 'Time is required';
  else if (!/^([\d])+$/.test(values.time))
    errors.time = 'Time must not contain letters';
  if (!values.coins && !values.doubloons) {
    errors.coins = 'Coins or Doubloons are required';
    errors.doubloons = 'Coins or Doubloons are required';
  }
  if (values.coins && !/^([\d])+$/.test(values.coins))
    errors.coins = 'Coins must not contain letters';
  if (values.doubloons && !/^([\d])+$/.test(values.doubloons))
    errors.doubloons = 'Doubloons must not contain letters';
  if (!values.questions) errors.questions = 'Questions are required';
  else if (values.questions.length < 1)
    errors.questions = 'Questions are required';
  else if (values.questions.length > 20)
    errors.questions = 'Trivia has a maximum of 20 questions';
  return errors;
};
const selector = formValueSelector('trivia');
TriviaDetail = reduxForm({
  form: 'trivia',
  validate: triviaValidation,
  enableReinitialize: true,
})(TriviaDetail);

TriviaDetail = connect(
  state => ({
    initialValues: {
      title: state.minigameReducer.selectedTrivia.name,
      level: state.minigameReducer.selectedTrivia.level,
      time: state.minigameReducer.selectedTrivia.time,
      coins: state.minigameReducer.selectedTrivia.coins,
      doubloons: state.minigameReducer.selectedTrivia.points,
      category: state.minigameReducer.selectedTrivia.category
        ? state.minigameReducer.selectedTrivia.category.id
        : null,
      questions: state.minigameReducer.selectedTrivia.questions
        ? state.minigameReducer.selectedTrivia.questions.map(question => {
            return {
              label: `${question.title} - level ${question.level}`,
              value: question.id,
              ...question,
            };
          })
        : [],
      levels: state.minigameReducer.selectedTrivia.questions
        ? [
            ...new Set(
              state.minigameReducer.selectedTrivia.questions.map(question => {
                return question.level;
              }),
            ),
          ].map(level => {
            return { label: `${level}`, value: level };
          })
        : null,
    },
    triviaQuestions: selector(state, 'questions'),
    selectedLevels: selector(state, 'levels'),
  }),
  { change, submit, show, define },
)(TriviaDetail);

export default withStyles(styles, { withTheme: true })(TriviaDetail);
