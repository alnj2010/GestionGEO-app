import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import {
  findStudentById,
  updateStudent,
  deleteStudent,
  cleanSelectedStudent,
  saveStudent,
  deleteSchoolProgram,
} from '../../actions/student';
import { getList as getSubjectList } from '../../actions/subject';
import { getList as getSchoolProgramList } from '../../actions/schoolProgram';
import StudentDetail from '../../components/Students/detail';
import { define, cleanDialog } from '../../actions/dialog';
import { getSessionUserRol } from '../../storage/sessionStorage';

class StudentDetailContainer extends Component {
  componentDidMount = () => {
    const rol = getSessionUserRol();
    const { match, findStudentById, define } = this.props;
    if (match.params.id) findStudentById(match.params.id);
    this.props.getSchoolProgramList();
    this.props.getSubjectList();
    define(rol !== 'A' ? 'perfil' : 'estudiante');
  };

  componentWillUnmount = () => {
    this.props.cleanSelectedStudent();
    this.props.cleanDialog();
  };

  saveStudent = (values) => {
    const { match, updateStudent, findStudentById, saveStudent, history, student } = this.props;
    const payload = { ...values };
    console.log(student);
    if (match.params.id)
      updateStudent({
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
      saveStudent({ ...payload }).then((response) => {
        if (response) {
          findStudentById(response).then((res) => history.push(`edit/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleStudentDelete = () => {
    const { deleteStudent, history, match } = this.props;
    deleteStudent(match.params.id).then((res) => history.push('/estudiantes'));
  };

  handleDeleteSchoolProgram = (userId, studentId) => {
    const { deleteSchoolProgram, history } = this.props;
    deleteSchoolProgram(userId, studentId).then(() => history.push('/estudiantes/edit/' + userId));
  };

  render() {
    const { student, schoolPrograms, subjects, history } = this.props;
    console.log(student);
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
        handleDeleteSchoolProgram={this.handleDeleteSchoolProgram}
      />
    );
  }
}

StudentDetailContainer.propTypes = {
  deleteStudent: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  updateStudent: func.isRequired,
  findStudentById: func.isRequired,
  saveStudent: func.isRequired,
};

const mS = (state) => ({
  student: state.studentReducer.selectedStudent,
  schoolPrograms: state.schoolProgramReducer.list,
  subjects: state.subjectReducer.list,
});

const mD = {
  findStudentById,
  updateStudent,
  saveStudent,
  deleteStudent,
  define,
  cleanSelectedStudent,
  cleanDialog,
  getSchoolProgramList,
  getSubjectList,
  deleteSchoolProgram,
};

StudentDetailContainer = connect(mS, mD)(StudentDetailContainer);

export default StudentDetailContainer;
