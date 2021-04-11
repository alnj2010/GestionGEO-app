import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography, CircularProgress } from '@material-ui/core';
import * as moment from 'moment';
import { Form, reduxForm, submit, FieldArray, formValueSelector, Field } from 'redux-form';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { WEEK_DAYS, SUBJECT_PERIOD_MODALITY } from '../../services/constants';
import { jsonToOptions } from '../../helpers';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields';

const styles = (theme) => ({
  fab: {
    marginTop: 50,
    margin: theme.spacing.unit,
  },
  form: {
    paddingLeft: '5%',
  },
  buttonContainer: { paddingTop: '2%' },
  buttonSchedule: {
    marginTop: theme.spacing.unit,
    padding: 2,
    width: '22%',
  },
  button: {
    width: '100%',
  },
  buttonDelete: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  save: {
    color: 'white',
    backgroundColor: '#61A956',
    '&:hover': {
      backgroundColor: 'rgb(78, 127, 71)',
    },
  },
  subtitle: {
    paddingTop: 50,
  },
});

class SchoolPeriodDetail extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  unselectedSubjects = (pos) => {
    const { subjects, subjectsSelected } = this.props;
    return subjects.filter(
      (item) =>
        !subjectsSelected.some((selected, index) => selected.subjectId === item.id && pos > index)
    );
  };

  renderSchedule = ({ fields }) => {
    const { classes } = this.props;
    return (
      <Grid container justify="center">
        {fields.map((schedule, index) => (
          // eslint-disable-next-line
          <Fragment key={index}>
            <Grid container item xs={10}>
              <Field
                component="input"
                name="schoolPeriodSubjectTeacherId"
                type="hidden"
                style={{ height: 0 }}
              />
              <RenderFields lineal>
                {[
                  {
                    label: 'Dia',
                    field: `${schedule}.day`,
                    id: `${schedule}.day`,
                    type: 'select',
                    options: jsonToOptions(WEEK_DAYS),
                  },
                  {
                    label: 'Hora inicio',
                    field: `${schedule}.startHour`,
                    id: `${schedule}.startHour`,
                    type: 'time',
                  },
                  {
                    label: 'Hora fin',
                    field: `${schedule}.endHour`,
                    id: `${schedule}.endHour`,
                    type: 'time',
                    minTime: moment('13:00:00', 'hh:mm:ss'),
                  },
                  {
                    label: 'Aula',
                    field: `${schedule}.classroom`,
                    id: `${schedule}.classroom`,
                    type: 'text',
                  },
                ]}
              </RenderFields>
            </Grid>
            <Grid item xs={1} className={classes.buttonDelete}>
              <IconButton
                aria-label="remover"
                color="secondary"
                onClick={() => fields.remove(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Fragment>
        ))}
        <Grid item container xs={12} justify="center">
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonSchedule}
            onClick={() =>
              fields.push({
                endHour: '00:00:00',
                startHour: '00:00:00',
              })
            }
          >
            horario +
          </Button>
        </Grid>
      </Grid>
    );
  };

  renderSubjects = ({ fields }) => {
    const { teachers, classes, subjects, subjectsSelected } = this.props;
    return (
      <>
        {fields.map((subject, index) => {
          let distributionItems = [2, 2, 2, 1, 1, 2, 2];

          if (subjectsSelected[index].modality === SUBJECT_PERIOD_MODALITY.REGULAR) {
            distributionItems = [3, 3, 2, 2, 2];
          }
          return (
            // eslint-disable-next-line
            <Grid container justify="center" key={index}>
              <Grid container item xs={10}>
                <RenderFields lineal={distributionItems}>
                  {[
                    {
                      field: `${subject}.subjectId`,
                      id: `${subject}.subjectId`,
                      type: 'select',
                      label: 'Asignatura',
                      options: this.unselectedSubjects(index).map((item) => {
                        return {
                          key: item.name,
                          value: item.id,
                        };
                      }),
                    },
                    {
                      field: `${subject}.teacherId`,
                      id: `${subject}.teacherId`,
                      type: 'select',
                      label: 'Profesor',
                      options: teachers.map((teacher) => {
                        return {
                          key: `${teacher.first_name} ${
                            teacher.second_name ? teacher.second_name : ''
                          } ${teacher.first_surname} ${
                            teacher.second_surname ? teacher.second_surname : ''
                          }`,
                          value: teacher.teacher.id,
                        };
                      }),
                    },
                    {
                      label: 'Modo',
                      field: `${subject}.modality`,
                      id: `${subject}.modality`,
                      type: 'select',
                      options: jsonToOptions(SUBJECT_PERIOD_MODALITY),
                    },

                    {
                      label: 'Alumnos',
                      field: `${subject}.limit`,
                      id: `${subject}.limit`,
                      type: 'number',
                      min: 0,
                    },
                    {
                      label: 'Arancel (Bs)',
                      field: `${subject}.duty`,
                      id: `${subject}.duty`,
                      type: 'number',
                      min: 0,
                    },
                    {
                      label: 'Fecha inicio',
                      field: `${subject}.startDate`,
                      id: `${subject}.startDate`,
                      type:
                        subjectsSelected[index].modality === SUBJECT_PERIOD_MODALITY.REGULAR
                          ? 'hidden'
                          : 'date',
                    },
                    {
                      label: 'Fecha fin',
                      field: `${subject}.endDate`,
                      id: `${subject}.endDate`,
                      type:
                        subjectsSelected[index].modality === SUBJECT_PERIOD_MODALITY.REGULAR
                          ? 'hidden'
                          : 'date',
                      minDate: moment(subjectsSelected[index].startDate).add(1, 'days'),
                    },
                  ]}
                </RenderFields>
              </Grid>
              <Grid item xs={1} className={classes.buttonDelete}>
                <IconButton
                  aria-label="remover"
                  color="secondary"
                  onClick={() => fields.remove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item xs={10}>
                <FieldArray name={`${subject}.schedules`} component={this.renderSchedule} />
              </Grid>
            </Grid>
          );
        })}
        <Grid container item xs={12} justify="center">
          <Grid item xs={1} style={{ maxWidth: 'none' }} container justify="center">
            <Fab
              color="primary"
              aria-label="Add"
              className={classes.fab}
              disabled={subjects && subjectsSelected && subjects.length === subjectsSelected.length}
              onClick={() =>
                fields.push({
                  schedule: [
                    {
                      endHour: '00:00:00',
                      startHour: '00:00:00',
                    },
                  ],
                })
              }
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </>
    );
  };

  handleDialogShow = (action, func) => {
    const { showDispatch } = this.props;
    this.setState({ func }, () => {
      showDispatch(action);
    });
  };

  render = () => {
    const {
      classes,
      handleSubmit,
      saveSchoolPeriod,
      goBack,
      schoolPeriodId,
      handleSchoolPeriodDelete,
      pristine,
      submitting,
      valid,
      submitDispatch,
      startDate,
      schoolPeriod,
    } = this.props;
    const { func } = this.state;

    return (
      <Form onSubmit={handleSubmit(saveSchoolPeriod)}>
        <Grid container>
          <Grid item xs={12}>
            <h3>
              {schoolPeriodId
                ? `Periodo semestral: ${schoolPeriod.cod_school_period || ''}`
                : 'Nuevo Periodo semestral'}
            </h3>
            <hr />
          </Grid>
          {!schoolPeriodId || schoolPeriod.id ? (
            <Grid item xs={12} className={classes.form}>
              <Grid container>
                <Grid container justify="center" item xs={12}>
                  <RenderFields>
                    {[
                      {
                        label: 'Codigo',
                        field: 'codSchoolPeriod',
                        id: 'codSchoolPeriod',
                        type: 'text',
                      },
                    ]}
                  </RenderFields>
                </Grid>
                <Grid container justify="space-between" item xs={12}>
                  <RenderFields>
                    {[
                      {
                        label: 'Fecha Inicio',
                        field: 'startDate',
                        id: 'startDate',
                        type: 'date',
                      },
                      {
                        label: 'Fecha Fin',
                        field: 'endDate',
                        id: 'endDate',
                        type: 'date',
                        minDateMessage: 'La fecha fin no debe ser anterior a la fecha de inicio',
                        minDate: moment(startDate).add(1, 'days'),
                      },
                      {
                        label: 'Fecha Limite de retiro',
                        field: 'withdrawalDeadline',
                        id: 'withdrawalDeadline',
                        type: 'date',
                        minDateMessage:
                          'La fecha de retiro no debe ser anterior a la fecha de inicio',
                        minDate: moment(startDate).add(1, 'days'),
                      },
                      {
                        label: 'Fecha en la que inicia la inscripcion',
                        field: 'inscriptionStartDate',
                        id: 'inscriptionStartDate',
                        type: 'date',
                      },
                      {
                        label: 'Aranceles para el proyecto',
                        field: `projectDuty`,
                        id: `projectDuty`,
                        type: 'number',
                        min: 0,
                      },
                      {
                        label: 'Aranceles para el trabajo final',
                        field: `finalWorkDuty`,
                        id: `finalWorkDuty`,
                        type: 'number',
                        min: 0,
                      },
                    ]}
                  </RenderFields>
                </Grid>

                <Grid item xs={12} className={classes.subtitle}>
                  <Typography variant="h6" gutterBottom>
                    Asignaturas del periodo
                  </Typography>
                </Grid>
                <Grid container item xs={12}>
                  <FieldArray name="subjects" component={this.renderSubjects} />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Grid
                    container
                    className={classes.buttonContainer}
                    justify="space-between"
                    spacing={16}
                  >
                    <Grid item xs={12} sm={3}>
                      <Button
                        variant="contained"
                        className={`${classes.save} ${classes.button}`}
                        onClick={() =>
                          schoolPeriodId
                            ? this.handleDialogShow('actualizar', submitDispatch)
                            : submitDispatch('Periodo semestral')
                        }
                        disabled={!valid || pristine || submitting}
                      >
                        Guardar Cambios
                      </Button>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Button variant="contained" onClick={goBack} className={classes.button}>
                        Ir al listado
                      </Button>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      {schoolPeriodId ? (
                        <Button
                          className={classes.button}
                          variant="contained"
                          color="secondary"
                          onClick={() => this.handleDialogShow('borrar', handleSchoolPeriodDelete)}
                        >
                          Borrar
                        </Button>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid container justify="center">
              <CircularProgress />
            </Grid>
          )}
        </Grid>
        <Dialog handleAgree={func} />
      </Form>
    );
  };
}

SchoolPeriodDetail.propTypes = {
  classes: PropTypes.shape({
    fab: PropTypes.string,
    form: PropTypes.string,
    buttonContainer: PropTypes.string,
    buttonSchedule: PropTypes.string,
    button: PropTypes.string,
    buttonDelete: PropTypes.string,
    save: PropTypes.string,
    subtitle: PropTypes.string,
  }).isRequired,

  teachers: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string,
      second_name: PropTypes.string,

      first_surname: PropTypes.string,
      second_surname: PropTypes.string,
      teacher: PropTypes.shape({ id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) })
        .isRequired,
    })
  ).isRequired,

  subjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  subjectsSelected: PropTypes.arrayOf(PropTypes.shape({})),

  schoolPeriod: PropTypes.shape({
    cod_school_period: PropTypes.string,
  }).isRequired,

  startDate: PropTypes.string,

  // eslint-disable-next-line react/forbid-prop-types
  schoolPeriodId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,

  saveSchoolPeriod: PropTypes.func.isRequired,
  handleSchoolPeriodDelete: PropTypes.func.isRequired,

  showDispatch: PropTypes.func.isRequired,
  submitDispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

SchoolPeriodDetail.defaultProps = {
  subjectsSelected: [],
  schoolPeriodId: null,
  startDate: null,
};

const schoolPeriodValidation = (values) => {
  const errors = {};
  if (!values.codSchoolPeriod) {
    errors.codSchoolPeriod = '*codigo es requerido';
  }
  if (!values.startDate) errors.startDate = '*Fecha inicial es requerida';

  if (!values.endDate) errors.endDate = '*Fecha fin es requerida';
  else {
    if (moment(values.endDate) <= moment(values.startDate))
      errors.endDate = '*Fecha fin no debe estar por debajo de la inicial';

    if (moment(values.withdrawalDeadline) <= moment(values.startDate))
      errors.endDate = '*Fecha limite de retiro no debe estar por debajo de la inicial';

    if (moment(values.endDate) < moment(values.withdrawalDeadline))
      errors.endDate = '*Fecha limite de retiro no debe estar por encima de la final';
  }
  if (values.subjects && values.subjects.length) {
    const subjectArrayErrors = [];
    values.subjects.forEach((subj, subjIndex) => {
      const subjErrors = {};
      if (!subj || !subj.subjectId) {
        subjErrors.subjectId = '*Asignatura es requerido';
        subjectArrayErrors[subjIndex] = subjErrors;
      }
      if (!subj || !subj.teacherId) {
        subjErrors.teacherId = '*Profesor es requerido';
        subjectArrayErrors[subjIndex] = subjErrors;
      }

      if (!subj || !subj.modality) {
        subjErrors.modality = '*Modalidad es requerido';
        subjectArrayErrors[subjIndex] = subjErrors;
      } else if (subj.modality !== SUBJECT_PERIOD_MODALITY.REGULAR) {
        if (!values.startDate) {
          subjErrors.startDate = '*Fecha inicial es requerida';
          subjectArrayErrors[subjIndex] = subjErrors;
        }

        if (!values.endDate) {
          subjErrors.endDate = '*Fecha fin es requerida';
          subjectArrayErrors[subjIndex] = subjErrors;
        }
      }
      if (!subj || !subj.limit) {
        subjErrors.limit = '*Maximo de alumnos es requerido';
        subjectArrayErrors[subjIndex] = subjErrors;
      }
      if (!subj || !subj.duty) {
        subjErrors.duty = '*Aranceles es requerido';
        subjectArrayErrors[subjIndex] = subjErrors;
      }

      if (subj.schedules && subj.schedules.length) {
        subjErrors.schedules = [];
        subj.schedules.forEach((sche, scheIndex) => {
          const scheErrors = {};
          if (!sche || !sche.day) {
            scheErrors.day = '*Dia es requerido';
            subjErrors.schedules[scheIndex] = scheErrors;
          }
          if (!sche || !sche.classroom) {
            scheErrors.classroom = '*Aula es requerido';
            subjErrors.schedules[scheIndex] = scheErrors;
          }
          if (!sche || !sche.startHour) {
            scheErrors.startHour = '*Hora inicio es requerida';
            subjErrors.schedules[scheIndex] = scheErrors;
          }

          if (!sche || !sche.endHour) {
            scheErrors.endHour = '*Hora fin es requerida';
            subjErrors.schedules[scheIndex] = scheErrors;
          } else if (
            moment(sche.endHour, 'hh:mm:ss').isBefore(moment(sche.startHour, 'hh:mm:ss'))
          ) {
            scheErrors.endHour = '*Hora fin no debe estar por debajo de la inicial';
            subjErrors.schedules[scheIndex] = scheErrors;
          }
        });
        subjectArrayErrors[subjIndex] = subjErrors;
      }
    });

    if (subjectArrayErrors.length) {
      errors.subjects = subjectArrayErrors;
    }
  }
  return errors;
};

let SchoolPeriodDetailWrapper = reduxForm({
  form: 'Periodo semestral',
  validate: schoolPeriodValidation,
  enableReinitialize: true,
})(SchoolPeriodDetail);
const selector = formValueSelector('Periodo semestral');
SchoolPeriodDetailWrapper = connect(
  (state) => ({
    initialValues: {
      codSchoolPeriod: state.schoolPeriodReducer.selectedSchoolPeriod.cod_school_period
        ? state.schoolPeriodReducer.selectedSchoolPeriod.cod_school_period
        : '',
      startDate: state.schoolPeriodReducer.selectedSchoolPeriod.start_date
        ? state.schoolPeriodReducer.selectedSchoolPeriod.start_date
        : moment().format('YYYY-MM-DD'),
      endDate: state.schoolPeriodReducer.selectedSchoolPeriod.end_date
        ? state.schoolPeriodReducer.selectedSchoolPeriod.end_date
        : moment().add(1, 'days').format('YYYY-MM-DD'),
      withdrawalDeadline: state.schoolPeriodReducer.selectedSchoolPeriod.withdrawal_deadline
        ? state.schoolPeriodReducer.selectedSchoolPeriod.withdrawal_deadline
        : moment().add(1, 'days').format('YYYY-MM-DD'),
      inscriptionStartDate: state.schoolPeriodReducer.selectedSchoolPeriod.inscription_start_date
        ? state.schoolPeriodReducer.selectedSchoolPeriod.inscription_start_date
        : moment().subtract(1, 'days').format('YYYY-MM-DD'),
      projectDuty: state.schoolPeriodReducer.selectedSchoolPeriod.project_duty
        ? state.schoolPeriodReducer.selectedSchoolPeriod.project_duty
        : 0,
      finalWorkDuty: state.schoolPeriodReducer.selectedSchoolPeriod.final_work_duty
        ? state.schoolPeriodReducer.selectedSchoolPeriod.final_work_duty
        : 0,
      subjects: state.schoolPeriodReducer.selectedSchoolPeriod.subjects
        ? state.schoolPeriodReducer.selectedSchoolPeriod.subjects.map((subj) => ({
            subjectId: subj.subject_id,
            teacherId: subj.teacher_id,
            modality: subj.modality,
            startDate: subj.start_date,
            endDate: subj.end_date,
            limit: subj.limit,
            duty: subj.duty,
            schedules: subj.schedules
              ? subj.schedules.map((sche) => ({
                  schoolPeriodSubjectTeacherId: sche.school_period_subject_teacher_id,
                  day: sche.day,
                  startHour: sche.start_hour,
                  endHour: sche.end_hour,
                  classroom: sche.classroom,
                }))
              : [{}],
          }))
        : [
            {
              schedules: [{ endHour: '00:00:00', startHour: '00:00:00' }],
            },
          ],
    },
    action: state.dialogReducer.action,
    startDate: selector(state, 'startDate'),
    subjectsSelected: selector(state, 'subjects'),
  }),
  { showDispatch: show, submitDispatch: submit }
)(SchoolPeriodDetailWrapper);

export default withStyles(styles)(SchoolPeriodDetailWrapper);
