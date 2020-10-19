import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  cleanSchoolProgram,
  loadSchoolProgram,
  updateSchoolProgram,
  deleteSchoolProgram,
  saveSchoolProgram,
  findStudentById,
  cleanSelectedStudent,
} from '../../actions/student';
import { getList as getTeacherList } from '../../actions/teacher';
import { getList as getSubjectList } from '../../actions/subject';
import { getList as getSchoolProgramList } from '../../actions/schoolProgram';
import { define, cleanDialog } from '../../actions/dialog';
import StudentSchoolProgram from '../../components/Students/schoolProgram';

class StudentSchoolProgramContainer extends Component {
  componentDidMount = () => {
    const {
      findStudentByIdDispatch,
      getTeacherListDispatch,
      defineDispatch,
      getSubjectListDispatch,
      getSchoolProgramListDispatch,
      loadSchoolProgramDispatch,
      match: {
        params: { userId, studentId },
      },
    } = this.props;
    getTeacherListDispatch();
    getSubjectListDispatch();
    getSchoolProgramListDispatch();
    findStudentByIdDispatch(userId).then((student) => {
      const schoolProgram = student.student.find((item) => item.id === parseInt(studentId, 10));
      loadSchoolProgramDispatch(schoolProgram);
    });
    defineDispatch('programa academico del estudiante');
  };

  componentWillUnmount = () => {
    const {
      cleanSchoolProgramDispatch,
      cleanDialogDispatch,
      cleanSelectedStudentDispatch,
    } = this.props;
    cleanSchoolProgramDispatch();
    cleanDialogDispatch();
    cleanSelectedStudentDispatch();
  };

  saveStudent = (values) => {
    const {
      updateSchoolProgramDispatch,
      saveSchoolProgramDispatch,
      location: {
        state: { selectedStudent, selectedSchoolProgram },
      },
    } = this.props;
    if (!selectedSchoolProgram) {
      saveSchoolProgramDispatch({
        ...selectedStudent,
        ...values,
        idUser: selectedStudent.id,
      });
    } else {
      updateSchoolProgramDispatch({
        ...selectedStudent,
        ...values,
        idUser: selectedStudent.id,
        idStudent: selectedSchoolProgram.id,
      });
    }
  };

  goBack = () => {
    const {
      history,
      match: {
        params: { userId },
      },
    } = this.props;
    history.push(`/estudiantes/modificar/${userId}`);
  };

  handleSchoolProgramDelete = () => {
    const {
      deleteSchoolProgramDispatch,
      history,
      match: {
        params: { userId, studentId },
      },
    } = this.props;
    deleteSchoolProgramDispatch(userId, studentId).then(() =>
      history.push(`/estudiantes/modificar/${userId}`)
    );
  };

  render() {
    const { teachers, subjects, allSchoolPrograms, student, schoolProgram } = this.props;
    let schoolPrograms = allSchoolPrograms;
    if (!schoolProgram) {
      schoolPrograms = allSchoolPrograms.filter(
        (y) => !student.student.some((x) => x.school_program_id === y.id)
      );
    }
    return (
      <StudentSchoolProgram
        schoolPrograms={schoolPrograms}
        subjects={subjects}
        schoolProgram={schoolProgram}
        selectedStudent={student}
        saveStudent={this.saveStudent}
        teachersGuide={teachers}
        goBack={this.goBack}
        handleSchoolProgramDelete={this.handleSchoolProgramDelete}
      />
    );
  }
}

StudentSchoolProgramContainer.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      selectedSchoolProgram: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
      selectedStudent: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        student: PropTypes.arrayOf(PropTypes.shape({})),
      }),
    }),
  }).isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  student: PropTypes.shape({
    student: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  schoolProgram: PropTypes.shape({}).isRequired,
  allSchoolPrograms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func, push: PropTypes.func }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      studentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  }).isRequired,

  loadSchoolProgramDispatch: PropTypes.func.isRequired,
  getTeacherListDispatch: PropTypes.func.isRequired,
  cleanSchoolProgramDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  getSubjectListDispatch: PropTypes.func.isRequired,
  updateSchoolProgramDispatch: PropTypes.func.isRequired,
  saveSchoolProgramDispatch: PropTypes.func.isRequired,
  getSchoolProgramListDispatch: PropTypes.func.isRequired,
  deleteSchoolProgramDispatch: PropTypes.func.isRequired,
  findStudentByIdDispatch: PropTypes.func.isRequired,
  cleanSelectedStudentDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  subjects: state.subjectReducer.list,
  teachers: state.teacherReducer.list,
  allSchoolPrograms: state.schoolProgramReducer.list,
  student: state.studentReducer.selectedStudent,
  schoolProgram: state.studentReducer.selectedSchoolProgram,
});

const mD = {
  getSubjectListDispatch: getSubjectList,
  loadSchoolProgramDispatch: loadSchoolProgram,
  getTeacherListDispatch: getTeacherList,
  cleanSchoolProgramDispatch: cleanSchoolProgram,
  cleanDialogDispatch: cleanDialog,
  defineDispatch: define,
  updateSchoolProgramDispatch: updateSchoolProgram,
  deleteSchoolProgramDispatch: deleteSchoolProgram,
  saveSchoolProgramDispatch: saveSchoolProgram,
  getSchoolProgramListDispatch: getSchoolProgramList,
  findStudentByIdDispatch: findStudentById,
  cleanSelectedStudentDispatch: cleanSelectedStudent,
};

const StudentSchoolProgramContainerWrapper = connect(mS, mD)(StudentSchoolProgramContainer);

export default StudentSchoolProgramContainerWrapper;
