import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button
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
  inputLabel: {
    paddingTop: '4%',
  },
  fab: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    alignSelf: 'center',
  },
  form: {
    paddingLeft: '5%',
  },
  largeIcon: {
    width: '36.5%',
    height: '36.5%',
    cursor: 'pointer',
  },
  profilePhoto: {
    width: 360,
    height: 360,
    cursor: 'pointer',
  },
  buttonContainer: { paddingTop: '2%' },
  buttonPostgraduates:{
    margin: theme.spacing.unit,
  },
  save: {
    color: 'white',
    backgroundColor: '#61A956',
    '&:hover': {
      backgroundColor: 'rgb(78, 127, 71)',
    },
  },
  fileInput: {
    display: 'none',
  },
  date: { boxSizing: 'content-box', paddingTop: '4%' },
  lastSave: { justifyContent: 'flex-end', display: 'flex' },
  error: {
    color: 'red',
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
  unselectedPostgraduates = ( pos ) =>{
    const {postgraduates, postgraduatesSelected} =this.props;
    return postgraduates.filter( item => !postgraduatesSelected.some((selected,index)=>selected.id===item.id && pos>index) )
  }

  renderPostgraduates = ({ fields, meta: { error, submitFailed } }) => (<Grid container item>    
    {fields.map((postgraduate, index) => (
    <Fragment key={index}>
      <Grid item xs={5}>
        <RenderFields >{[
          {field: `${postgraduate}.id`, id: `${postgraduate}.id`, type: 'select', placeholder:'Postgrado', options: this.unselectedPostgraduates(index).map(post => { return { key: post.postgraduate_name, value: post.id } }) },
        ]}</RenderFields>      
      </Grid>
      <Grid item xs={5}>
        <RenderFields >{[
          {field: `${postgraduate}.type`, id: `${postgraduate}.type`, type: 'select', placeholder:'modalidad', options: [{key:'OBLIGATORIA',value:"O"}, {key:'ELECTIVA',value:"E"}].map(type => { return { key: type.key, value: type.value } }) },
        ]}</RenderFields>      
      </Grid>
      <Grid item xs={2}>
        <IconButton className={this.props.classes.button} aria-label="remover" color="secondary" onClick={() => fields.remove(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Fragment>      
    ))}
    <Fab color="primary" aria-label="Add" className={this.props.classes.fab} disabled={this.props.postgraduates && this.props.postgraduatesSelected && (this.props.postgraduates.length===this.props.postgraduatesSelected.length)} onClick={() => fields.push({})}>
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
            <Grid container>
              <RenderFields >{[
                { label: 'Codigo de la materia', field: 'subjectCode', id: 'subjectCode', type: 'text' },
                { label: 'Nombre de la materia', field: 'subjectName', id: 'subjectName', type: 'text' },
                { label: 'Tipo de materia',field: `subjectType`, id: `subjectType`, type: 'select', options: [{key:'REGULAR',value:"REG"}, {key:'AMPLIACION',value:"AMP"}].map(type => { return { key: type.key, value: type.value } }) },
                { label: 'Unidades de credito', field: 'uc', id: 'uc', type: 'number', min:0 },
                { label: 'Postgrados a los que pertenece la materia', type: 'label', },
              ]}</RenderFields>
                
               <FieldArray name="postgraduates" component={this.renderPostgraduates} />
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer}>
                  <Grid item xs={4}>
                    <Button variant="contained" onClick={goBack}>
                      Cancelar
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    {subjectId ? (
                      <Button
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
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      className={classes.save}
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

  if (values.postgraduates && values.postgraduates.length){
    const postgraduatesArrayErrors = []
    values.postgraduates.forEach((postgraduate, postgraduateIndex) => {
      const postgraduateErrors = {}
      if (!postgraduate || !postgraduate.id) {
        postgraduateErrors.id = 'Requerido'
        postgraduatesArrayErrors[postgraduateIndex] = postgraduateErrors
      }
      if (!postgraduate || !postgraduate.type) {
        postgraduateErrors.type = 'Requerido'
        postgraduatesArrayErrors[postgraduateIndex] = postgraduateErrors
      }

    })
    if (postgraduatesArrayErrors.length) {
      errors.postgraduates = postgraduatesArrayErrors
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
      postgraduates: state.subjectReducer.selectedSubject.postgraduates
        ? state.subjectReducer.selectedSubject.postgraduates.map(post=>({ id:post.pivot.postgraduate_id,type:post.pivot.type}))
        : [{}],
    },
    postgraduatesSelected: selector(state, 'postgraduates'),
    action: state.dialogReducer.action,
  }),
  { change, show, submit },
)(SubjectDetail);

export default withStyles(styles)(SubjectDetail);
