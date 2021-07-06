import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Inscription from '../../components/Inscriptions';
import {
  getAvailableSubjects,
  inscription,
  cleanAvailableSubjects,
} from '../../actions/studentInscription';
import { getList as getTeachersList, cleanGetList } from '../../actions/teacher';
import { getSessionStudentId, getSessionUser } from '../../storage/sessionStorage';

class InscriptionContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const { getAvailableSubjectsDispatch, getTeachersListDispatch } = this.props;
    const id = getSessionStudentId();
    getAvailableSubjectsDispatch(id)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false }));
    getTeachersListDispatch();
  };

  componentWillUnmount = () => {
    const { cleanAvailableSubjectsDispatch, cleanGetListDispatch } = this.props;
    cleanAvailableSubjectsDispatch();
    cleanGetListDispatch();
  };

  saveInscription = ({
    enrolledSubjects,
    enrolledFinalWorks,
    enrolledProjects,
    financing,
    financingDescription,
  }) => {
    const { inscriptionDispatch, history } = this.props;
    const {
      student: { id, current_status: currentStatus },
    } = getSessionUser();
    const payload = {
      student_id: id,
      status: currentStatus,
      financing,
      financing_description: financingDescription,
      subjects: enrolledSubjects.map((subject) => ({
        school_period_subject_teacher_id: subject.school_period_subject_teacher_id,
      })),
      final_works:
        enrolledFinalWorks && enrolledFinalWorks.length
          ? enrolledFinalWorks.map((item) => ({
            title: item.title,
            subject_id: item.id,
            project_id: item.projectId,
            advisors: [{ teacher_id: item.advisors }],
          }))
          : undefined,
      projects:
        enrolledProjects && enrolledProjects.length
          ? enrolledProjects.map((item) => ({
            title: item.title,
            subject_id: item.id,
          }))
          : undefined,
    };
    inscriptionDispatch(payload).then((res) => {
      if (res) {
        history.replace(`/inicio`);
      }
    });
  };

  render() {
    const { subjects, finalWorks, approvedProjects, teachers, message } = this.props;
    const { isLoading } = this.state;
    return (
      <Inscription
        subjects={subjects}
        teachers={teachers}
        message={message}
        isLoading={isLoading}
        finalWorks={finalWorks}
        approvedProjects={approvedProjects}
        saveInscription={this.saveInscription}
      />
    );
  }
}

InscriptionContainer.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,

  getAvailableSubjectsDispatch: PropTypes.func.isRequired,
  cleanGetListDispatch: PropTypes.func.isRequired,
  getTeachersListDispatch: PropTypes.func.isRequired,
  inscriptionDispatch: PropTypes.func.isRequired,
  cleanAvailableSubjectsDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  subjects: state.studentInscriptionReducer.availableSubjects,
  finalWorks: state.studentInscriptionReducer.finalWorkSubjects,
  approvedProjects: state.studentInscriptionReducer.approvedProjects,
  message: state.studentInscriptionReducer.message,
  teachers: state.teacherReducer.list,
});

const mD = {
  getAvailableSubjectsDispatch: getAvailableSubjects,
  inscriptionDispatch: inscription,
  cleanAvailableSubjectsDispatch: cleanAvailableSubjects,
  getTeachersListDispatch: getTeachersList,
  cleanGetListDispatch: cleanGetList,
};

export default connect(mS, mD)(InscriptionContainer);
