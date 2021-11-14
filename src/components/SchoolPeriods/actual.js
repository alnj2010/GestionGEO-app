import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Paper, CircularProgress } from '@material-ui/core';
import * as moment from 'moment';
import MaterialTable from 'material-table';
import { Form, reduxForm, submit, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const styles = () => ({
  pdf: {
    backgroundColor: 'red',
  },
  form: {
    paddingLeft: '5%',
  },
  buttonContainer: { paddingTop: '2%' },
  save: {
    color: 'white',
    backgroundColor: '#61A956',
    '&:hover': {
      backgroundColor: 'rgb(78, 127, 71)',
    },
  },
  calendar: {
    height: '100vh',
    paddingTop: 50,
    overflow: 'scroll',
    '&>div': {
      minWidth: '448px',
    },
  },
  paper: {
    height: 300,
    display: 'flex',
    alignItems: 'center',
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
    this.setState({ func }, () => {
      const { showDispatch } = this.props;
      showDispatch(action);
    });
  };

  transformData = (subjects) => {
    if (subjects) {
      return subjects.map((item) => ({
        id: item.id,
        subjectId: item.subject_id,
        teacherId: item.teacher_id,
        courseCode: item.subject.code,
        courseName: item.subject.name,
        uc: item.subject.uc,
        teacherName: `${item.teacher.user.first_name} ${item.teacher.user.first_surname}`,
        limit: item.limit,
      }));
    }
    return [];
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
      startDate,
      codSchoolPeriod,
      submitDispatch,
      loading,
      endDate,
      subjects,
      history,
    } = this.props;
    const { func } = this.state;
    const final = moment(endDate);
    const today = moment();
    const finishedPeriod = today > final;
    return codSchoolPeriod ? (
      <Form onSubmit={handleSubmit(saveSchoolPeriod)}>
        <Grid container>
          <Grid item xs={12}>
            <h3> Periodo semestral actual {codSchoolPeriod} </h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container>
              <RenderFields lineal={[6, 6, 6, 6, 6, 6]}>
                {[
                  {
                    label: 'Fecha Inicio',
                    field: 'startDate',
                    id: 'startDate',
                    type: 'date',
                    disabled: true,
                  },
                  {
                    label: 'Fecha Fin',
                    field: 'endDate',
                    id: 'endDate',
                    type: 'date',
                    minDate: moment(),
                  },
                  {
                    label: 'Fecha Limite de retiro',
                    field: 'withdrawalDeadline',
                    id: 'withdrawalDeadline',
                    type: 'date',
                    minDateMessage: 'La fecha de retiro no debe ser anterior a la fecha de inicio',
                    minDate: moment(startDate).add(1, 'days'),
                  },
                  { type: 'hidden' },
                  {
                    label: 'Habilitar inscripción',
                    field: 'incriptionVisible',
                    id: 'incriptionVisible',
                    type: 'switch',
                    disabled: finishedPeriod,
                    checked: !finishedPeriod,
                  },
                  {
                    label: 'Habilitar cargar notas',
                    field: 'loadNotes',
                    id: 'loadNotes',
                    type: 'switch',
                  },
                ]}
              </RenderFields>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer}>
                  <Grid item xs={4} />
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      className={classes.save}
                      onClick={() =>
                        schoolPeriodId
                          ? this.handleDialogShow('actualizar', submitDispatch)
                          : submitDispatch('periodo semestral')
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
        <Grid container justify="center">
          <Grid item xs={12} style={{ marginTop: '30px' }}>
            <MaterialTable
              title="Asignaturas en curso"
              columns={[
                { title: '#', field: 'id', hidden: true },
                { title: '#', field: 'subjectId', hidden: true },
                { title: '#', field: 'teacherId', hidden: true },
                { title: 'Codigo', field: 'courseCode' },
                { title: 'Asignatura', field: 'courseName' },
                { title: 'Unidades de Crédito', field: 'uc' },
                { title: 'profesor', field: 'teacherName' },
                { title: 'UC', field: 'uc' },
                { title: 'limite', field: 'limit' },
              ]}
              data={this.transformData(subjects)}
              localization={{
                header: {
                  actions: 'Acciones',
                },
                body: {
                  emptyDataSourceMessage: 'No hay registro de asignaturas',
                },
              }}
              actions={[
                {
                  icon: 'visibility',
                  tooltip: 'Ver detalles',
                  onClick: (event, rowData) => {
                    history.push(
                      `/periodo-semestral/en-curso/${rowData.subjectId}/${rowData.teacherId}/${rowData.id}`
                    );
                  },
                },
              ]}
            />
          </Grid>
        </Grid>
        <Dialog handleAgree={func} />
      </Form>
    ) : (
      <Paper className={classes.paper}>
        <Grid container justify="center">
          <Grid item>
            {loading ? <CircularProgress /> : 'Actualmente, no hay periodo escolar activo'}
          </Grid>
        </Grid>
      </Paper>
    );
  };
}

SchoolPeriodActual.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.shape({})),
  // eslint-disable-next-line react/forbid-prop-types
  schoolPeriodId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  endDate: PropTypes.string,
  classes: PropTypes.PropTypes.shape({
    buttonContainer: PropTypes.string,
    save: PropTypes.string,
    calendar: PropTypes.string,
    form: PropTypes.string,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  saveSchoolPeriod: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,

  submitDispatch: PropTypes.func.isRequired,
  showDispatch: PropTypes.func.isRequired,
};
SchoolPeriodActual.defaultProps = {
  subjects: null,
  schoolPeriodId: null,
  endDate: null,
};

let SchoolPeriodActualWrapper = reduxForm({
  form: 'periodo semestral',
  enableReinitialize: true,
})(SchoolPeriodActual);
const selector = formValueSelector('periodo semestral');
SchoolPeriodActualWrapper = connect(
  (state) => ({
    initialValues: {
      startDate: state.schoolPeriodReducer.selectedSchoolPeriod.start_date
        ? state.schoolPeriodReducer.selectedSchoolPeriod.start_date
        : moment().format('YYYY-MM-DD'),
      endDate: state.schoolPeriodReducer.selectedSchoolPeriod.end_date
        ? state.schoolPeriodReducer.selectedSchoolPeriod.end_date
        : moment().format('YYYY-MM-DD'),
      incriptionVisible: state.schoolPeriodReducer.selectedSchoolPeriod.inscription_visible,
      loadNotes: state.schoolPeriodReducer.selectedSchoolPeriod.load_notes,
      withdrawalDeadline: state.schoolPeriodReducer.selectedSchoolPeriod.withdrawal_deadline
        ? state.schoolPeriodReducer.selectedSchoolPeriod.withdrawal_deadline
        : moment().add(1, 'days').format('YYYY-MM-DD'),
    },
    startDate: selector(state, 'startDate'),
    action: state.dialogReducer.action,
  }),
  { showDispatch: show, submitDispatch: submit }
)(SchoolPeriodActualWrapper);

export default withStyles(styles)(SchoolPeriodActualWrapper);
