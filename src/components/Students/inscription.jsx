import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button
} from '@material-ui/core';
import { Form, reduxForm, change, submit, FieldArray, formValueSelector } from 'redux-form';
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
    const {subjectInscriptions, subjectsSelected, subjects,idSchoolPeriod} =this.props;
    if(idSchoolPeriod){      
      let subjectsAux=subjects.map(item=>({
        id:item.id,
        subject:{
          subject_name:item.subject_name
        }
      }))

      return subjectsAux.filter( item => !subjectsSelected.some((selected,index)=>selected.subjectId===item.id && pos>index) )
    }else
      return subjectInscriptions.filter( item => !subjectsSelected.some((selected,index)=>selected.subjectId===item.id && pos>index) )
  }

  renderSubjects = ({ fields, meta: { error, submitFailed } }) => (<Fragment>    
    {fields.map((subject, index) => (
    <Grid container justify="center" key={index}>
      <Grid container item xs={10}>
        <RenderFields lineal={true} >{[
          {field: `${subject}.subjectId`, id: `${subject}.subjectId`, disabled:!!this.props.idSchoolPeriod, type: 'select', label:'Materia', options: this.unselectedSubjects(index).map(subject=>({key:subject.subject.subject_name, value:subject.id})) },
          {label: 'Estado Materia', field: `${subject}.status`, id: `${subject}.status`, type: 'select', options: [{key:'CURSANDO', value:'CUR'},{key:'RETIRADO', value:'RET'},{key:'APROBADO', value:'APR'},{key:'REPROBADO', value:'REP'}].map(status => { return { key: status.key, value: status.value } }) },
          {label: 'Nota', field: `${subject}.nota`, id: `${subject}.nota`, type: 'number', min:0, max:20 },
        ]}</RenderFields>      
      </Grid>
      {this.props.idSchoolPeriod? null :<Grid item xs={2}>
        <IconButton className={this.props.classes.buttonDelete} aria-label="remover" color="secondary" onClick={() => fields.remove(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>}

    </Grid>      
    ))}
    <Grid container item xs={12} justify={'center'}>
      <Grid item xs={1}>
        <Fab 
          color="primary" 
          aria-label="Add" 
          className={this.props.classes.fab} 
          disabled={!!this.props.idSchoolPeriod || this.props.subjectInscriptions.length===0 || (!!this.props.subjectsSelected && this.props.subjectInscriptions.length===this.props.subjectsSelected.length)} 
          onClick={() => fields.push({})}
        >
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
      getAvailableSubjects,
      idSchoolPeriod,
      fullname
    } = this.props;
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
            <RenderFields >{[
              {field: `schoolPeriodId`, disabled:!!idSchoolPeriod, id: `schoolPeriodId`, type: 'select', label:'Periodo semestral', options: schoolPeriods.map(sp => { return { key: sp.cod_school_period, value: sp.id } }), onchange: (schoolPeriodId)=>getAvailableSubjects(studentId,schoolPeriodId) },
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
  if(!values.schoolPeriodId) errors.schoolPeriodId="*Periodo semestral requerido"
  if(!values.schoolPeriodStatus) errors.schoolPeriodStatus="*Estado del periodo semestral requerido"
  if (values.subjects && values.subjects.length){
    const subjectArrayErrors = []
    values.subjects.forEach((subj, subjIndex) => {
      const subjErrors = {}
      if (!subj || !subj.subjectId) {
        subjErrors.subjectId = '*Materia es requerido'
        subjectArrayErrors[subjIndex] = subjErrors
      }
      if (!subj || !subj.status) {
        subjErrors.status = '*Estado es requerido'
        subjectArrayErrors[subjIndex] = subjErrors
      }
      console.log(subj.nota);
      if (!subj || !subj.nota) {
        subjErrors.nota = '*nota es requerido'
        subjectArrayErrors[subjIndex] = subjErrors
      }else if(parseInt(subj.nota)<0 || parseInt(subj.nota)>20){
        subjErrors.nota = '*nota debe estar entre 0 y 20'
        subjectArrayErrors[subjIndex] = subjErrors
      }
  
    })
    
    if (subjectArrayErrors.length) {
      errors.subjects = subjectArrayErrors
    }
  }
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
      schoolPeriodId:state.studentReducer.selectedStudentSchoolPeriod.id
      ? state.studentReducer.selectedStudentSchoolPeriod.id
      : '',
      schoolPeriodStatus:state.studentReducer.selectedStudentSchoolPeriod.status
      ? state.studentReducer.selectedStudentSchoolPeriod.status
      : '',
      subjects:state.studentReducer.selectedStudentSchoolPeriod.enrolled_subjects 
      ? state.studentReducer.selectedStudentSchoolPeriod.enrolled_subjects.map( subject =>({
        subjectId:subject.school_period_subject_teacher_id,
        status:subject.status,
        nota:subject.qualification

      }))
      : ''

    },
    action: state.dialogReducer.action,
    schoolPeriodId: selector(state, 'schoolPeriodId'),
    subjectsSelected: selector(state, 'subjects'),
  }),
  { change, show, submit },
)(StudentInscription);

export default withStyles(styles)(StudentInscription);
