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
  getStudentConstance,
} from '../../actions/student';
import { getList as getSubjectList } from '../../actions/subject';
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
      getSubjectListDispatch,
    } = this.props;
    if (match.params.id) findStudentByIdDispatch(match.params.id);
    getSchoolProgramListDispatch();
    getSubjectListDispatch();
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
          findStudentByIdDispatch(response).then(() => history.push(`edit/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleStudentDelete = () => {
    const { deleteStudentDispatch, history, match } = this.props;
    deleteStudentDispatch(match.params.id).then(() => history.push('/estudiantes'));
  };

  handleDeleteSchoolProgram = (userId, studentId) => {
    const { deleteSchoolProgramDispatch, history } = this.props;
    deleteSchoolProgramDispatch(userId, studentId).then(() =>
      history.push(`/estudiantes/edit/${userId}`)
    );
  };

  render() {
    const { student, schoolPrograms, subjects, history, getStudentConstanceDispatch } = this.props;
    return (
      <StudentDetail
        schoolPrograms={schoolPrograms}
        saveStudent={this.saveStudent}
        goBack={this.goBack}
        studentId={student.id}
        subjects={subjects}
        student={student}
        handleStudentDelete={this.handleStudentDelete}
        history={history}
        getStudentConstance={getStudentConstanceDispatch}
        handleDeleteSchoolProgram={this.handleDeleteSchoolProgram}
      />
    );
  }
}

StudentDetailContainer.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    student: PropTypes.arrayOf(
      PropTypes.shape({
        school_program_id: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        student_type: PropTypes.string.isRequired,
        home_university: PropTypes.string.isRequired,
        type_income: PropTypes.string.isRequired,
        is_ucv_teacher: PropTypes.bool.isRequired,
        is_available_final_work: PropTypes.bool.isRequired,
        credits_granted: PropTypes.number.isRequired,
        with_work: PropTypes.bool.isRequired,
        test_period: PropTypes.bool.isRequired,
        current_status: PropTypes.string.isRequired,
        equivalence: PropTypes.arrayOf(PropTypes.shape({})),
        guide_teacher_id: PropTypes.number.isRequired,
        current_postgraduate: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,

  schoolPrograms: PropTypes.shape({}).isRequired,
  subjects: PropTypes.shape({}).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,

  findStudentByIdDispatch: PropTypes.func.isRequired,
  updateStudentDispatch: PropTypes.func.isRequired,
  saveStudentDispatch: PropTypes.func.isRequired,
  deleteStudentDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  cleanSelectedStudentDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  getSchoolProgramListDispatch: PropTypes.func.isRequired,
  getSubjectListDispatch: PropTypes.func.isRequired,
  deleteSchoolProgramDispatch: PropTypes.func.isRequired,
  getStudentConstanceDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  student: state.studentReducer.selectedStudent,
  schoolPrograms: state.schoolProgramReducer.list,
  subjects: state.subjectReducer.list,
});

const mD = {
  findStudentByIdDispatch: findStudentById,
  updateStudentDispatch: updateStudent,
  saveStudentDispatch: saveStudent,
  deleteStudentDispatch: deleteStudent,
  defineDispatch: define,
  cleanSelectedStudentDispatch: cleanSelectedStudent,
  cleanDialogDispatch: cleanDialog,
  getSchoolProgramListDispatch: getSchoolProgramList,
  getSubjectListDispatch: getSubjectList,
  deleteSchoolProgramDispatch: deleteSchoolProgram,
  getStudentConstanceDispatch: getStudentConstance,
};

export default connect(mS, mD)(StudentDetailContainer);
