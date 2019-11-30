import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getEnrolledStudents,
    updateQualifications
} from '../../actions/myCourse';
import CourseDetail from '../../components/MyCourses/detail';
import { define, cleanDialog } from '../../actions/dialog';
export class courseDetailContainer extends Component {
  componentDidMount = () => {
    const { match, getEnrolledStudents, define } = this.props;
    if (match.params.id) getEnrolledStudents(match.params.id);
    define('Actualizar curso');
  };
  componentWillUnmount = () => {
 
  };


  goBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  updateQualifications = (value) => {
    const { match,updateQualifications } = this.props;
    let payload={
        teacher_id:sessionStorage.getItem('teacherId'),
        school_period_subject_teacher_id:match.params.id,
        student_notes:[{
            student_subject_id:value.id,
            qualification:parseInt(value.qualification)

        }]
      }
      updateQualifications(payload)
  };


  render() {
    const {
        students
    } = this.props;
    return (
      <CourseDetail
        students={students}
        goBack={this.goBack}
        updateQualifications = {this.updateQualifications}
      />
    );
  }
}

courseDetailContainer.propTypes = {

};

const mS = state => ({
  students: state.myCourseReducer.enrolledStudents,
});

const mD = {
    getEnrolledStudents,
    updateQualifications,
    define,
    cleanDialog,
};

courseDetailContainer = connect(
  mS,
  mD,
)(courseDetailContainer);

export default courseDetailContainer;
