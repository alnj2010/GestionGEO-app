import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button
} from '@material-ui/core';
import { Form, reduxForm, change, submit } from 'redux-form';
import { object, func, bool, number } from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields'

const styles = theme => ({
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
  button:{
    width:'100%'
  }
});

class SchoolProgramDetail extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  handleDialogShow = (action, func) => {
    this.setState({ func: func }, () => {
      this.props.show(action);
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
      submit,
    } = this.props;
    const { func } = this.state;
    return (
      <Form onSubmit={handleSubmit(saveSchoolProgram)}>
        <Grid container>
          <Grid item xs={12}>
            <h3> {schoolProgramId ? `Programa academico: ${schoolProgramId}` : 'Nuevo Programa academico'}</h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container justify="space-between">
              <RenderFields >{[
                { label: 'Nombre del programa academico', field: 'schoolProgramName', id: 'schoolProgramName', type: 'text' },
                { label: 'Unidades de credito', field: 'numCu', id: 'numCu', type: 'number', min:0 },
                { label: 'Duracion (Años)', field: 'duration', id: 'duration', type: 'number', min:0 },

              ]}</RenderFields>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer} justify="space-between" spacing={16}>
                 
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      className={`${classes.save} ${classes.button}`}
                      onClick={() =>
                        schoolProgramId
                          ? this.handleDialogShow('actualizar', submit)
                          : submit('schoolProgram')
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
                        onClick={() =>
                          this.handleDialogShow('delete', handleSchoolProgramDelete)
                        }
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
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  saveSchoolProgram: func.isRequired,
  goBack: func.isRequired,
  schoolProgramId: number,
  handleSchoolProgramDelete: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
};

const schoolProgramValidation = values => {
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


  return errors;
};

SchoolProgramDetail = reduxForm({
  form: 'schoolProgram',
  validate: schoolProgramValidation,
  enableReinitialize: true,
})(SchoolProgramDetail);

SchoolProgramDetail = connect(
  state => ({
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
    },
    action: state.dialogReducer.action,
  }),
  { change, show, submit },
)(SchoolProgramDetail);

export default withStyles(styles)(SchoolProgramDetail);
