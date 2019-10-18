import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import { Form, reduxForm, change, submit, FieldArray, formValueSelector, } from 'redux-form';
import { object, func, bool, number } from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  subtitle:{
    paddingTop:50
  },
  button: {
    width:'100%'
  },
  buttonDelete: {
    marginTop:0,
    padding:10
  },
  buttonDeleteContainer:{
    display:'flex',
    alignItems:'end'
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
    this.setState({ func: func }, () => {
      this.props.show(action);
    });
  };
  unselectedSchoolPrograms = ( pos ) =>{
    const {schoolPrograms, schoolProgramsSelected} =this.props;
    return schoolPrograms.filter( item => !schoolProgramsSelected.some((selected,index)=>selected.id===item.id && pos>index) )
  }

  renderSchoolPrograms = ({ fields, meta: { error, submitFailed } }) => (<Grid container item>    
    {fields.map((schoolProgram, index) => (
    <Fragment key={index}>
      <Grid item xs={5}>
        <RenderFields >{[
          {field: `${schoolProgram}.id`, id: `${schoolProgram}.id`, type: 'select', label:'Programa academico', options: this.unselectedSchoolPrograms(index).map(post => { return { key: post.school_program_name, value: post.id } }) },
        ]}</RenderFields>      
      </Grid>
      <Grid item xs={5}>
        <RenderFields >{[
          {field: `${schoolProgram}.type`, id: `${schoolProgram}.type`, type: 'select', label:'modalidad', options: [{key:'OBLIGATORIA',value:"OB"},{key:'OPTATIVA',value:"OP"}, {key:'ELECTIVA',value:"EL"}].map(type => { return { key: type.key, value: type.value } }) },
        ]}</RenderFields>      
      </Grid>
      <Grid item xs={2} className={this.props.classes.buttonDeleteContainer}>
        <IconButton className={this.props.classes.buttonDelete} aria-label="remover" color="secondary" onClick={() => fields.remove(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Fragment>      
    ))}
    <Fab color="primary" aria-label="Add" className={this.props.classes.fab} disabled={this.props.schoolPrograms && this.props.schoolProgramsSelected && (this.props.schoolPrograms.length===this.props.schoolProgramsSelected.length)} onClick={() => fields.push({})}>
      <AddIcon />
    </Fab>
  </Grid>)

  render = () => {
    const {
      classes,
      handleSubmit,
      saveSubject,
      goBack,
      subjectId,
      handleSubjectDelete,
      pristine,
      submitting,
      valid,
      submit,
    } = this.props;
    const { func } = this.state;

    return (
      <Form onSubmit={handleSubmit(saveSubject)}>
        <Grid container>
          <Grid item xs={12}>
            <h3> {subjectId ? `Materia: ${subjectId}` : 'Nuevo Materia'}</h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container justify="space-between">
              <RenderFields >{[
                { label: 'Codigo de la materia', field: 'subjectCode', id: 'subjectCode', type: 'text' },
                { label: 'Nombre de la materia', field: 'subjectName', id: 'subjectName', type: 'text' },
                { label: 'Tipo de materia',field: `subjectType`, id: `subjectType`, type: 'select', options: [{key:'REGULAR',value:"REG"}, {key:'AMPLIACION',value:"AMP"}].map(type => { return { key: type.key, value: type.value } }) },
                { label: 'Unidades de credito', field: 'uc', id: 'uc', type: 'number', min:0 },
              ]}</RenderFields>
                <Grid item xs={12} className={classes.subtitle}>
                  <Typography variant="h6" gutterBottom>Programa academicos a los que pertenece la materia</Typography>
                </Grid>
               <FieldArray name="schoolPrograms" component={this.renderSchoolPrograms} />
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer} justify="space-between" spacing={16}>
                 
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      className={`${classes.save} ${classes.button}`}
                      onClick={() =>
                        subjectId
                          ? this.handleDialogShow('actualizar', submit)
                          : submit('subject')
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
                    {subjectId ? (
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          this.handleDialogShow('delete', handleSubjectDelete)
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

SubjectDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  saveSubject: func.isRequired,
  goBack: func.isRequired,
  subjectId: number,
  handleSubjectDelete: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
};

const subjectValidation = values => {
  const errors = {};
  if (!values.subjectCode) {
    errors.subjectCode = 'Codigo de Materia es requerido';
  }

  if (!values.subjectName) {
    errors.subjectName = 'Nombre de Materia es requerido';
  }

  if (!values.subjectType) {
    errors.subjectType = 'Tipo requerido';
  }

  if (!values.uc) {
    errors.uc = 'Unidades de credito es requerido';
  }

  if (values.schoolPrograms && values.schoolPrograms.length){
    const schoolProgramsArrayErrors = []
    values.schoolPrograms.forEach((schoolProgram, schoolProgramIndex) => {
      const schoolProgramErrors = {}
      if (!schoolProgram || !schoolProgram.id) {
        schoolProgramErrors.id = 'Requerido'
        schoolProgramsArrayErrors[schoolProgramIndex] = schoolProgramErrors
      }
      if (!schoolProgram || !schoolProgram.type) {
        schoolProgramErrors.type = 'Requerido'
        schoolProgramsArrayErrors[schoolProgramIndex] = schoolProgramErrors
      }

    })
    if (schoolProgramsArrayErrors.length) {
      errors.schoolPrograms = schoolProgramsArrayErrors
    }
  }


  return errors;
};

SubjectDetail = reduxForm({
  form: 'subject',
  validate: subjectValidation,
  enableReinitialize: true,
})(SubjectDetail);
const selector = formValueSelector('subject');

SubjectDetail = connect(
  state => ({
    initialValues: {
      subjectName: state.subjectReducer.selectedSubject.subject_name
        ? state.subjectReducer.selectedSubject.subject_name
        : '',
      subjectCode: state.subjectReducer.selectedSubject.subject_code
        ? state.subjectReducer.selectedSubject.subject_code
        : '',
      subjectType: state.subjectReducer.selectedSubject.subject_type
        ? state.subjectReducer.selectedSubject.subject_type
        : '',
      uc: state.subjectReducer.selectedSubject.uc
        ? state.subjectReducer.selectedSubject.uc
        : '',
      schoolPrograms: state.subjectReducer.selectedSubject.school_programs
        ? state.subjectReducer.selectedSubject.school_programs.map(sp=>({ id:sp.id,type:sp.school_program_subject.type}))
        : [{}],
    },
    schoolProgramsSelected: selector(state, 'schoolPrograms'),
    action: state.dialogReducer.action,
  }),
  { change, show, submit },
)(SubjectDetail);

export default withStyles(styles)(SubjectDetail);
