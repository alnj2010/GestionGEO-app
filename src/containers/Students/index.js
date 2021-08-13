import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteStudent } from '../../actions/student';
import StudentsList from '../../components/Students';

class StudentsListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const { getListDispatch, defineDispatch } = this.props;
    getListDispatch()
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false }));
    defineDispatch('estudiante');
  };

  componentWillUnmount = () => {
    const { cleanDialogDispatch } = this.props;
    cleanDialogDispatch();
  };

  handleDeleteStudent = (id) => {
    const { getListDispatch, deleteStudentDispatch } = this.props;
    deleteStudentDispatch(id).then(() => getListDispatch());
  };

  render() {
    const { students, history, showDispatch } = this.props;
    const { isLoading } = this.state;
    return (
      <StudentsList
        students={students}
        isLoading={isLoading}
        history={history}
        handleStudentDetail={this.handleStudentDetail}
        handleDeleteStudent={this.handleDeleteStudent}
        show={showDispatch}
      />
    );
  }
}

StudentsListContainer.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({}).isRequired,

  getListDispatch: PropTypes.func.isRequired,
  deleteStudentDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  showDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  students: state.studentReducer.list,
});

const mD = {
  getListDispatch: getList,
  deleteStudentDispatch: deleteStudent,
  cleanDialogDispatch: cleanDialog,
  defineDispatch: define,
  showDispatch: show,
};

export default connect(mS, mD)(StudentsListContainer);
