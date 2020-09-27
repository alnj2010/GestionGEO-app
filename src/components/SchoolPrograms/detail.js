import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Form, reduxForm, submit, formValueSelector } from 'redux-form';
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
    } = this.props;
    const { func } = this.state;
    return (
      <Form onSubmit={handleSubmit(saveSchoolProgram)}>
        <Grid container>
          <Grid item xs={12}>
            <h3>
              {' '}
              {schoolProgramId
                ? `Programa academico: ${schoolProgram.school_program_name}`
                : 'Nuevo Programa academico'}
            </h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container justify="space-between">
              <RenderFields>
                {[
                  {
                    label: 'Nombre del programa academico',
                    field: 'schoolProgramName',
                    id: 'schoolProgramName',
                    type: 'text',
                  },
                  {
                    label: 'Unidades de credito',
                    field: 'numCu',
                    id: 'numCu',
                    type: 'number',
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
                    label: 'Minimo de UC para presentar la TEG',
                    field: 'minNumCuFinalWork',
                    id: 'minNumCuFinalWork',
                    type: 'number',
                    min: 0,
                    max: numCu,
                    disabled: !numCu,
                  },
                  {
                    label: 'Minimo de semestres para presentar la TEG',
                    field: 'minDuration',
                    id: 'minDuration',
                    type: 'number',
                    min: 1,
                  },
                  {
                    label: '¿Posee examen doctoral?',
                    field: 'doctoralExam',
                    id: 'doctoralExam',
                    type: 'switch',
                  },
                  {
                    label: '¿Otorga un certificado de culminación?',
                    field: 'grantCertificate',
                    id: 'grantCertificate',
                    type: 'switch',
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
                      Cancelar
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    {schoolProgramId ? (
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={() => this.handleDialogShow('delete', handleSchoolProgramDelete)}
                      >
                        Borrar
                      </Button>
                    ) : null}
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

SchoolProgramDetail.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string,
    buttonContainer: PropTypes.string,
    save: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,

  subject: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,

  schoolProgram: PropTypes.shape({ school_program_name: PropTypes.string }).isRequired,

  numCu: PropTypes.number.isRequired,

  schoolProgramId: PropTypes.number.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,

  showDispatch: PropTypes.func.isRequired,
  submitDispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  saveSchoolProgram: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  handleSchoolProgramDelete: PropTypes.func.isRequired,
};

const schoolProgramValidation = (values) => {
  const errors = {};

  if (!values.schoolProgramName) {
    errors.schoolProgramName = 'Nombre del Programa academico es requerido';
  }

  if (!values.numCu) {
    errors.numCu = 'Unidades de credito es requerido';
  }

  if (!values.duration) {
    errors.duration = 'Duracion es requerido';
  }

  if (!values.minNumCuFinalWork) {
    errors.minNumCuFinalWork = 'Minimo de UC para TEG es requerido';
  }

  if (!values.minDuration) {
    errors.minDuration = 'Minimo de semestres es requerido';
  }

  if (!values.grantCertificate && !values.conduciveToDegree) {
    errors.grantCertificate = 'Debe establecer al menos un reconocimiento';
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
  }),
  { showDispatch: show, submitDispatch: submit }
)(SchoolProgramDetailWrapper);

export default withStyles(styles)(SchoolProgramDetailWrapper);
