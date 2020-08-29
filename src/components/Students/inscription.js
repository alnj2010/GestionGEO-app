import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Form, reduxForm, submit, FieldArray, formValueSelector } from 'redux-form';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RenderFields from '../RenderFields';
import Dialog from '../Dialog';
import { show } from '../../actions/dialog';
import { jsonToOptions } from '../../helpers';
import { SUBJECT_STATE } from '../../services/constants';

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
    const { subjectInscriptions, subjectsSelected, subjects, idSchoolPeriod } = this.props;
    if (idSchoolPeriod) {
      const subjectsAux = subjects.map((item) => ({
        id: item.id,
        subject: {
          name: item.name,
        },
      }));

      return subjectsAux.filter(
        (item) =>
          !subjectsSelected.some((selected, index) => selected.subjectId === item.id && pos > index)
      );
    }
    return subjectInscriptions.filter(
      (item) =>
        !subjectsSelected.some((selected, index) => selected.subjectId === item.id && pos > index)
    );
  };

  renderSubjects = ({ fields }) => {
    const { classes, idSchoolPeriod, subjectInscriptions, subjectsSelected } = this.props;
    return (
      <>
        {fields.map((subject, index) => (
          <Grid container justify="center" key={subject.id}>
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
                subjectInscriptions.length === 0 ||
                (!!subjectsSelected && subjectInscriptions.length === subjectsSelected.length)
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
      subjectInscriptions,
      subjects,
    } = this.props;
    let rolledSubjects = [];
    if (subjectInscriptions.length && subjectsSelected) {
      rolledSubjects = subjectInscriptions.filter((item) =>
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
                ]}
              </RenderFields>
              <Grid container item xs={12}>
                <FieldArray name="subjects" component={this.renderSubjects} />
              </Grid>
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
                      Cancelar
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
    form: PropTypes.string.isRequired,
    buttonContainer: PropTypes.string.isRequired,
    save: PropTypes.string.isRequired,
    buttonDelete: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    fab: PropTypes.string.isRequired,
  }).isRequired,

  schoolPeriods: PropTypes.arrayOf(
    PropTypes.shape({
      cod_school_period: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,

  idSchoolPeriod: PropTypes.number.isRequired,

  subjectsSelected: PropTypes.arrayOf(
    PropTypes.shape({
      subjectId: PropTypes.number.isRequired,
    })
  ).isRequired,
  subjectInscriptions: PropTypes.arrayOf(
    PropTypes.shape({
      subjectId: PropTypes.number.isRequired,
    })
  ).isRequired,

  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,

  studentId: PropTypes.number.isRequired,
  fullname: PropTypes.number.isRequired,

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

    if (subjectArrayErrors.length) {
      errors.subjects = subjectArrayErrors;
    }
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
      schoolPeriodId: state.studentReducer.selectedStudentSchoolPeriod.id
        ? state.studentReducer.selectedStudentSchoolPeriod.id
        : '',
      payRef: state.studentReducer.selectedStudentSchoolPeriod.pay_ref
        ? state.studentReducer.selectedStudentSchoolPeriod.pay_ref
        : '',
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
  }),
  { showDispatch: show, submitDispatch: submit }
)(StudentInscriptionWrapper);

export default withStyles(styles)(StudentInscriptionWrapper);
