import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  findStudentById,
  updateStudent,
  deleteStudent,
  cleanSelectedStudent,
  saveStudent,
  deleteSchoolProgram,
  getConstance,
} from '../../actions/student';
import { getList as getTeacherList } from '../../actions/teacher';
import { getSubjectBySchoolProgram } from '../../actions/subject';
import { getList as getSchoolProgramList } from '../../actions/schoolProgram';
import StudentDetail from '../../components/Students/detail';
import { define, cleanDialog } from '../../actions/dialog';
import { getSessionUserRol } from '../../storage/sessionStorage';

class StudentDetailContainer extends Component {
  componentDidMount = () => {
    const rol = getSessionUserRol();
    const {
      match,
      findStudentByIdDispatch,
      defineDispatch,
      getSchoolProgramListDispatch,
      getTeacherListDispatch,
    } = this.props;
    if (match.params.id) findStudentByIdDispatch(match.params.id);
    getSchoolProgramListDispatch();
    getTeacherListDispatch();
    defineDispatch(rol !== 'A' ? 'perfil' : 'estudiante');
  };

  componentWillUnmount = () => {
    const { cleanSelectedStudentDispatch, cleanDialogDispatch } = this.props;
    cleanSelectedStudentDispatch();
    cleanDialogDispatch();
  };

  saveStudent = (values) => {
    const {
      match,
      updateStudentDispatch,
      findStudentByIdDispatch,
      saveStudentDispatch,
      history,
      student,
    } = this.props;
    const payload = { ...values };
    if (match.params.id)
      updateStudentDispatch({
        ...payload,
        id: match.params.id,
        schoolProgramId: student.student[0].school_program_id,
        studentId: student.student[0].id,
        studentType: student.student[0].student_type,
        homeUniversity: student.student[0].home_university,
        typeIncome: student.student[0].type_income,
        isUcvTeacher: student.student[0].is_ucv_teacher,
        isAvailableFinalWork: student.student[0].is_available_final_work,
        creditsGranted: student.student[0].credits_granted,
        withWork: student.student[0].with_work,
        testPeriod: student.student[0].test_period,
        currentStatus: student.student[0].current_status,
        equivalence: student.student[0].equivalence,
        guideTeacherId: student.student[0].guide_teacher_id
          ? student.student[0].guide_teacher_id
          : undefined,
        currentPostgraduate: student.student[0].current_postgraduate,
      });
    else
      saveStudentDispatch({ ...payload }).then((response) => {
        if (response) {
          findStudentByIdDispatch(response).then(() => history.push(`modificar/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.push('/estudiantes');
  };

  handleStudentDelete = () => {
    const { deleteStudentDispatch, history, match } = this.props;
    deleteStudentDispatch(match.params.id).then(() => history.push('/estudiantes'));
  };

  handleDeleteSchoolProgram = (userId, studentId) => {
    const { deleteSchoolProgramDispatch, findStudentByIdDispatch, match } = this.props;
    deleteSchoolProgramDispatch(userId, studentId).then(() =>
      findStudentByIdDispatch(match.params.id)
    );
  };

  render() {
    const {
      student,
      schoolPrograms,
      history,
      getConstanceDispatch,
      listBySchoolPeriod,
      getSubjectBySchoolProgramDispatch,
      teachers,
    } = this.props;
    return (
      <StudentDetail
        schoolPrograms={schoolPrograms}
        teachersGuide={teachers}
        saveStudent={this.saveStudent}
        goBack={this.goBack}
        listBySchoolPeriod={listBySchoolPeriod}
        getSubjectBySchoolProgram={getSubjectBySchoolProgramDispatch}
        userId={student.id}
        student={student}
        handleStudentDelete={this.handleStudentDelete}
        history={history}
        getConstance={getConstanceDispatch}
        handleDeleteSchoolProgram={this.handleDeleteSchoolProgram}
      />
    );
  }
}

StudentDetailContainer.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    student: PropTypes.oneOfType([
      PropTypes.shape({
        school_program_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        student_type: PropTypes.string,
        home_university: PropTypes.string,
        type_income: PropTypes.string,
        is_ucv_teacher: PropTypes.bool,
        is_available_final_work: PropTypes.bool,
        credits_granted: PropTypes.number,
        with_work: PropTypes.bool,
        test_period: PropTypes.bool,
        current_status: PropTypes.string,
        equivalence: PropTypes.arrayOf(PropTypes.shape({})),
        guide_teacher_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        current_postgraduate: PropTypes.string,
      }),
      PropTypes.arrayOf(PropTypes.shape({})),
    ]),
  }).isRequired,

  schoolPrograms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  listBySchoolPeriod: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  }).isRequired,
  getSubjectBySchoolProgramDispatch: PropTypes.func.isRequired,
  findStudentByIdDispatch: PropTypes.func.isRequired,
  updateStudentDispatch: PropTypes.func.isRequired,
  saveStudentDispatch: PropTypes.func.isRequired,
  deleteStudentDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  cleanSelectedStudentDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  getSchoolProgramListDispatch: PropTypes.func.isRequired,
  deleteSchoolProgramDispatch: PropTypes.func.isRequired,
  getConstanceDispatch: PropTypes.func.isRequired,
  getTeacherListDispatch: PropTypes.func.isRequired,
};

StudentDetailContainer.defaultProps = {
  /* teacherId: null,
  teacher: null,
  teacherType: null, */
};

const mS = (state) => ({
  student: state.studentReducer.selectedStudent,
  teachers: state.teacherReducer.list,
  schoolPrograms: state.schoolProgramReducer.list,
  listBySchoolPeriod: state.subjectReducer.listBySchoolPeriod,
});

const mD = {
  findStudentByIdDispatch: findStudentById,
  updateStudentDispatch: updateStudent,
  saveStudentDispatch: saveStudent,
  deleteStudentDispatch: deleteStudent,
  defineDispatch: define,
  cleanSelectedStudentDispatch: cleanSelectedStudent,
  cleanDialogDispatch: cleanDialog,
  getSubjectBySchoolProgramDispatch: getSubjectBySchoolProgram,
  getTeacherListDispatch: getTeacherList,
  getSchoolProgramListDispatch: getSchoolProgramList,
  deleteSchoolProgramDispatch: deleteSchoolProgram,
  getConstanceDispatch: getConstance,
};

export default connect(mS, mD)(StudentDetailContainer);
