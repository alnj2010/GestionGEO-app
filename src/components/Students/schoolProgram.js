import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import { Form, reduxForm, FieldArray, submit, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields';
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

  handleDialogShow = (action, func) => {
    const { showDispatch } = this.props;
    this.setState({ func }, () => {
      showDispatch(action);
    });
  };

  unselectedSubjects = (pos) => {
    const { subjects, subjectsSelected } = this.props;
    return subjects.filter(
      (item) =>
        !subjectsSelected.some((selected, index) => selected.subject_id === item.id && pos > index)
    );
  };

  renderSubjects = ({ fields }) => {
    const { classes, subjects, subjectsSelected } = this.props;
    return (
      <>
        {fields.map((subject, index) => {
          return (
            // eslint-disable-next-line
            <Grid container justify="center" key={index}>
              <Grid container item xs={10}>
                <RenderFields lineal={[6, 6]}>
                  {[
                    {
                      field: `${subject}.subject_id`,
                      id: `${subject}.subject_id`,
                      type: 'select',
                      label: 'Materia',
                      options: this.unselectedSubjects(index).map((item) => {
                        return {
                          key: item.subject_name,
                          value: item.id,
                        };
                      }),
                    },
                    {
                      field: `${subject}.qualification`,
                      id: `${subject}.qualification`,
                      type: 'number',
                      label: 'Calificacion',
                      min: 0,
                      max: 20,
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
            </Grid>
          );
        })}
        <Grid container item xs={12} justify="center">
          <Grid item xs={1}>
            <Fab
              color="primary"
              aria-label="Add"
              disabled={subjects && subjectsSelected && subjects.length === subjectsSelected.length}
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
    } = this.props;
    const { func } = this.state;
    const rol = getSessionUserRol();
    return (
      <Form onSubmit={handleSubmit(saveStudent)}>
        <Grid container>
          <Grid item xs={12}>
            <h3>
              Estudiante: {selectedStudent.first_surname} {selectedStudent.first_name} <br />
              Programa Academico: {schoolProgram.school_program.school_program_name}
            </h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container justify="space-between">
              <RenderFields>
                {[
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
                    label: '¿Ha finalizado el programa academico?',
                    field: 'endProgram',
                    id: 'endProgram',
                    type: rol === 'A' ? 'switch' : 'hidden',
                  },

                  {
                    label: '¿Puede Inscribir tesis?',
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
                    label: '¿with work?',
                    field: 'withWork',
                    id: 'withWork',
                    type: 'switch',
                    disabled: rol !== 'A',
                  },

                  {
                    label: '¿Ha cursado una materia aprobada dos veces?',
                    field: 'repeatApprovedSubject',
                    id: 'repeatApprovedSubject',
                    type: rol === 'A' ? 'switch' : 'hidden',
                  },
                  {
                    label: '¿Ha cursado una materia ya aplazada?',
                    field: 'repeatReprobatedSubject',
                    id: 'repeatReprobatedSubject',
                    type: rol === 'A' ? 'switch' : 'hidden',
                  },
                  {
                    label: '¿test_period?',
                    field: 'testPeriod',
                    id: 'testPeriod',
                    type: 'switch',
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
                <FieldArray name="equivalences" component={this.renderSubjects} />
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
                      onClick={() => this.handleDialogShow('actualizar', submitDispatch)}
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

                  <Grid item xs={12} sm={3}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                      onClick={() => this.handleDialogShow('delete', handleSchoolProgramDelete)}
                    >
                      Borrar
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

StudentSchoolProgram.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string.isRequired,
    buttonContainer: PropTypes.string.isRequired,
    save: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    buttonDelete: PropTypes.string.isRequired,
  }).isRequired,

  subjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  subjectsSelected: PropTypes.arrayOf(PropTypes.shape({})),

  student: PropTypes.shape({
    first_surname: PropTypes.string,
    first_name: PropTypes.string,
  }).isRequired,
  selectedStudent: PropTypes.shape({
    first_surname: PropTypes.string,
    first_name: PropTypes.string,
  }).isRequired,
  schoolProgram: PropTypes.shape({
    school_program: PropTypes.shape({ school_program_name: PropTypes.string }),
  }).isRequired,

  teachersGuide: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,

  saveStudent: PropTypes.func.isRequired,
  handleSchoolProgramDelete: PropTypes.func.isRequired,

  showDispatch: PropTypes.func.isRequired,
  submitDispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

StudentSchoolProgram.defaultProps = {
  subjectsSelected: [],
};

const schoolProgramValidation = () => {
  const errors = {};

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
      currentPostgraduate: state.studentReducer.selectedSchoolProgram.current_postgraduate
        ? state.studentReducer.selectedSchoolProgram.current_postgraduate
        : '',
      homeUniversity: state.studentReducer.selectedSchoolProgram.home_university
        ? state.studentReducer.selectedSchoolProgram.home_university
        : '',
      typeIncome: state.studentReducer.selectedSchoolProgram.type_income
        ? state.studentReducer.selectedSchoolProgram.type_income
        : '',
      creditsGranted: state.studentReducer.selectedSchoolProgram.credits_granted
        ? state.studentReducer.selectedSchoolProgram.credits_granted
        : 0,
      currentStatus: state.studentReducer.selectedSchoolProgram.current_status
        ? state.studentReducer.selectedSchoolProgram.current_status
        : '',
      studentType: state.studentReducer.selectedSchoolProgram.student_type
        ? state.studentReducer.selectedSchoolProgram.student_type
        : '',
      guideTeacherId: state.studentReducer.selectedSchoolProgram.guide_teacher_id
        ? state.studentReducer.selectedSchoolProgram.guide_teacher_id
        : '',

      endProgram: !!state.studentReducer.selectedSchoolProgram.end_program,
      isAvailableFinalWork: !!state.studentReducer.selectedSchoolProgram.is_available_final_work,
      isUcvTeacher: !!state.studentReducer.selectedSchoolProgram.is_ucv_teacher,
      withWork: !!state.studentReducer.selectedSchoolProgram.with_work,
      repeatApprovedSubject: !!state.studentReducer.selectedSchoolProgram.repeat_approved_subject,
      repeatReprobatedSubject: !!state.studentReducer.selectedSchoolProgram
        .repeat_reprobated_subject,
      testPeriod: !!state.studentReducer.selectedSchoolProgram.test_period,
      equivalences: state.studentReducer.selectedSchoolProgram.equivalence
        ? state.studentReducer.selectedSchoolProgram.equivalence.map((subj) => ({
            subject_id: subj.subject_id,
            qualification: subj.qualification,
          }))
        : [],
    },
    action: state.dialogReducer.action,
    subjectsSelected: selector(state, 'equivalences'),
  }),
  { showDispatch: show, submitDispatch: submit }
)(StudentSchoolProgramWrapper);

export default withStyles(styles)(StudentSchoolProgramWrapper);
