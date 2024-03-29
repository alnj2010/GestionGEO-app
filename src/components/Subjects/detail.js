import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography, CircularProgress } from '@material-ui/core';
import { Form, reduxForm, submit, FieldArray, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RenderFields from '../RenderFields';
import Dialog from '../Dialog';
import { show } from '../../actions/dialog';
import { jsonToOptions } from '../../helpers';
import { SUBJECT_MODALITY } from '../../services/constants';

const styles = (theme) => ({
  fab: {
    margin: theme.spacing.unit,
  },
  subtitle: {
    paddingTop: 50,
  },
  button: {
    width: '100%',
  },
  buttonDelete: {
    marginTop: 0,
    padding: '0 0 0 10px',
  },
  buttonDeleteContainer: {
    display: 'flex',
    alignItems: 'flex-end',
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
});

class SubjectDetail extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  handleDialogShow = (action, func) => {
    const { showDispatch } = this.props;

    this.setState({ func }, () => {
      showDispatch(action);
    });
  };

  unselectedSchoolPrograms = (pos) => {
    const { schoolPrograms, schoolProgramsSelected } = this.props;
    return schoolPrograms.filter(
      (item) =>
        !schoolProgramsSelected.some((selected, index) => selected.id === item.id && pos > index)
    );
  };

  renderSchoolPrograms = ({ fields }) => {
    const { classes, schoolPrograms, schoolProgramsSelected } = this.props;
    return (
      <Grid container item justify="center">
        {fields.map((schoolProgram, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            <Grid item xs={5}>
              <RenderFields>
                {[
                  {
                    field: `${schoolProgram}.id`,
                    id: `${schoolProgram}.id`,
                    type: 'select',
                    label: 'Programa académico',
                    options: this.unselectedSchoolPrograms(index).map((post) => {
                      return {
                        key: post.school_program_name,
                        value: post.id,
                      };
                    }),
                  },
                ]}
              </RenderFields>
            </Grid>
            <Grid item xs={5}>
              <RenderFields>
                {[
                  {
                    field: `${schoolProgram}.type`,
                    id: `${schoolProgram}.type`,
                    type: 'select',
                    label: 'modalidad',
                    options: jsonToOptions(SUBJECT_MODALITY),
                  },
                ]}
              </RenderFields>
            </Grid>
            <Grid item xs={2} className={classes.buttonDeleteContainer}>
              <IconButton
                className={classes.buttonDelete}
                aria-label="remover"
                color="secondary"
                onClick={() => fields.remove(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Fragment>
        ))}
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          disabled={
            schoolPrograms &&
            schoolProgramsSelected &&
            schoolPrograms.length === schoolProgramsSelected.length
          }
          onClick={() => fields.push({})}
        >
          <AddIcon />
        </Fab>
      </Grid>
    );
  };

  render = () => {
    const {
      classes,
      handleSubmit,
      saveSubject,
      goBack,
      subjectId,
      subject,
      handleSubjectDelete,
      pristine,
      submitting,
      valid,
      submitDispatch,
    } = this.props;
    const { func } = this.state;

    return (
      <Form onSubmit={handleSubmit(saveSubject)}>
        <Grid container>
          <Grid item xs={12}>
            <h3> {subjectId ? `Asignatura: ${subject.name || ''}` : 'Nueva Asignatura'}</h3>
            <hr />
          </Grid>
          {!subjectId || subject.id ? (
            <Grid item xs={12} className={classes.form}>
              <Grid container justify="space-between">
                <RenderFields>
                  {[
                    {
                      label: 'Código de la asignatura',
                      field: 'subjectCode',
                      id: 'subjectCode',
                      type: 'text',
                    },
                    {
                      label: 'Nombre de la asignatura',
                      field: 'subjectName',
                      id: 'subjectName',
                      type: 'text',
                    },
                    {
                      label: 'Unidades de crédito',
                      field: 'uc',
                      id: 'uc',
                      type: 'number',
                      min: 0,
                    },
                    {
                      label: 'Horas de laboratorio (total por semana)',
                      field: 'laboratoryHours',
                      id: 'laboratoryHours',
                      type: 'number',
                      min: 0,
                    },
                    {
                      label: 'Horas practica (total por semana)',
                      field: 'practicalHours',
                      id: 'practicalHours',
                      type: 'number',
                      min: 0,
                    },
                    {
                      label: 'Horas teoricas (total por semana)',
                      field: 'theoreticalHours',
                      id: 'theoreticalHours',
                      type: 'number',
                      min: 0,
                    },

                    {
                      label: '¿Prela a una asignatura final?',
                      field: 'isProjectSubject',
                      id: 'isProjectSubject',
                      type: 'switch',
                      tooltipText:
                        'Esta opción hace referencia a las materias de tipo proyecto que deben cursarse antes de presentar Trabajos Especiales de Grado',
                    },
                    {
                      label: '¿Es asignatura final? Ej: TEG, Tesis',
                      field: 'isFinalSubject',
                      id: 'isFinalSubject',
                      type: 'switch',
                    },
                  ]}
                </RenderFields>
                <Grid item xs={12} className={classes.subtitle}>
                  <Typography variant="h6" gutterBottom>
                    Programa académico a los que pertenece la asignatura
                  </Typography>
                </Grid>
                <FieldArray name="schoolPrograms" component={this.renderSchoolPrograms} />
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
                          subjectId
                            ? this.handleDialogShow('actualizar', submitDispatch)
                            : submitDispatch('asignatura')
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
                      {subjectId ? (
                        <Button
                          className={classes.button}
                          variant="contained"
                          color="secondary"
                          onClick={() => this.handleDialogShow('borrar', handleSubjectDelete)}
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

SubjectDetail.propTypes = {
  classes: PropTypes.shape({
    fab: PropTypes.string,
    subtitle: PropTypes.string,
    button: PropTypes.string,
    buttonDelete: PropTypes.string,
    buttonDeleteContainer: PropTypes.string,
    form: PropTypes.string,
    buttonContainer: PropTypes.string,
    save: PropTypes.string,
  }).isRequired,

  subject: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,

  schoolPrograms: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) })
  ).isRequired,

  schoolProgramsSelected: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) })
  ),

  // eslint-disable-next-line react/forbid-prop-types
  subjectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,

  showDispatch: PropTypes.func.isRequired,
  submitDispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  saveSubject: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  handleSubjectDelete: PropTypes.func.isRequired,
};
SubjectDetail.defaultProps = {
  schoolProgramsSelected: [],
  subjectId: null,
};
const subjectValidation = (values) => {
  const errors = {};
  if (!values.subjectCode) {
    errors.subjectCode = 'Código de asignatura es requerido';
  }

  if (!values.subjectName) {
    errors.subjectName = 'Nombre de asignatura es requerido';
  }

  if (!values.uc) {
    errors.uc = 'Unidades de crédito es requerido';
  }

  if (values.schoolPrograms && values.schoolPrograms.length) {
    const schoolProgramsArrayErrors = [];
    values.schoolPrograms.forEach((schoolProgram, schoolProgramIndex) => {
      const schoolProgramErrors = {};
      if (!schoolProgram || !schoolProgram.id) {
        schoolProgramErrors.id = 'Requerido';
        schoolProgramsArrayErrors[schoolProgramIndex] = schoolProgramErrors;
      }
      if (!schoolProgram || !schoolProgram.type) {
        schoolProgramErrors.type = 'Requerido';
        schoolProgramsArrayErrors[schoolProgramIndex] = schoolProgramErrors;
      }
    });
    if (schoolProgramsArrayErrors.length) {
      errors.schoolPrograms = schoolProgramsArrayErrors;
    }
  }

  return errors;
};

let SubjectDetailWrapper = reduxForm({
  form: 'asignatura',
  validate: subjectValidation,
  enableReinitialize: true,
})(SubjectDetail);
const selector = formValueSelector('asignatura');

SubjectDetailWrapper = connect(
  (state) => ({
    initialValues: {
      subjectName: state.subjectReducer.selectedSubject.name
        ? state.subjectReducer.selectedSubject.name
        : '',
      subjectCode: state.subjectReducer.selectedSubject.code
        ? state.subjectReducer.selectedSubject.code
        : '',
      uc: state.subjectReducer.selectedSubject.uc ? state.subjectReducer.selectedSubject.uc : '',
      laboratoryHours: state.subjectReducer.selectedSubject.laboratory_hours
        ? state.subjectReducer.selectedSubject.laboratory_hours
        : 0,
      practicalHours: state.subjectReducer.selectedSubject.practical_hours
        ? state.subjectReducer.selectedSubject.practical_hours
        : 0,
      theoreticalHours: state.subjectReducer.selectedSubject.theoretical_hours
        ? state.subjectReducer.selectedSubject.theoretical_hours
        : 0,
      isFinalSubject: state.subjectReducer.selectedSubject.is_final_subject
        ? state.subjectReducer.selectedSubject.is_final_subject
        : false,
      isProjectSubject: state.subjectReducer.selectedSubject.is_project_subject
        ? state.subjectReducer.selectedSubject.is_project_subject
        : false,
      schoolPrograms: state.subjectReducer.selectedSubject.school_programs
        ? state.subjectReducer.selectedSubject.school_programs.map((sp) => ({
            id: sp.id,
            type: sp.school_program_subject.type,
          }))
        : [{}],
    },
    schoolProgramsSelected: selector(state, 'schoolPrograms'),
    action: state.dialogReducer.action,
  }),
  { showDispatch: show, submitDispatch: submit }
)(SubjectDetailWrapper);

export default withStyles(styles)(SubjectDetailWrapper);
