import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import { Form, reduxForm, submit, FieldArray, formValueSelector } from 'redux-form';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RenderFields from '../RenderFields';
import Dialog from '../Dialog';
import { show } from '../../actions/dialog';
import { jsonToOptions } from '../../helpers';
import {
  SUBJECT_STATE,
  FINANCING_TYPE,
  FINAL_WORK_STATUS,
  DOCTORAL_STATUS,
} from '../../services/constants';

const styles = () => ({
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
  buttonDelete: {
    marginTop: 30,
    padding: 10,
  },
  listSubjects: {
    marginTop: 30,
  },
  button: {
    width: '100%',
  },
});

class StudentInscription extends Component {
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

  unselectedSubjects = (pos) => {
    const { availableSubjects, subjectsSelected, subjects, idSchoolPeriod } = this.props;
    if (idSchoolPeriod) {
      const subjectsAux = subjects.map((item) => ({
        id: item.id,
        subject: {
          name: item.subject_name,
        },
      }));
      return subjectsAux.filter(
        (item) =>
          !subjectsSelected.some((selected, index) => selected.subjectId === item.id && pos > index)
      );
    }
    return availableSubjects.filter(
      (item) =>
        !subjectsSelected.some((selected, index) => selected.subjectId === item.id && pos > index)
    );
  };

  renderSubjects = ({ fields }) => {
    const { classes, idSchoolPeriod, availableSubjects, subjectsSelected } = this.props;
    return (
      <>
        {fields.map((subject, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid container justify="center" key={index}>
            <Grid container item xs={10}>
              <RenderFields lineal>
                {[
                  {
                    field: `${subject}.subjectId`,
                    id: `${subject}.subjectId`,
                    disabled: !!idSchoolPeriod,
                    type: 'select',
                    label: 'Materia',
                    options: this.unselectedSubjects(index).map((unselectedSubject) => {
                      return {
                        key: unselectedSubject.subject.name,
                        value: unselectedSubject.id,
                      };
                    }),
                  },
                  {
                    label: 'Estado Materia',
                    field: `${subject}.status`,
                    id: `${subject}.status`,
                    type: 'select',
                    options: jsonToOptions(SUBJECT_STATE),
                  },
                  {
                    label: 'Nota',
                    field: `${subject}.nota`,
                    id: `${subject}.nota`,
                    type: 'number',
                    min: 0,
                    max: 20,
                  },
                ]}
              </RenderFields>
            </Grid>
            {idSchoolPeriod ? null : (
              <Grid item xs={2}>
                <IconButton
                  className={classes.buttonDelete}
                  aria-label="remover"
                  color="secondary"
                  onClick={() => fields.remove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        ))}
        <Grid container item xs={12} justify="center">
          <Grid item xs={1}>
            <Fab
              color="primary"
              aria-label="Add"
              className={classes.fab}
              disabled={
                !!idSchoolPeriod ||
                availableSubjects.length === 0 ||
                (!!subjectsSelected && availableSubjects.length === subjectsSelected.length)
              }
              onClick={() => fields.push({})}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </>
    );
  };

  renderFinalWork = ({ fields }) => {
    const {
      classes,
      idSchoolPeriod,
      finalWorkSubjects,
      finalWorkSubjectsSelected,
      approvedProjects,
      teachers,
    } = this.props;

    const posiblesFinalSubjects = (pos) =>
      finalWorkSubjects
        .filter(
          (item) =>
            !finalWorkSubjectsSelected.some((fws, i) => fws.subjectId === item.id && pos > i)
        )
        .map((fw) => ({ key: fw.name, value: fw.id }));

    return (
      <>
        {fields.map((finalWork, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid container justify="center" key={index}>
            <Grid container item xs={10}>
              <RenderFields lineal={[3, 2, 2, 2, 3]}>
                {[
                  {
                    field: `${finalWork}.title`,
                    id: `${finalWork}.title`,

                    type: 'text',
                    label: 'Titulo',
                  },
                  {
                    field: `${finalWork}.status`,
                    id: `${finalWork}.status`,
                    type: 'select',
                    label: 'Estado',
                    options: jsonToOptions(FINAL_WORK_STATUS),
                  },
                  {
                    field: `${finalWork}.subjectId`,
                    id: `${finalWork}.subjectId`,
                    type: 'select',
                    label: 'Materia',
                    options: posiblesFinalSubjects(index),
                  },
                  {
                    field: `${finalWork}.projectId`,
                    id: `${finalWork}.projectId`,
                    type: 'select',
                    label: 'Proyecto',
                    options: approvedProjects.map((item) => ({
                      key: item.title,
                      value: item.id,
                    })),
                  },
                  {
                    field: `${finalWork}.advisors`,
                    id: `${finalWork}.advisors`,
                    type: 'select',
                    multiple: true,
                    label: 'Tutor',
                    options: teachers.map((item) => ({
                      key: `${item.first_name} ${item.first_surname}`,
                      value: item.id,
                    })),
                  },
                ]}
              </RenderFields>
            </Grid>
            {idSchoolPeriod ? null : (
              <Grid item xs={2}>
                <IconButton
                  className={classes.buttonDelete}
                  aria-label="remover"
                  color="secondary"
                  onClick={() => fields.remove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        ))}
        <Grid container item xs={12} justify="center">
          <Grid item xs={1}>
            <Fab
              color="primary"
              aria-label="Add"
              className={classes.fab}
              disabled={finalWorkSubjectsSelected.length === finalWorkSubjects.length}
              onClick={() => fields.push({})}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </>
    );
  };

  render = () => {
    const {
      classes,
      handleSubmit,
      saveInscription,
      goBack,
      studentId,
      pristine,
      submitting,
      valid,
      submitDispatch,
      schoolPeriods,
      getAvailableSubjects,
      idSchoolPeriod,
      fullname,
      subjectsSelected,
      availableSubjects,
      subjects,
      finalWorkSubjects,
      availableDoctoralExam,
      finalWorkSubjectsSelected,
    } = this.props;
    let rolledSubjects = [];
    if (availableSubjects.length && subjectsSelected) {
      rolledSubjects = availableSubjects.filter((item) =>
        subjectsSelected.some((subject) => subject.subjectId === item.id)
      );
    } else if (subjects.length && subjectsSelected) {
      rolledSubjects = subjects.filter((item) =>
        subjectsSelected.some((subject) => subject.subjectId === item.id)
      );
    }

    const { func } = this.state;
    return (
      <Form onSubmit={handleSubmit(saveInscription)}>
        <Grid container>
          <Grid item xs={12}>
            <h3> Inscripcion: {fullname}</h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container justify="space-between">
              <RenderFields>
                {[
                  {
                    field: `schoolPeriodId`,
                    disabled: !!idSchoolPeriod,
                    id: `schoolPeriodId`,
                    type: 'select',
                    label: 'Periodo semestral',
                    options: schoolPeriods.map((sp) => {
                      return {
                        key: sp.cod_school_period,
                        value: sp.id,
                      };
                    }),
                    onchange: (schoolPeriodId) => getAvailableSubjects(studentId, schoolPeriodId),
                  },
                  {
                    field: `payRef`,
                    id: `payRef`,
                    type: 'text',
                    label: 'Referencia de pago',
                  },
                  {
                    label: 'Financiamiento',
                    field: 'financing',
                    id: 'financing',
                    type: 'select',
                    options: jsonToOptions(FINANCING_TYPE),
                  },
                  {
                    field: `financingDescription`,
                    id: `financingDescription`,
                    type: 'text',
                    label: 'Descripcion del financiamiento',
                  },
                  {
                    field: `amountPaid`,
                    id: `amountPaid`,
                    type: 'number',
                    min: 0,
                    label: 'Cantidad cancelada (bs)',
                  },
                  {
                    field: `doctoralExam`,
                    id: `doctoralExam`,
                    type: availableDoctoralExam ? 'select' : 'hidden',
                    label: 'Examen doctoral',
                    options: jsonToOptions(DOCTORAL_STATUS),
                  },
                ]}
              </RenderFields>

              {subjectsSelected.length || availableSubjects.length ? (
                <Grid container item xs={12} className={classes.listSubjects}>
                  <Typography variant="h6" gutterBottom>
                    Materias
                  </Typography>
                  <FieldArray name="subjects" component={this.renderSubjects} />
                </Grid>
              ) : null}

              {finalWorkSubjectsSelected.length || finalWorkSubjects.length ? (
                <Grid container item xs={12} className={classes.listSubjects}>
                  <Typography variant="h6" gutterBottom>
                    Trabajo final
                  </Typography>
                  <FieldArray name="finalWorks" component={this.renderFinalWork} />
                </Grid>
              ) : null}

              <Grid item xs={12}>
                <div>
                  <h4>
                    Total de creditos inscritos:{' '}
                    <span style={{ color: '#2196f3' }}>
                      {rolledSubjects.reduce(
                        (total, item) => total + parseInt(item.subject.uc, 10),
                        0
                      )}{' '}
                      uc
                    </span>{' '}
                  </h4>
                  <h4>
                    Costo total:{' '}
                    <span style={{ color: '#9e9d24' }}>
                      {rolledSubjects
                        .reduce((total, item) => total + parseFloat(item.duty), 0.0)
                        .toFixed(2)}{' '}
                      bs
                    </span>{' '}
                  </h4>
                </div>
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
                      className={`${classes.save} ${classes.button} `}
                      onClick={() =>
                        studentId
                          ? this.handleDialogShow('actualizar', submitDispatch)
                          : submitDispatch('student')
                      }
                      disabled={!valid || pristine || submitting}
                    >
                      Guardar Cambios
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Button variant="contained" onClick={goBack} className={classes.button}>
                      IR AL LISTADO
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

StudentInscription.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string,
    buttonContainer: PropTypes.string,
    save: PropTypes.string,
    buttonDelete: PropTypes.string,
    button: PropTypes.string,
    fab: PropTypes.string,
    listSubjects: PropTypes.string,
  }).isRequired,

  schoolPeriods: PropTypes.arrayOf(
    PropTypes.shape({
      cod_school_period: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ).isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  idSchoolPeriod: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  subjectsSelected: PropTypes.arrayOf(
    PropTypes.shape({
      subjectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ),
  finalWorkSubjectsSelected: PropTypes.arrayOf(PropTypes.shape({})),
  availableSubjects: PropTypes.arrayOf(
    PropTypes.shape({
      subjectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ).isRequired,
  finalWorkSubjects: PropTypes.arrayOf(PropTypes.shape({})),
  approvedProjects: PropTypes.arrayOf(PropTypes.shape({})),
  availableDoctoralExam: PropTypes.bool,

  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      name: PropTypes.string,
    })
  ).isRequired,

  // eslint-disable-next-line react/forbid-prop-types
  studentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  fullname: PropTypes.string.isRequired,

  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,

  handleSubmit: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  saveInscription: PropTypes.func.isRequired,
  getAvailableSubjects: PropTypes.func.isRequired,
  showDispatch: PropTypes.func.isRequired,
  submitDispatch: PropTypes.func.isRequired,
};
StudentInscription.defaultProps = {
  subjectsSelected: [],
  finalWorkSubjectsSelected: [],
  idSchoolPeriod: null,
  finalWorkSubjects: [],
  approvedProjects: [],
  availableDoctoralExam: false,
};

const studentValidation = (values) => {
  const errors = {};
  if (!values.schoolPeriodId) errors.schoolPeriodId = '*Periodo semestral requerido';
  if (values.subjects && values.subjects.length) {
    const subjectArrayErrors = [];
    values.subjects.forEach((subj, subjIndex) => {
      const subjErrors = {};
      if (!subj || !subj.subjectId) {
        subjErrors.subjectId = '*Materia es requerido';
        subjectArrayErrors[subjIndex] = subjErrors;
      }
      if (!subj || !subj.status) {
        subjErrors.status = '*Estado es requerido';
        subjectArrayErrors[subjIndex] = subjErrors;
      }
      if (!subj || !subj.nota) {
        subjErrors.nota = '*nota es requerido';
        subjectArrayErrors[subjIndex] = subjErrors;
      } else if (parseInt(subj.nota, 10) < 0 || parseInt(subj.nota, 10) > 20) {
        subjErrors.nota = '*nota debe estar entre 0 y 20';
        subjectArrayErrors[subjIndex] = subjErrors;
      }
    });
  }
  return errors;
};

let StudentInscriptionWrapper = reduxForm({
  form: 'estudiante',
  validate: studentValidation,
  enableReinitialize: true,
})(StudentInscription);

const selector = formValueSelector('estudiante');
StudentInscriptionWrapper = connect(
  (state) => ({
    initialValues: {
      schoolPeriodId: state.studentReducer.selectedStudentSchoolPeriod.school_period
        ? state.studentReducer.selectedStudentSchoolPeriod.school_period.id
        : '',
      payRef: state.studentReducer.selectedStudentSchoolPeriod.pay_ref
        ? state.studentReducer.selectedStudentSchoolPeriod.pay_ref
        : '',

      financing: state.studentReducer.selectedStudentSchoolPeriod.financing
        ? state.studentReducer.selectedStudentSchoolPeriod.financing
        : undefined,
      financingDescription: state.studentReducer.selectedStudentSchoolPeriod.financing_description
        ? state.studentReducer.selectedStudentSchoolPeriod.financing_description
        : '',
      amountPaid: state.studentReducer.selectedStudentSchoolPeriod.amount_paid
        ? state.studentReducer.selectedStudentSchoolPeriod.amount_paid
        : 0,
      subjects: state.studentReducer.selectedStudentSchoolPeriod.enrolled_subjects
        ? state.studentReducer.selectedStudentSchoolPeriod.enrolled_subjects.map((subject) => ({
            subjectId: subject.school_period_subject_teacher_id,
            status: subject.status,
            nota: subject.qualification,
          }))
        : [],
    },
    action: state.dialogReducer.action,
    schoolPeriodId: selector(state, 'schoolPeriodId'),
    subjectsSelected: selector(state, 'subjects'),
    finalWorkSubjectsSelected: selector(state, 'finalWorks'),
  }),
  { showDispatch: show, submitDispatch: submit }
)(StudentInscriptionWrapper);

export default withStyles(styles)(StudentInscriptionWrapper);
