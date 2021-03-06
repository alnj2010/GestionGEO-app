import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import { Form, reduxForm, submit, formValueSelector, change } from 'redux-form';
import PropTypes from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields';
import RenderFieldsArray from '../RenderFieldsArray';
import { getSessionUserRol } from '../../storage/sessionStorage';
import { STUDENT_TYPE, STUDENT_STATUS } from '../../services/constants';
import { jsonToOptions } from '../../helpers';

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
  button: {
    width: '100%',
  },
  buttonDelete: {
    display: 'flex',
    alignItems: 'flex-end',
  },
});

class StudentSchoolProgram extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      schoolProgramSelected,
      getSubjectBySchoolProgram,
      changeDispatch,
      schoolProgram,
    } = this.props;
    if (
      nextProps.schoolProgramSelected !== schoolProgramSelected &&
      nextProps.schoolProgramSelected !== ''
    ) {
      if (!schoolProgram) changeDispatch('programa academico del estudiante', 'equivalences', []);
      getSubjectBySchoolProgram(nextProps.schoolProgramSelected);
    }
  }

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
      saveStudent,
      goBack,
      schoolProgram,
      handleSchoolProgramDelete,
      pristine,
      submitting,
      valid,
      submitDispatch,
      teachersGuide,
      selectedStudent,
      schoolPrograms,
      subjects,
      schoolProgramSelected,
    } = this.props;
    const { func } = this.state;
    const rol = getSessionUserRol();
    return (
      <Form onSubmit={handleSubmit(saveStudent)}>
        <Grid container>
          <Grid item xs={12}>
            <h3>
              Estudiante: {selectedStudent.first_surname} {selectedStudent.first_name} <br />
              {schoolProgram
                ? `Programa Academico: ${schoolProgram.school_program.school_program_name}`
                : `Agregar programa Academico`}
            </h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container justify="space-between">
              <RenderFields>
                {[
                  {
                    label: 'Programa academico',
                    field: `schoolProgramId`,
                    id: `schoolProgramId`,
                    type: schoolProgram ? 'hidden' : 'select',
                    options: schoolPrograms.map((post) => {
                      return {
                        key: post.school_program_name,
                        value: post.id,
                      };
                    }),
                    disabled: rol !== 'A' || schoolProgram,
                  },
                  {
                    label: 'Postgrado actual (Externo al Postgrado de Geoquimica)',
                    field: 'currentPostgraduate',
                    id: 'currentPostgraduate',
                    type: 'text',
                  },
                  {
                    label: 'Univesidad de origen',
                    field: 'homeUniversity',
                    id: 'homeUniversity',
                    type: 'text',
                  },
                  {
                    label: 'Tipo de ingreso',
                    field: 'typeIncome',
                    id: 'typeIncome',
                    type: 'text',
                  },
                  {
                    label: 'Creditos otorgados',
                    field: 'creditsGranted',
                    id: 'creditsGranted',
                    type: 'number',
                    min: 0,
                  },
                  {
                    label: 'Estado del estudiante',
                    field: `currentStatus`,
                    id: `currentStatus`,
                    type: 'select',
                    options: jsonToOptions(STUDENT_STATUS),
                    disabled: rol !== 'A',
                  },
                  {
                    label: 'Tipo estudiante',
                    field: `studentType`,
                    id: `studentType`,
                    type: 'select',
                    options: jsonToOptions(STUDENT_TYPE),
                    disabled: rol !== 'A',
                  },
                  {
                    label: 'Profesor Guia',
                    field: `guideTeacherId`,
                    id: `guideTeacherId`,
                    type: 'select',
                    options: teachersGuide.map((item) => ({
                      key: `${item.first_name} ${item.first_surname}`,
                      value: item.id,
                    })),
                    disabled: rol !== 'A',
                  },
                  {
                    label: '¿Puede Inscribir TEG o proyecto?',
                    field: 'isAvailableFinalWork',
                    id: 'isAvailableFinalWork',
                    type: rol === 'A' ? 'switch' : 'hidden',
                  },
                  {
                    label: '¿Profesor de la UCV?',
                    field: 'isUcvTeacher',
                    id: 'isUcvTeacher',
                    type: 'switch',
                    disabled: rol !== 'A',
                  },
                  {
                    label: '¿Posee empleo actualmente?',
                    field: 'withWork',
                    id: 'withWork',
                    type: 'switch',
                    disabled: rol !== 'A',
                  },
                  {
                    label: '¿Esta actualmente en periodo de prueba?',
                    field: 'testPeriod',
                    id: 'testPeriod',
                    type: rol === 'A' ? 'switch' : 'hidden',
                    disabled: rol !== 'A',
                  },
                ]}
              </RenderFields>
            </Grid>
            <>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Materias por equivalencia
                </Typography>
              </Grid>
              <Grid container item xs={12}>
                <RenderFieldsArray
                  name="equivalences"
                  nonRepeatOptions={subjects.map((item) => {
                    return {
                      id: schoolProgramSelected,
                      key: item.name,
                      value: item.id,
                    };
                  })}
                  distributions={[6, 6]}
                >
                  {() => [
                    {
                      field: `subject_id`,
                      id: `subject_id`,
                      type: 'select',
                      label: 'Materia',
                      repeatOption: false,
                    },
                    {
                      field: `qualification`,
                      id: `qualification`,
                      type: 'number',
                      label: 'Calificacion',
                      min: 10,
                      max: 20,
                    },
                  ]}
                </RenderFieldsArray>
              </Grid>
            </>

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
                        this.handleDialogShow(
                          schoolProgram ? 'Actualizar' : 'Agregar',
                          submitDispatch
                        )
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

                  <Grid item xs={12} sm={3}>
                    {schoolProgram && (
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={() => this.handleDialogShow('borrar', handleSchoolProgramDelete)}
                      >
                        Borrar
                      </Button>
                    )}
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

StudentSchoolProgram.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string,
    buttonContainer: PropTypes.string,
    save: PropTypes.string,
    button: PropTypes.string,
    buttonDelete: PropTypes.string,
  }).isRequired,
  schoolPrograms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  selectedStudent: PropTypes.shape({
    first_surname: PropTypes.string,
    first_name: PropTypes.string,
  }).isRequired,
  schoolProgram: PropTypes.shape({
    school_program: PropTypes.shape({ school_program_name: PropTypes.string }),
  }),
  schoolProgramSelected: PropTypes.number,
  teachersGuide: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,

  saveStudent: PropTypes.func.isRequired,
  handleSchoolProgramDelete: PropTypes.func.isRequired,
  getSubjectBySchoolProgram: PropTypes.func.isRequired,
  showDispatch: PropTypes.func.isRequired,
  changeDispatch: PropTypes.func.isRequired,
  submitDispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

StudentSchoolProgram.defaultProps = {
  schoolProgram: null,
  schoolProgramSelected: null,
};

const schoolProgramValidation = (values) => {
  const errors = {};
  if (!values.schoolProgramId) errors.schoolProgramId = 'Programa academico es requerido';
  if (!values.studentType) errors.studentType = 'Tipo de estudiante es requerido';
  if (!values.homeUniversity) errors.homeUniversity = 'Universidad de origen es requerido';
  if (values.equivalences && values.equivalences.length) {
    const equivalenceArrayErrors = [];
    values.equivalences.forEach((equivalence, equivalenceIndex) => {
      const equivalenceErrors = {};
      if (!equivalence || !equivalence.qualification) {
        equivalenceErrors.qualification = '*Calificacion es requerido';
        equivalenceArrayErrors[equivalenceIndex] = equivalenceErrors;
      }

      if (!equivalence || !equivalence.subject_id) {
        equivalenceErrors.subject_id = '*Materia es requerido';
        equivalenceArrayErrors[equivalenceIndex] = equivalenceErrors;
      }
    });

    if (equivalenceArrayErrors.length) {
      errors.equivalences = equivalenceArrayErrors;
    }
  }

  return errors;
};

let StudentSchoolProgramWrapper = reduxForm({
  form: 'programa academico del estudiante',
  validate: schoolProgramValidation,
  enableReinitialize: true,
})(StudentSchoolProgram);
const selector = formValueSelector('programa academico del estudiante');

StudentSchoolProgramWrapper = connect(
  (state) => ({
    initialValues: {
      currentPostgraduate: state.studentReducer.selectedSchoolProgram
        ? state.studentReducer.selectedSchoolProgram.current_postgraduate
        : '',
      homeUniversity: state.studentReducer.selectedSchoolProgram
        ? state.studentReducer.selectedSchoolProgram.home_university
        : null,
      typeIncome: state.studentReducer.selectedSchoolProgram
        ? state.studentReducer.selectedSchoolProgram.type_income
        : '',
      creditsGranted: state.studentReducer.selectedSchoolProgram
        ? state.studentReducer.selectedSchoolProgram.credits_granted
        : 0,
      currentStatus: state.studentReducer.selectedSchoolProgram
        ? state.studentReducer.selectedSchoolProgram.current_status
        : '',
      studentType: state.studentReducer.selectedSchoolProgram
        ? state.studentReducer.selectedSchoolProgram.student_type
        : null,
      guideTeacherId: state.studentReducer.selectedSchoolProgram
        ? state.studentReducer.selectedSchoolProgram.guide_teacher_id
        : null,
      schoolProgramId: state.studentReducer.selectedSchoolProgram
        ? state.studentReducer.selectedSchoolProgram.school_program_id
        : null,
      isAvailableFinalWork: state.studentReducer.selectedSchoolProgram
        ? !!state.studentReducer.selectedSchoolProgram.is_available_final_work
        : false,
      isUcvTeacher: state.studentReducer.selectedSchoolProgram
        ? !!state.studentReducer.selectedSchoolProgram.is_ucv_teacher
        : false,
      withWork: state.studentReducer.selectedSchoolProgram
        ? !!state.studentReducer.selectedSchoolProgram.with_work
        : false,
      testPeriod: state.studentReducer.selectedSchoolProgram
        ? !!state.studentReducer.selectedSchoolProgram.test_period
        : false,
      equivalences:
        state.studentReducer.selectedSchoolProgram &&
        !!state.studentReducer.selectedSchoolProgram.equivalence
          ? state.studentReducer.selectedSchoolProgram.equivalence.map((subj) => ({
              subject_id: subj.subject_id,
              qualification: subj.qualification,
            }))
          : [],
    },
    action: state.dialogReducer.action,
    schoolProgramSelected: selector(state, 'schoolProgramId'),
  }),
  { showDispatch: show, submitDispatch: submit, changeDispatch: change }
)(StudentSchoolProgramWrapper);

export default withStyles(styles)(StudentSchoolProgramWrapper);
