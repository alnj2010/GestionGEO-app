import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getEnrolledStudents,
  updateQualifications,
  cleanEnrolledStudents,
} from '../../actions/myCourse';
import { findSubjectById } from '../../actions/subject';

import CourseDetail from '../../components/MyCourses/detail';
import { define, cleanDialog } from '../../actions/dialog';
import { getSessionTeacherId } from '../../storage/sessionStorage';

class CourseDetailContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const {
      match,
      getEnrolledStudentsDispatch,
      defineDispatch,
      findSubjectByIdDispatch,
    } = this.props;
    if (match.params.id) {
      getEnrolledStudentsDispatch(match.params.id)
        .then(() => this.setState({ isLoading: false }))
        .catch(() => this.setState({ isLoading: false }));
      findSubjectByIdDispatch(match.params.subjectId);
    }
    defineDispatch('Actualizar curso');
  };

  componentWillUnmount = () => {
    const { cleanEnrolledStudentsDispatch, cleanDialogDispatch } = this.props;
    cleanEnrolledStudentsDispatch();
    cleanDialogDispatch();
  };

  goBack = () => {
    const { history } = this.props;

    history.push('/mis-cursos');
  };

  updateQualifications = (value) => {
    const { match, updateQualificationsDispatch, getEnrolledStudentsDispatch } = this.props;
    const payload = {
      teacher_id: parseInt(getSessionTeacherId(), 10),
      school_period_subject_teacher_id: parseInt(match.params.id, 10),
      student_notes: [
        {
          student_subject_id: parseInt(value.id, 10),
          qualification: parseInt(value.qualification, 10),
        },
      ],
    };
    return updateQualificationsDispatch(payload).then(() =>
      getEnrolledStudentsDispatch(match.params.id)
    );
  };

  render() {
    const { students, loadNotes, subject } = this.props;
    const { isLoading } = this.state;
    return (
      <CourseDetail
        subject={subject}
        isLoading={isLoading}
        students={students}
        goBack={this.goBack}
        loadNotes={loadNotes}
        updateQualifications={this.updateQualifications}
      />
    );
  }
}

CourseDetailContainer.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  getEnrolledStudentsDispatch: PropTypes.func.isRequired,
  updateQualificationsDispatch: PropTypes.func.isRequired,
  cleanEnrolledStudentsDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  loadNotes: PropTypes.bool,
  cleanDialogDispatch: PropTypes.func.isRequired,
};
CourseDetailContainer.defaultProps = {
  loadNotes: false,
};
const mS = (state) => ({
  students: state.myCourseReducer.enrolledStudents,
  loadNotes: !!state.schoolPeriodReducer.selectedSchoolPeriod.load_notes,
  subject: state.subjectReducer.selectedSubject,
});

const mD = {
  getEnrolledStudentsDispatch: getEnrolledStudents,
  updateQualificationsDispatch: updateQualifications,
  cleanEnrolledStudentsDispatch: cleanEnrolledStudents,
  findSubjectByIdDispatch: findSubjectById,
  defineDispatch: define,
  cleanDialogDispatch: cleanDialog,
};

export default connect(mS, mD)(CourseDetailContainer);
