import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button
} from '@material-ui/core';
import { Form, reduxForm, change, submit, FieldArray, formValueSelector,Field } from 'redux-form';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


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
    marginTop:30,
    padding:10
  },
  button:{
    width:'100%'
  }
});

class StudentInscription extends Component {
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

  unselectedSubjects = ( pos ) => {
    const {subjects, subjectsSelected} =this.props;
    return subjects.filter( item => !subjectsSelected.some((selected,index)=>selected.subjectId===item.id && pos>index) )
  }

  renderSubjects = ({ fields, meta: { error, submitFailed } }) => (<Fragment>    
    {fields.map((subject, index) => (
    <Grid container justify="center" key={index}>
      <Grid container item xs={10}>
        <RenderFields lineal={true} >{[
          {field: `${subject}.subjectId`, id: `${subject}.subjectId`, type: 'select', label:'Materia', options: this.props.subjectInscriptions.map(subject=>({key:subject.subject.subject_name, value:subject.id})) },
          {label: 'Estado Materia', field: `${subject}.status`, id: `${subject}.status`, type: 'select', options: [{key:'CURSANDO', value:'CUR'},{key:'RETIRADO', value:'RET'},{key:'APROBADO', value:'APR'},{key:'REPROBADO', value:'REP'}].map(status => { return { key: status.key, value: status.value } }) },
          {label: 'Nota', field: `${subject}.nota`, id: `${subject}.nota`, type: 'number', min:0, max:20 },
        ]}</RenderFields>      
      </Grid>
      <Grid item xs={2}>
        <IconButton className={this.props.classes.buttonDelete} aria-label="remover" color="secondary" onClick={() => fields.remove(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>      
    ))}
    <Grid container item xs={12} justify={'center'}>
      <Grid item xs={1}>
        <Fab color="primary" aria-label="Add" className={this.props.classes.fab} disabled={this.props.subjects && this.props.subjectsSelected && (this.props.subjects.length===this.props.subjectsSelected.length)} onClick={() => fields.push({schedule:[{endHour:'00:00:00',startHour:'00:00:00'}]})}>
          <AddIcon />
        </Fab>
      </Grid>      
    </Grid>
  </Fragment>)

  
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
      submit,
      schoolPeriods,
      availableSubjects,
    } = this.props;
    const { func } = this.state;
    return (
      <Form onSubmit={handleSubmit(saveInscription)}>
        <Grid container>
          <Grid item xs={12}>
            <h3> Inscripcion estudiante: {studentId}</h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container justify="space-between">
            <RenderFields >{[
              {field: `schoolPeriodId`, id: `schoolPeriodId`, type: 'select', label:'Periodo semestral', options: schoolPeriods.map(sp => { return { key: sp.cod_school_period, value: sp.id } }), onchange: (schoolPeriodId)=>availableSubjects(studentId,schoolPeriodId) },
              {field: `schoolPeriodStatus`, id: `schoolPeriodStatus`, type: 'select', label:'Estado periodo semestral', options: ['RET-A','RET-B','DES-A','DES-B','INC-A','INC-B','REI-A','REI-B','REG'].map(status => { return { key: status, value: status } }) },

            ]}</RenderFields>
              <Grid container item xs={12}>
                <FieldArray name="subjects" component={this.renderSubjects} />
              </Grid>     
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer} justify="space-between" spacing={16}>
                 
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      className={`${classes.save} ${classes.button} `}
                      onClick={() =>
                        studentId
                          ? this.handleDialogShow('actualizar', submit)
                          : submit('student')
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

const studentValidation = values => {
  const errors = {};

  return errors;
};

StudentInscription = reduxForm({
  form: 'inscription',
  validate: studentValidation,
  enableReinitialize: true,
})(StudentInscription);
const selector = formValueSelector('inscription');
StudentInscription = connect(
  state => ({
    initialValues: {
    },
    action: state.dialogReducer.action,
  }),
  { change, show, submit },
)(StudentInscription);

export default withStyles(styles)(StudentInscription);
