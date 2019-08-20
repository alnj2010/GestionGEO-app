import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteTeacher } from '../../actions/teacher';
import TeachersList from '../../components/Teachers';

export class TeachersListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
    const { getList, define } = this.props;
    getList().then(() => this.setState({ isLoading: false }));
    define('Profesor');
  };
  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  handleDeleteTeacher = id => {
    const { getList, deleteTeacher } = this.props;
    deleteTeacher(id).then(res => getList());
  };

  render() {
    const { teachers, history, show } = this.props;
    const { isLoading } = this.state;
    return (
      <TeachersList
        teachers={teachers}
        isLoading={isLoading}
        history={history}
        handleTeacherDetail={this.handleTeacherDetail}
        handleDeleteTeacher={this.handleDeleteTeacher}
        show={show}
      />
    );
  }
}

TeachersListContainer.propTypes = {
  teachers: array,
  history: object.isRequired,
  getList: func.isRequired,
  deleteTeacher: func.isRequired,
};

const mS = state => ({
  teachers: state.teacherReducer.list,
});

const mD = {
  getList,
  deleteTeacher,
  cleanDialog,
  define,
  show,
};

TeachersListContainer = connect(
  mS,
  mD,
)(TeachersListContainer);

export default TeachersListContainer;
