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
import { getSubjectBySchoolProgram, cleanSubjectBySchoolProgram } from '../../actions/subject';
import { getList as getSchoolProgramList } from '../../actions/schoolProgram';
import { define, cleanDialog } from '../../actions/dialog';
import StudentSchoolProgram from '../../components/Students/schoolProgram';

class StudentSchoolProgramContainer extends Component {
  componentDidMount = () => {
    const {
      findStudentByIdDispatch,
      getTeacherListDispatch,
      defineDispatch,
      getSubjectBySchoolProgramDispatch,
      getSchoolProgramListDispatch,
      loadSchoolProgramDispatch,
      match: {
        params: { userId, studentId },
      },
    } = this.props;

    getTeacherListDispatch();
    getSchoolProgramListDispatch();

    findStudentByIdDispatch(userId).then((student) => {
      if (studentId !== 'agregar') {
        const schoolProgram = student.student.find((item) => item.id === parseInt(studentId, 10));
        loadSchoolProgramDispatch(schoolProgram);
        getSubjectBySchoolProgramDispatch(schoolProgram.school_program_id);
      }
    });

    defineDispatch('programa académico del estudiante');
  };

  componentWillUnmount = () => {
    const {
      cleanSchoolProgramDispatch,
      cleanDialogDispatch,
      cleanSelectedStudentDispatch,
      cleanSubjectBySchoolProgramDispatch,
    } = this.props;
    cleanSchoolProgramDispatch();
    cleanDialogDispatch();
    cleanSelectedStudentDispatch();
    cleanSubjectBySchoolProgramDispatch();
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
    history.push(`/usuarios/estudiantes/modificar/${userId}`);
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
      history.push(`/usuarios/estudiantes/modificar/${userId}`)
    );
  };

  render() {
    const {
      teachers,
      subjects,
      allSchoolPrograms,
      student,
      schoolProgram,
      getSubjectBySchoolProgramDispatch,
      match: {
        params: { studentId: schoolProgramId },
      },
    } = this.props;
    let schoolPrograms = allSchoolPrograms;
    if (!schoolProgram) {
      schoolPrograms = allSchoolPrograms.filter(
        (y) =>
          !student.student.some((x) => x.school_program_id === y.id && x.current_status !== 'RET-B')
      );
    }

    return (
      <StudentSchoolProgram
        schoolProgramId={schoolProgramId}
        schoolPrograms={schoolPrograms}
        subjects={subjects}
        getSubjectBySchoolProgram={getSubjectBySchoolProgramDispatch}
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
  schoolProgram: PropTypes.shape({}),
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
  getSubjectBySchoolProgramDispatch: PropTypes.func.isRequired,
  updateSchoolProgramDispatch: PropTypes.func.isRequired,
  saveSchoolProgramDispatch: PropTypes.func.isRequired,
  getSchoolProgramListDispatch: PropTypes.func.isRequired,
  deleteSchoolProgramDispatch: PropTypes.func.isRequired,
  findStudentByIdDispatch: PropTypes.func.isRequired,
  cleanSelectedStudentDispatch: PropTypes.func.isRequired,
  cleanSubjectBySchoolProgramDispatch: PropTypes.func.isRequired,
};
StudentSchoolProgramContainer.defaultProps = {
  schoolProgram: null,
};
const mS = (state) => ({
  subjects: state.subjectReducer.listBySchoolPeriod,
  teachers: state.teacherReducer.list,
  allSchoolPrograms: state.schoolProgramReducer.list,
  student: state.studentReducer.selectedStudent,
  schoolProgram: state.studentReducer.selectedSchoolProgram,
});

const mD = {
  getSubjectBySchoolProgramDispatch: getSubjectBySchoolProgram,
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
  cleanSubjectBySchoolProgramDispatch: cleanSubjectBySchoolProgram,
};

const StudentSchoolProgramContainerWrapper = connect(mS, mD)(StudentSchoolProgramContainer);

export default StudentSchoolProgramContainerWrapper;
