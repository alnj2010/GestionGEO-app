import React, { Component } from 'react';
import MaterialTable from 'material-table';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import { Form, reduxForm, FieldArray, submit, formValueSelector, Field } from 'redux-form';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import Download from '@material-ui/icons/Archive';
import Inscription from '@material-ui/icons/HowToVote';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import RenderFields from '../RenderFields';
import { getSessionUserRol } from '../../storage/sessionStorage';
import {
  STUDENT_TYPE,
  GENDER,
  NATIONALITY,
  LEVEL_INSTRUCTION,
  CONSTANCES,
  USER_INSTANCE,
  STUDENT_STATUS,
} from '../../services/constants';
import { jsonToOptions, reverseJson } from '../../helpers';

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

class StudentDetail extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { schoolProgramSelected, getSubjectBySchoolProgram } = this.props;
    const { schoolProgramSelected: oldSchoolProgramSelected } = prevProps;
    if (schoolProgramSelected && schoolProgramSelected !== oldSchoolProgramSelected) {
      getSubjectBySchoolProgram(schoolProgramSelected);
    }
  }

  handleDialogShow = (action, func) => {
    const { showDispatch } = this.props;
    this.setState({ func }, () => {
      showDispatch(action);
    });
  };

  unselectedSubjects = (pos) => {
    const { listBySchoolPeriod: subjects, subjectsSelected } = this.props;
    return subjects.filter(
      (item) =>
        !subjectsSelected.some((selected, index) => selected.subjectId === item.id && pos > index)
    );
  };

  renderSubjects = ({ fields }) => {
    const { classes, listBySchoolPeriod: subjects, subjectsSelected } = this.props;
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
                      field: `${subject}.subjectId`,
                      id: `${subject}.subjectId`,
                      type: 'select',
                      label: 'Asignatura',
                      options: this.unselectedSubjects(index).map((item) => {
                        return {
                          key: item.name,
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
      userId,
      handleStudentDelete,
      pristine,
      submitting,
      valid,
      submitDispatch,
      schoolPrograms,
      student,
      handleDeleteSchoolProgram,
      history,
      getConstance,
      teachersGuide,
      width,
    } = this.props;
    const { func } = this.state;
    const rol = getSessionUserRol();
    const matches = isWidthUp('sm', width);
    const statusStudent = reverseJson(STUDENT_STATUS);

    return (
      <Form onSubmit={handleSubmit(saveStudent)}>
        <Grid container>
          <Grid item xs={12}>
            <h3>
              {userId
                ? `Estudiante: ${student.first_surname} ${student.first_name}`
                : 'Nuevo Estudiante'}
            </h3>
            <hr />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Grid container justify="space-between">
              <RenderFields>
                {[
                  {
                    label: 'Nombre',
                    field: 'firstName',
                    id: 'firstName',
                    type: 'text',
                  },
                  {
                    label: 'Segundo Nombre',
                    field: 'secondName',
                    id: 'secondName',
                    type: 'text',
                  },
                  {
                    label: 'Apellido',
                    field: 'firstSurname',
                    id: 'firstSurname',
                    type: 'text',
                  },
                  {
                    label: 'Segundo apellido',
                    field: 'secondSurname',
                    id: 'secondSurname',
                    type: 'text',
                  },
                  {
                    label: 'Cedula',
                    field: 'identification',
                    id: 'identification',
                    type: 'text',
                  },
                  {
                    label: 'Email',
                    field: 'email',
                    id: 'email',
                    type: 'text',
                  },
                  {
                    label: 'Movil',
                    field: 'mobile',
                    id: 'mobile',
                    type: 'phone',
                  },

                  {
                    label: 'Telefono de habitación',
                    field: 'telephone',
                    id: 'telephone',
                    type: 'phone',
                  },
                  {
                    label: 'Telefono Trabajo',
                    field: 'workPhone',
                    id: 'workPhone',
                    type: 'phone',
                  },
                  {
                    label: 'Sexo',
                    field: `sex`,
                    id: `sex`,
                    type: 'select',
                    options: jsonToOptions(GENDER),
                    disabled: rol !== 'A',
                  },
                  {
                    label: 'Nacionalidad',
                    field: `nationality`,
                    id: `nationality`,
                    type: 'select',
                    options: jsonToOptions(NATIONALITY),
                    disabled: rol !== 'A',
                  },
                  {
                    label: 'Nivel de instruccion',
                    field: 'levelInstruction',
                    id: 'levelInstruction',
                    type: 'select',
                    options: jsonToOptions(LEVEL_INSTRUCTION),
                  },
                  {
                    label: 'Programa academico',
                    field: `schoolProgram`,
                    id: `schoolProgram`,
                    type: userId ? 'hidden' : 'select',
                    options: schoolPrograms.map((post) => {
                      return {
                        key: post.school_program_name,
                        value: post.id,
                      };
                    }),
                    disabled: rol !== 'A',
                  },
                  {
                    label: 'Tipo',
                    field: `studentType`,
                    id: `studentType`,
                    type: userId ? 'hidden' : 'select',
                    options: jsonToOptions(STUDENT_TYPE),
                    disabled: rol !== 'A',
                  },
                  {
                    label: 'Tipo de ingreso',
                    field: 'typeIncome',
                    id: 'typeIncome',
                    type: !userId && rol === 'A' ? 'text' : 'hidden',
                    tooltipText:
                      'Medio por el cual el estudiante ingreso al Postgrado de Geoquímica. Ej. Opsu',
                  },
                  {
                    label: 'Creditos otorgados',
                    field: 'creditsGranted',
                    id: 'creditsGranted',
                    type: !userId && rol === 'A' ? 'number' : 'hidden',
                    min: 0,
                    tooltipText:
                      'Unidades de Credito reconocidas antes de ingresar al Postgrado de Geoquímica',
                  },

                  {
                    label: 'Universidad de Origen',
                    field: 'homeUniversity',
                    id: 'homeUniversity',
                    type: !userId && rol === 'A' ? 'text' : 'hidden',
                    disabled: rol !== 'A',
                    tooltipText:
                      'Universidad o instituto del cual proviene el estudiante. Ej. Universidad Central de Venezuela, Universidad Simon Bolivar, Universidad de Carabobo, etc... ',
                  },
                  {
                    label: 'Profesor Guia',
                    field: `guideTeacherId`,
                    id: `guideTeacherId`,
                    type: !userId && rol === 'A' ? 'select' : 'hidden',
                    options: teachersGuide.map((item) => ({
                      key: `${item.first_name} ${item.first_surname}`,
                      value: item.id,
                    })),
                    disabled: rol !== 'A',
                  },

                  {
                    label: '¿Posee alguna discapacidad?',
                    field: 'withDisabilities',
                    id: 'withDisabilities',
                    type: rol === 'A' ? 'switch' : 'hidden',
                  },
                  {
                    label: '¿Profesor de la UCV?',
                    field: 'isUcvTeacher',
                    id: 'isUcvTeacher',
                    type: !userId && rol === 'A' ? 'switch' : 'hidden',
                    disabled: rol !== 'A',
                  },
                  {
                    label: '¿Posee empleo actualmente?',
                    field: 'withWork',
                    id: 'withWork',
                    type: !userId && rol === 'A' ? 'switch' : 'hidden',
                    disabled: rol !== 'A',
                  },
                  {
                    label: '¿Usuario activo?',
                    field: 'active',
                    id: 'active',
                    type: userId && rol === 'A' ? 'switch' : 'hidden',
                    tooltipText:
                      'Campo que habilita al usuario el poder ingresar al sistema GestionGeo. Por defecto es SI',
                  },
                  {
                    label: '¿Puede Inscribir tesis?',
                    field: 'isAvailableFinalWork',
                    id: 'isAvailableFinalWork',
                    type: !userId && rol === 'A' ? 'switch' : 'hidden',
                    tooltipText:
                      'Habilitar de forma manual la inscripcion de tesis de un estudiante en un Programa Academico',
                  },
                ]}
              </RenderFields>
              <Field component="input" name="userId" type="hidden" style={{ height: 0 }} />
            </Grid>
            {!userId && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Asignaturas por equivalencia
                  </Typography>
                </Grid>
                <Grid container item xs={12}>
                  <FieldArray name="equivalence" component={this.renderSubjects} />
                </Grid>
              </>
            )}

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
                        userId
                          ? this.handleDialogShow('actualizar', submitDispatch)
                          : submitDispatch('estudiante')
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
                    {userId ? (
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={() => this.handleDialogShow('borrar', handleStudentDelete)}
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
        {userId && (
          <Grid container justify="center">
            <Grid item xs={12} style={{ marginTop: '30px' }}>
              <MaterialTable
                title={matches ? 'Programas Academicos del estudiante' : ''}
                components={{
                  Action: (props) => {
                    const {
                      action: { id, onClick },
                      data,
                    } = props;
                    switch (id) {
                      case 'edit':
                        return (
                          <Tooltip title="Editar informacion del estudiante en el Programa Academico">
                            <EditIcon
                              style={{ cursor: 'pointer', marginLeft: '30px' }}
                              onClick={(event) => onClick(event, data)}
                            />
                          </Tooltip>
                        );
                      case 'inscription':
                        return (
                          <Tooltip title="Inscribir al estudiante en el Programa Academico">
                            <Inscription
                              style={{ cursor: 'pointer' }}
                              onClick={(event) => onClick(event, data)}
                            />
                          </Tooltip>
                        );
                      case 'constances':
                        return (
                          <div>
                            <Tooltip title="Descargar constancias">
                              <FormControl>
                                <InputLabel
                                  htmlFor={`select-contance-${data.id}-label`}
                                  style={{ top: 0, transform: 'none' }}
                                >
                                  <Download />
                                </InputLabel>
                                <Select
                                  label={`select-contance-${data.id}-label`}
                                  id={`select-contance-${data.id}`}
                                  input={<InputBase />}
                                  value=""
                                  onChange={(event) =>
                                    getConstance(data.id, USER_INSTANCE.S, event.target.value)
                                  }
                                >
                                  {CONSTANCES.S.map(({ name, constanceType }) => (
                                    <MenuItem key={constanceType} value={constanceType}>
                                      {name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Tooltip>
                          </div>
                        );
                      case 'delete':
                        if (student.student.length === 1) {
                          return '';
                        }
                        return (
                          <Tooltip title="Remover al estudiante del Programa Academico">
                            <DeleteIcon
                              style={{ cursor: 'pointer' }}
                              onClick={(event) => onClick(event, data)}
                            />
                          </Tooltip>
                        );
                      case 'add':
                        return (
                          <Tooltip title="Agregar al estudiante un nuevo programa academico">
                            <Chip
                              style={{ fontWeight: 'bold' }}
                              color="primary"
                              label="+ Agregar"
                              onClick={(event) => onClick(event, data)}
                            />
                          </Tooltip>
                        );
                      default:
                        return 'x';
                    }
                  },
                }}
                columns={[
                  { title: '#', field: 'id', hidden: true },
                  { title: 'Programa Academico', field: 'schoolProgram' },
                  { title: 'Estatus Actual', field: 'current_status' },
                ]}
                data={student.student.map((item) => ({
                  ...item,
                  current_status: statusStudent[item.current_status],
                  schoolProgram: item.school_program.school_program_name,
                }))}
                localization={{
                  header: {
                    actions: 'Acciones',
                  },
                }}
                actions={[
                  {
                    id: 'edit',
                    icon: 'visibility',
                    tooltip: 'Ver programa academico',
                    onClick: (_, rowData) => {
                      const selectedSchoolProgram = student.student.find(
                        (item) => item.id === rowData.id
                      );
                      history.push(
                        `${history.location.pathname}/programa-academico/${rowData.id}`,
                        {
                          selectedSchoolProgram: { ...selectedSchoolProgram },
                          selectedStudent: { ...student },
                        }
                      );
                    },
                  },

                  {
                    id: 'inscription',
                    icon: Inscription,
                    tooltip: 'Inscribir',
                    onClick: (_, rowData) =>
                      history.push(`/usuarios/estudiantes/inscripciones/${userId}/${rowData.id}`),
                  },
                  {
                    id: 'constances',
                    icon: Download,
                    onClick: () => null,
                  },
                  {
                    id: 'delete',
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick: (_, rowData) => {
                      this.handleDialogShow('eliminar', () =>
                        handleDeleteSchoolProgram(userId, rowData.id)
                      );
                    },
                  },
                  {
                    id: 'add',
                    icon: 'add',
                    tooltip: 'Agregar programa academico',
                    isFreeAction: true,
                    onClick: () =>
                      history.push(`${history.location.pathname}/programa-academico/agregar`, {
                        selectedStudent: { ...student },
                      }),
                  },
                ]}
              />
            </Grid>
          </Grid>
        )}
        <Dialog handleAgree={func} />
      </Form>
    );
  };
}

StudentDetail.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string,
    buttonContainer: PropTypes.string,
    save: PropTypes.string,
    button: PropTypes.string,
    buttonDelete: PropTypes.string,
  }).isRequired,

  schoolPrograms: PropTypes.arrayOf(
    PropTypes.shape({
      school_program_name: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ).isRequired,
  teachersGuide: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getSubjectBySchoolProgram: PropTypes.func.isRequired,
  listBySchoolPeriod: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  schoolProgramSelected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  subjectsSelected: PropTypes.arrayOf(PropTypes.shape({})),
  width: PropTypes.string.isRequired,
  student: PropTypes.shape({
    first_surname: PropTypes.string,
    first_name: PropTypes.string,
    second_name: PropTypes.string,
    second_surname: PropTypes.string,
    student: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({}))]),
  }).isRequired,

  // eslint-disable-next-line react/forbid-prop-types
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  handleDeleteSchoolProgram: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({ pathname: PropTypes.string }),
  }).isRequired,
  getConstance: PropTypes.func.isRequired,

  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,

  saveStudent: PropTypes.func.isRequired,
  handleStudentDelete: PropTypes.func.isRequired,

  showDispatch: PropTypes.func.isRequired,
  submitDispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

StudentDetail.defaultProps = {
  subjectsSelected: [],
  userId: null,
  schoolProgramSelected: null,
};

const studentValidation = (values) => {
  const errors = {};
  if (!values.identification) {
    errors.identification = 'Cedula es requerida';
  }
  if (!values.firstName) {
    errors.firstName = 'Nombre es requerido';
  } else if (/(?=[0-9])/.test(values.firstName))
    errors.firstName = 'El nombre no debe contener numeros';

  if (!values.firstSurname) {
    errors.firstSurname = 'Apellido es requerido';
  } else if (/(?=[0-9])/.test(values.firstSurname))
    errors.firstSurname = 'El Apellido no debe contener numeros';
  if (!values.mobile || values.mobile === '(   )    -    ') {
    errors.mobile = 'movil es requerido';
  }
  if (!values.email) {
    errors.email = 'Email es requerido';
  } else if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.email)) {
    errors.email = 'Introduce un email valido';
  }

  if (values.equivalence && values.equivalence.length) {
    const subjectArrayErrors = [];
    values.equivalence.forEach((subj, subjIndex) => {
      const subjErrors = {};
      if (!subj || !subj.subjectId) {
        subjErrors.subjectId = '*Materia es requerido';
        subjectArrayErrors[subjIndex] = subjErrors;
      }
      if (!subj || !subj.qualification) {
        subjErrors.qualification = '*calificacion es requerido';
        subjectArrayErrors[subjIndex] = subjErrors;
      }
    });

    if (subjectArrayErrors.length) {
      errors.equivalence = subjectArrayErrors;
    }
  }

  if (!values.nationality) errors.nationality = ' Nacionalidad Requerido';
  if (!values.sex) errors.sex = ' Sexo Requerido';
  if (!values.schoolProgram) errors.schoolProgram = 'Programa academico del estudiante Requerido';
  if (!values.studentType) errors.studentType = ' Tipo Requerido';
  if (!values.homeUniversity) errors.homeUniversity = 'Universidad de origen Requerido';
  if (!values.levelInstruction) errors.levelInstruction = ' Nivel de instruccion Requerido';

  return errors;
};

let StudentDetailWrapper = reduxForm({
  form: 'estudiante',
  validate: studentValidation,
  enableReinitialize: true,
})(StudentDetail);
const selector = formValueSelector('estudiante');

StudentDetailWrapper = connect(
  (state) => ({
    initialValues: {
      identification: state.studentReducer.selectedStudent.identification
        ? state.studentReducer.selectedStudent.identification
        : '',
      firstName: state.studentReducer.selectedStudent.first_name
        ? state.studentReducer.selectedStudent.first_name
        : '',
      secondName: state.studentReducer.selectedStudent.second_name
        ? state.studentReducer.selectedStudent.second_name
        : '',
      firstSurname: state.studentReducer.selectedStudent.first_surname
        ? state.studentReducer.selectedStudent.first_surname
        : '',
      secondSurname: state.studentReducer.selectedStudent.second_surname
        ? state.studentReducer.selectedStudent.second_surname
        : '',
      email: state.studentReducer.selectedStudent.email
        ? state.studentReducer.selectedStudent.email
        : '',
      mobile: state.studentReducer.selectedStudent.mobile
        ? state.studentReducer.selectedStudent.mobile
        : '(   )    -    ',
      telephone: state.studentReducer.selectedStudent.telephone
        ? state.studentReducer.selectedStudent.telephone
        : '(   )    -    ',
      workPhone: state.studentReducer.selectedStudent.work_phone
        ? state.studentReducer.selectedStudent.work_phone
        : '(   )    -    ',
      schoolProgram: state.studentReducer.selectedStudent.student
        ? state.studentReducer.selectedStudent.student.school_program_id
        : '',
      studentType: state.studentReducer.selectedStudent.student
        ? state.studentReducer.selectedStudent.student.student_type
        : '',
      typeIncome: state.studentReducer.selectedStudent.student
        ? state.studentReducer.selectedStudent.student.type_income
        : '',
      creditsGranted: state.studentReducer.selectedStudent.student
        ? state.studentReducer.selectedStudent.student.credits_granted
        : 0,
      userId: state.studentReducer.selectedStudent.student
        ? state.studentReducer.selectedStudent.student.id
        : null,
      active: !!state.studentReducer.selectedStudent.active,
      homeUniversity: state.studentReducer.selectedStudent.student
        ? state.studentReducer.selectedStudent.student.home_university
        : '',
      sex: state.studentReducer.selectedStudent.sex ? state.studentReducer.selectedStudent.sex : '',
      nationality: state.studentReducer.selectedStudent.nationality
        ? state.studentReducer.selectedStudent.nationality
        : '',
      isUcvTeacher: state.studentReducer.selectedStudent.student
        ? !!state.studentReducer.selectedStudent.student.is_ucv_teacher
        : false,
      withWork: state.studentReducer.selectedStudent.student
        ? !!state.studentReducer.selectedStudent.student.with_work
        : false,
      isAvailableFinalWork: state.studentReducer.selectedStudent.student
        ? !!state.studentReducer.selectedStudent.student.is_available_final_work
        : false,
      levelInstruction: state.studentReducer.selectedStudent.level_instruction
        ? state.studentReducer.selectedStudent.level_instruction
        : '',
      equivalence: [],

      withDisabilities: state.studentReducer.selectedStudent.with_disabilities
        ? !!state.studentReducer.selectedStudent.with_disabilities
        : false,
    },
    action: state.dialogReducer.action,
    schoolProgramSelected: selector(state, 'schoolProgram'),
    subjectsSelected: selector(state, 'equivalence'),
  }),
  { showDispatch: show, submitDispatch: submit }
)(StudentDetailWrapper);

export default withStyles(styles)(withWidth()(StudentDetailWrapper));
