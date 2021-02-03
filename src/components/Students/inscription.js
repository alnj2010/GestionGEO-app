import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import { Form, reduxForm, submit, formValueSelector, change } from 'redux-form';
import RenderFields from '../RenderFields';
import RenderFieldsArray from '../RenderFieldsArray';
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
      changeDispatch,
      teachers,
      approvedProjects,
      schoolPeriods,
      getAvailableSubjects,
      idSchoolPeriod,
      fullname,
      subjectsSelected,
      availableSubjects,
      finalWorkSubjects,
      availableDoctoralExam,
      finalWorkSubjectsSelected,
    } = this.props;
    let rolledSubjects = [];
    if (availableSubjects.length && subjectsSelected) {
      rolledSubjects = availableSubjects.filter((item) =>
        subjectsSelected.some((subject) => subject.subjectId === item.value)
      );
    }
    let fws = null;
    if (finalWorkSubjects.length) {
      fws = finalWorkSubjects;
    } else if (finalWorkSubjectsSelected.length) {
      fws = finalWorkSubjectsSelected;
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
                    onchange: (schoolPeriodId) => {
                      changeDispatch('inscripcion', 'subjects', []);
                      getAvailableSubjects(studentId, schoolPeriodId);
                    },
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
                    Asignaturas
                  </Typography>
                  <RenderFieldsArray
                    name="subjects"
                    nonRepeatOptions={availableSubjects}
                    distributions={[4, 4, 4]}
                  >
                    {(subjectSelected) => {
                      return [
                        {
                          field: `subjectId`,
                          id: `subjectId`,
                          type: 'select',
                          label: 'Materia',
                          repeatOption: false,
                        },
                        {
                          label: 'Estado Materia',
                          field: `status`,
                          id: `status`,
                          type: 'select',
                          options: jsonToOptions(SUBJECT_STATE),
                        },
                        {
                          label: 'Nota',
                          field: `nota`,
                          id: `nota`,
                          type: 'number',
                          min: 0,
                          max: 20,
                          disabled:
                            subjectSelected && subjectSelected.status === SUBJECT_STATE.CURSANDO,
                        },
                      ];
                    }}
                  </RenderFieldsArray>
                </Grid>
              ) : null}

              {finalWorkSubjectsSelected.length || finalWorkSubjects.length ? (
                <Grid container item xs={12} className={classes.listSubjects}>
                  <Typography variant="h6" gutterBottom>
                    {fws[0].is_final_subject ||
                    (fws[0].isProject !== undefined && !fws[0].isProject)
                      ? 'Trabajo final'
                      : 'Proyecto y seminario'}
                  </Typography>
                  <RenderFieldsArray
                    name="finalWorks"
                    nonRepeatOptions={finalWorkSubjects}
                    distributions={
                      fws[0].is_final_subject ||
                      (fws[0].isProject !== undefined && !fws[0].isProject)
                        ? [2, 1, 1, 2, 2, 2, 2]
                        : [3, 1, 3, 3, 2]
                    }
                  >
                    {(finalWorkSelected) => {
                      return [
                        {
                          field: `title`,
                          id: `title`,

                          type: 'text',
                          label: 'Titulo',
                        },
                        {
                          field: `status`,
                          id: `status`,
                          type: 'select',
                          label: 'Estado',
                          options: jsonToOptions(FINAL_WORK_STATUS),
                        },

                        {
                          field: `subjectId`,
                          id: `subjectId`,
                          type: 'select',
                          label: 'Materia',
                          repeatOption: false,
                        },
                        {
                          field: `descriptionStatus`,
                          id: `descriptionStatus`,
                          type: 'text',
                          label: 'Descripcion del estado',
                        },
                        {
                          field: `approvalDate`,
                          id: `approvalDate`,
                          type: 'date',
                          label: 'Fecha de aprobacion',
                          disabled:
                            !finalWorkSelected ||
                            finalWorkSelected.status !== FINAL_WORK_STATUS.APROBADO,
                        },
                        {
                          field: `projectId`,
                          id: `projectId`,
                          type:
                            fws[0].is_final_subject ||
                            (fws[0].isProject !== undefined && !fws[0].isProject)
                              ? 'select'
                              : 'hidden',
                          label: 'Proyecto',
                          options: approvedProjects.map((item) => ({
                            key: item.title,
                            value: item.id,
                          })),
                        },
                        {
                          field: `advisors`,
                          id: `advisors`,
                          type:
                            fws[0].is_final_subject ||
                            (fws[0].isProject !== undefined && !fws[0].isProject)
                              ? 'select'
                              : 'hidden',
                          multiple: true,
                          label: 'Tutor',
                          options: teachers.map((item) => ({
                            key: `${item.first_name} ${item.first_surname}`,
                            value: item.id,
                          })),
                        },
                      ];
                    }}
                  </RenderFieldsArray>
                </Grid>
              ) : null}

              <Grid item xs={12}>
                <div>
                  <h4>
                    Total de creditos inscritos:{' '}
                    <span style={{ color: '#2196f3' }}>
                      {rolledSubjects.reduce((total, item) => total + parseInt(item.uc, 10), 0)} uc
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
                        idSchoolPeriod
                          ? this.handleDialogShow('actualizar', submitDispatch)
                          : submitDispatch('inscripcion')
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

const studentInscriptionValidation = (values) => {
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
      if ((subj && parseInt(subj.nota, 10) < 0) || parseInt(subj.nota, 10) > 20) {
        subjErrors.nota = '*nota debe estar entre 0 y 20';
        subjectArrayErrors[subjIndex] = subjErrors;
      }
      if (subjectArrayErrors.length) {
        errors.subjects = subjectArrayErrors;
      }
    });
  }

  if (values.finalWorks && values.finalWorks.length) {
    const finalWorkArrayErrors = [];
    values.finalWorks.forEach((finalWork, finalWorkIndex) => {
      const finalWorkErrors = {};
      if (!finalWork || !finalWork.title) {
        finalWorkErrors.title = '*Titulo es requerido';
        finalWorkArrayErrors[finalWorkIndex] = finalWorkErrors;
      }

      if (!finalWork || !finalWork.status) {
        finalWorkErrors.status = '*Estado es requerido';
        finalWorkArrayErrors[finalWorkIndex] = finalWorkErrors;
      } else if (finalWork.status === FINAL_WORK_STATUS.APROBADO && !finalWork.approvalDate) {
        finalWorkErrors.approvalDate = '*Fecha es requerido';
        finalWorkArrayErrors[finalWorkIndex] = finalWorkErrors;
      }

      if (!finalWork || !finalWork.subjectId) {
        finalWorkErrors.subjectId = '*Materia es requerido';
        finalWorkArrayErrors[finalWorkIndex] = finalWorkErrors;
      }

      if (finalWorkArrayErrors.length) {
        errors.finalWorks = finalWorkArrayErrors;
      }
    });
  }
  return errors;
};

let StudentInscriptionWrapper = reduxForm({
  form: 'inscripcion',
  validate: studentInscriptionValidation,
  enableReinitialize: true,
})(StudentInscription);

const selector = formValueSelector('inscripcion');
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
      finalWorks: state.studentReducer.selectedStudentSchoolPeriod.final_work_data
        ? state.studentReducer.selectedStudentSchoolPeriod.final_work_data.map((finalWork) => ({
            title: finalWork.final_work.title,
            status: finalWork.status,
            descriptionStatus: finalWork.description_status,
            subjectId: finalWork.final_work.subject_id,
            isProject: finalWork.final_work.is_project,
            projectId: finalWork.final_work.project_id,
            approvalDate: finalWork.final_work.approval_date
              ? finalWork.final_work.approval_date
              : moment().format('YYYY-MM-DD'),
            advisors: finalWork.final_work.teachers.length
              ? finalWork.final_work.teachers[0].id
              : null,
          }))
        : [],
      doctoralExam: state.studentReducer.selectedStudentSchoolPeriod.doctoral_exam
        ? state.studentReducer.selectedStudentSchoolPeriod.doctoral_exam.status
        : null,
    },
    action: state.dialogReducer.action,
    schoolPeriodId: selector(state, 'schoolPeriodId'),
    subjectsSelected: selector(state, 'subjects'),
    finalWorkSubjectsSelected: selector(state, 'finalWorks'),
  }),
  { showDispatch: show, submitDispatch: submit, changeDispatch: change }
)(StudentInscriptionWrapper);

export default withStyles(styles)(StudentInscriptionWrapper);
