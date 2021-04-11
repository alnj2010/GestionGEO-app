import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { Form, reduxForm, submit, formValueSelector, change } from 'redux-form';
import PropTypes from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields';

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
});

class SchoolProgramDetail extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { conduciveToDegree, grantCertificate, changeDispatch } = this.props;
    if (conduciveToDegree !== nextProps.conduciveToDegree && nextProps.conduciveToDegree) {
      changeDispatch('programa academico', 'grantCertificate', false);
    }

    if (grantCertificate !== nextProps.grantCertificate && nextProps.grantCertificate) {
      changeDispatch('programa academico', 'conduciveToDegree', false);
    }
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
      saveSchoolProgram,
      goBack,
      schoolProgramId,
      handleSchoolProgramDelete,
      pristine,
      submitting,
      valid,
      submitDispatch,
      schoolProgram,
      numCu,
      conduciveToDegreeSelected,
      doctoralExam,
    } = this.props;
    const { func } = this.state;
    return (
      <Form onSubmit={handleSubmit(saveSchoolProgram)}>
        <Grid container>
          <Grid item xs={12}>
            <h3>
              {' '}
              {schoolProgramId
                ? `Programa academico: ${schoolProgram.school_program_name || ''}`
                : 'Nuevo Programa academico'}
            </h3>
            <hr />
          </Grid>
          {!schoolProgramId || schoolProgram.id ? (
            <Grid item xs={12} className={classes.form}>
              <Grid container justify="space-between">
                <RenderFields>
                  {[
                    {
                      label: 'Programa academico',
                      field: 'schoolProgramName',
                      id: 'schoolProgramName',
                      type: 'text',
                      tooltipText:
                        'Suministrar el Nombre del Programa Academico. Ej: Especializacion en Hidrocarburos, Doctorado, etc...',
                    },
                    {
                      label: 'Unidades de credito',
                      field: 'numCu',
                      id: 'numCu',
                      type: conduciveToDegreeSelected ? 'number' : 'hidden',
                      min: 0,
                    },
                    {
                      label: 'Duracion (Semestres)',
                      field: 'duration',
                      id: 'duration',
                      type: 'number',
                      min: 0,
                    },
                    {
                      label: 'min. de UC para la TEG',
                      field: 'minNumCuFinalWork',
                      id: 'minNumCuFinalWork',
                      type: conduciveToDegreeSelected ? 'number' : 'hidden',
                      min: 0,
                      max: numCu,
                      disabled: !numCu,
                      tooltipText:
                        'Ingrese la minima cantidad de Unidades de Credito necesaria para presentar el Trabajo especial de Grado',
                    },
                    {
                      label: 'min. de semestres para la TEG',
                      field: 'minDuration',
                      id: 'minDuration',
                      type: conduciveToDegreeSelected ? 'number' : 'hidden',
                      min: 1,
                      tooltipText:
                        'Ingrese la cantidad minima de semestres necesarios para presentar el Trabajo especial de Grado',
                    },
                    {
                      label: 'min. de UC para examen doctoral',
                      field: 'minCuToDoctoralExam',
                      id: 'minCuToDoctoralExam',
                      type: conduciveToDegreeSelected && doctoralExam ? 'number' : 'hidden',
                      min: 0,
                      max: numCu,
                      disabled: !numCu || !doctoralExam,
                      tooltipText:
                        'Ingrese la cantidad minima de semestres necesarios para presentar el examen doctoral',
                    },
                    {
                      label: '¿Otorga un certificado de culminación?',
                      field: 'grantCertificate',
                      id: 'grantCertificate',
                      type: 'switch',
                    },
                    {
                      label: '¿Posee examen doctoral?',
                      field: 'doctoralExam',
                      id: 'doctoralExam',
                      type: conduciveToDegreeSelected ? 'switch' : 'hidden',
                    },

                    {
                      label: '¿Otorga un grado academico?',
                      field: 'conduciveToDegree',
                      id: 'conduciveToDegree',
                      type: 'switch',
                    },
                  ]}
                </RenderFields>
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
                          schoolProgramId
                            ? this.handleDialogShow('actualizar', submitDispatch)
                            : submitDispatch('programa academico')
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
                      {schoolProgramId ? (
                        <Button
                          className={classes.button}
                          variant="contained"
                          color="secondary"
                          onClick={() => this.handleDialogShow('borrar', handleSchoolProgramDelete)}
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

SchoolProgramDetail.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string,
    buttonContainer: PropTypes.string,
    save: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,

  schoolProgram: PropTypes.shape({ school_program_name: PropTypes.string }),

  // eslint-disable-next-line react/forbid-prop-types
  numCu: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  // eslint-disable-next-line react/forbid-prop-types
  schoolProgramId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  conduciveToDegreeSelected: PropTypes.bool,
  showDispatch: PropTypes.func.isRequired,
  submitDispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  saveSchoolProgram: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  handleSchoolProgramDelete: PropTypes.func.isRequired,
};
SchoolProgramDetail.defaultProps = {
  schoolProgram: null,
  numCu: null,
  schoolProgramId: null,
  conduciveToDegreeSelected: false,
};

const schoolProgramValidation = (values) => {
  const errors = {};

  if (!values.schoolProgramName) {
    errors.schoolProgramName = 'Nombre del Programa academico es requerido';
  }

  if (values.conduciveToDegree) {
    if (!values.duration) errors.duration = 'Es requerido';
    if (!values.numCu) errors.numCu = 'Es requerido';
    if (!values.minNumCuFinalWork) errors.minNumCuFinalWork = 'Es requerido';
    if (!values.minDuration) errors.minDuration = 'Es requerido';
  }

  if (!values.grantCertificate && !values.conduciveToDegree) {
    errors.grantCertificate =
      'Debe existir al menos un certigicado o grado para el periodo escolar';
  }

  return errors;
};
const selector = formValueSelector('programa academico');
let SchoolProgramDetailWrapper = reduxForm({
  form: 'programa academico',
  validate: schoolProgramValidation,
  enableReinitialize: true,
})(SchoolProgramDetail);

SchoolProgramDetailWrapper = connect(
  (state) => ({
    initialValues: {
      schoolProgramName: state.schoolProgramReducer.selectedSchoolProgram.school_program_name
        ? state.schoolProgramReducer.selectedSchoolProgram.school_program_name
        : '',
      numCu: state.schoolProgramReducer.selectedSchoolProgram.num_cu
        ? state.schoolProgramReducer.selectedSchoolProgram.num_cu
        : '',
      duration: state.schoolProgramReducer.selectedSchoolProgram.duration
        ? state.schoolProgramReducer.selectedSchoolProgram.duration
        : '',
      minNumCuFinalWork: state.schoolProgramReducer.selectedSchoolProgram.min_num_cu_final_work
        ? state.schoolProgramReducer.selectedSchoolProgram.min_num_cu_final_work
        : '',
      minCuToDoctoralExam: state.schoolProgramReducer.selectedSchoolProgram.min_cu_to_doctoral_exam
        ? state.schoolProgramReducer.selectedSchoolProgram.min_cu_to_doctoral_exam
        : '',
      minDuration: state.schoolProgramReducer.selectedSchoolProgram.min_duration
        ? state.schoolProgramReducer.selectedSchoolProgram.min_duration
        : '',
      grantCertificate: state.schoolProgramReducer.selectedSchoolProgram.grant_certificate
        ? state.schoolProgramReducer.selectedSchoolProgram.grant_certificate
        : false,
      conduciveToDegree: state.schoolProgramReducer.selectedSchoolProgram.conducive_to_degree
        ? state.schoolProgramReducer.selectedSchoolProgram.conducive_to_degree
        : false,
      doctoralExam: state.schoolProgramReducer.selectedSchoolProgram.doctoral_exam
        ? state.schoolProgramReducer.selectedSchoolProgram.doctoral_exam
        : false,
    },
    action: state.dialogReducer.action,
    numCu: selector(state, 'numCu'),
    conduciveToDegreeSelected: selector(state, 'conduciveToDegree'),
    conduciveToDegree: selector(state, 'conduciveToDegree'),
    grantCertificate: selector(state, 'grantCertificate'),
    doctoralExam: selector(state, 'doctoralExam'),
  }),
  { showDispatch: show, submitDispatch: submit, changeDispatch: change }
)(SchoolProgramDetailWrapper);

export default withStyles(styles)(SchoolProgramDetailWrapper);
