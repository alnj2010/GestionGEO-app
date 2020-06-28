import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  cleanSchoolProgram,
  loadSchoolProgram,
  updateSchoolProgram,
  deleteSchoolProgram,
} from '../../actions/student';
import { getList as getTeacherList } from '../../actions/teacher';
import { getList as getSubjectList } from '../../actions/subject';
import { define, cleanDialog } from '../../actions/dialog';
import StudentSchoolProgram from '../../components/Students/schoolProgram';

class StudentSchoolProgramContainer extends Component {
  componentDidMount = () => {
    const {
      location: {
        state: { selectedSchoolProgram: schoolProgram },
      },
      loadSchoolProgramDispatch,
      getTeacherListDispatch,
      defineDispatch,
      getSubjectListDispatch,
    } = this.props;
    loadSchoolProgramDispatch(schoolProgram);
    getTeacherListDispatch();
    getSubjectListDispatch();
    defineDispatch('programa academico del estudiante');
  };

  componentWillUnmount = () => {
    const { cleanSchoolProgramDispatch, cleanDialogDispatch } = this.props;
    cleanSchoolProgramDispatch();
    cleanDialogDispatch();
  };

  saveStudent = (values) => {
    const {
      updateSchoolProgramDispatch,
      location: {
        state: { selectedStudent, selectedSchoolProgram },
      },
    } = this.props;
    updateSchoolProgramDispatch({
      ...selectedStudent,
      ...values,
      idUser: selectedStudent.id,
      idStudent: selectedSchoolProgram.id,
    });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleSchoolProgramDelete = () => {
    const {
      deleteSchoolProgramDispatch,
      history,
      location: {
        state: {
          selectedStudent: { id: idUser },
          selectedSchoolProgram: { id: idStudent },
        },
      },
    } = this.props;
    deleteSchoolProgramDispatch(idUser, idStudent).then(() =>
      history.push(`/estudiantes/edit/${idUser}`)
    );
  };

  render() {
    const {
      location: {
        state: { selectedSchoolProgram: schoolProgram, selectedStudent },
      },
      teachers,
      subjects,
    } = this.props;
    return (
      <StudentSchoolProgram
        subjects={subjects}
        schoolProgram={schoolProgram}
        selectedStudent={selectedStudent}
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
      selectedSchoolProgram: PropTypes.shape({ id: PropTypes.number }),
      selectedStudent: PropTypes.shape({ id: PropTypes.number }),
    }),
  }).isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func, push: PropTypes.func }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.number }),
  }).isRequired,

  loadSchoolProgramDispatch: PropTypes.func.isRequired,
  getTeacherListDispatch: PropTypes.func.isRequired,
  cleanSchoolProgramDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  getSubjectListDispatch: PropTypes.func.isRequired,
  updateSchoolProgramDispatch: PropTypes.func.isRequired,

  deleteSchoolProgramDispatch: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

const mS = (state) => ({
  subjects: state.subjectReducer.list,
  teachers: state.teacherReducer.list,
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
};

const StudentSchoolProgramContainerWrapper = connect(mS, mD)(StudentSchoolProgramContainer);

export default StudentSchoolProgramContainerWrapper;
