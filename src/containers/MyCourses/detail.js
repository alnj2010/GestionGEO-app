import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getEnrolledStudents,
  updateQualifications,
  cleanEnrolledStudents,
} from '../../actions/myCourse';
import CourseDetail from '../../components/MyCourses/detail';
import { define, cleanDialog } from '../../actions/dialog';
import { getSessionTeacherId } from '../../storage/sessionStorage';

class courseDetailContainer extends Component {
  componentDidMount = () => {
    const { match, getEnrolledStudents, define } = this.props;
    if (match.params.id) getEnrolledStudents(match.params.id);
    define('Actualizar curso');
  };

  componentWillUnmount = () => {
    this.props.cleanEnrolledStudents();
  };

  goBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  updateQualifications = (value) => {
    const { match, updateQualifications, getEnrolledStudents } = this.props;
    const payload = {
      teacher_id: parseInt(getSessionTeacherId()),
      school_period_subject_teacher_id: parseInt(match.params.id),
      student_notes: [
        {
          student_subject_id: parseInt(value.id),
          qualification: parseInt(value.qualification),
        },
      ],
    };
    updateQualifications(payload).then((res) => {
      getEnrolledStudents(match.params.id);
    });
  };

  render() {
    const { students } = this.props;
    return (
      <CourseDetail
        students={students}
        goBack={this.goBack}
        updateQualifications={this.updateQualifications}
      />
    );
  }
}

courseDetailContainer.propTypes = {};

const mS = (state) => ({
  students: state.myCourseReducer.enrolledStudents,
});

const mD = {
  getEnrolledStudents,
  updateQualifications,
  cleanEnrolledStudents,
  define,
  cleanDialog,
};

courseDetailContainer = connect(mS, mD)(courseDetailContainer);

export default courseDetailContainer;
