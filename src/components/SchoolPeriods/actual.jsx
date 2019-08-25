import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
} from '@material-ui/core';
import * as moment from 'moment';
import { Form, reduxForm, change, submit, FieldArray, formValueSelector,Field } from 'redux-form';
import { object, func, bool} from 'prop-types';
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
  fab: {
    marginTop:50,
    margin: theme.spacing.unit,
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
  buttonSchedule:{
    marginTop: theme.spacing.unit,
    padding: 2,
    width: '22%',
  },
  button: {
    margin: theme.spacing.unit,
  },
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
});

class SchoolPeriodActual extends Component {
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
      saveSchoolPeriod,
      schoolPeriodId,
      pristine,
      submitting,
      valid,
      submit,
      startDate,
      endDate
    } = this.props;
    const { func } = this.state;
    const final=new Date(endDate);
    const today=new Date();
    let finishedPeriod=today>final;
    return (
    <Form onSubmit={handleSubmit(saveSchoolPeriod)}>
        <Grid container>
          <Grid item xs={12}>
            <h3> Periodo semestral actual</h3>
            <hr />
          </Grid>
          <Grid item xs={6} className={classes.form}>
            <Grid container>
                <Grid item xs={6}>Fecha inicial</Grid>
                <Grid item xs={6}>{startDate}</Grid>
                <RenderFields >{[
                    { label: 'Fecha Fin', field: 'endDate', id: 'endDate', type: 'date', minDate:(new Date()), disabled:startDate==='Invalid date' },
                    { label: 'Habilitar inscripcion', field: 'incriptionVisible', id: 'incriptionVisible', type: 'switch',disabled:finishedPeriod, checked:!finishedPeriod },
                    { label: 'Habilitar cargar notas', field: 'loadNotes', id: 'loadNotes', type: 'switch' },
                ]}</RenderFields>
                <Field component="input" name="endSchoolPeriod" value={finishedPeriod} type="hidden" style={{ height: 0 }} />
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer}>
                  <Grid item xs={4}/>     
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      className={classes.save}
                      onClick={() =>
                        schoolPeriodId
                          ? this.handleDialogShow('actualizar', submit)
                          : submit('schoolPeriod')
                      }
                      disabled={!valid || pristine || submitting}
                    >
                      Guardar Cambios
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

SchoolPeriodActual.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  saveSchoolPeriod: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
};

const schoolPeriodValidation = values => {
  const errors = {};

  return errors;
};

SchoolPeriodActual = reduxForm({
  form: 'schoolPeriodActual',
  validate: schoolPeriodValidation,
  enableReinitialize: true,
})(SchoolPeriodActual);
const selector = formValueSelector('schoolPeriodActual');
SchoolPeriodActual = connect(
  state => ({
    initialValues: {
        endDate: state.schoolPeriodReducer.list.length ? moment(
            new Date(state.schoolPeriodReducer.list[0].end_date),
          ).format('YYYY-MM-DD') : 'Invalid date',
        incriptionVisible:state.schoolPeriodReducer.list.length ? state.schoolPeriodReducer.list[0].incription_visible:false,
        loadNotes:state.schoolPeriodReducer.list.length ? state.schoolPeriodReducer.list[0].load_notes:false,
        endSchoolPeriod:state.schoolPeriodReducer.list.length ? state.schoolPeriodReducer.list[0].end_school_period:false,
    },
    action: state.dialogReducer.action,
    endSchoolPeriod: selector(state, 'endSchoolPeriod'),

  }),
  { change, show, submit },
)(SchoolPeriodActual);

export default withStyles(styles)(SchoolPeriodActual);
