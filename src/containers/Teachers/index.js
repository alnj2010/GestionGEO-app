import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteTeacher } from '../../actions/teacher';
import TeachersList from '../../components/Teachers';

class TeachersListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const { getListDispatch, defineDispatch } = this.props;
    getListDispatch().then(() => this.setState({ isLoading: false }));
    defineDispatch('Profesor');
  };

  componentWillUnmount = () => {
    const { cleanDialogDispatch } = this.props;
    cleanDialogDispatch();
  };

  handleDeleteTeacher = (id) => {
    const { getListDispatch, deleteTeacherDispatch } = this.props;
    deleteTeacherDispatch(id).then(() => getListDispatch());
  };

  render() {
    const { teachers, history, showDispatch } = this.props;
    const { isLoading } = this.state;
    return (
      <TeachersList
        teachers={teachers}
        localization={{
          header: {
            actions: 'Acciones',
          },
        }}
        isLoading={isLoading}
        history={history}
        handleTeacherDetail={this.handleTeacherDetail}
        handleDeleteTeacher={this.handleDeleteTeacher}
        show={showDispatch}
      />
    );
  }
}

TeachersListContainer.propTypes = {
  teachers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({}).isRequired,
  getListDispatch: PropTypes.func.isRequired,
  deleteTeacherDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  showDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  teachers: state.teacherReducer.list,
});

const mD = {
  getListDispatch: getList,
  deleteTeacherDispatch: deleteTeacher,
  cleanDialogDispatch: cleanDialog,
  defineDispatch: define,
  showDispatch: show,
};

export default connect(mS, mD)(TeachersListContainer);
