import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteSubject } from '../../actions/subject';
import SubjectsList from '../../components/Subjects';

class SubjectsListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const { getListDispatch, defineDispatch } = this.props;
    getListDispatch().then(() => this.setState({ isLoading: false }));
    defineDispatch('Materia');
  };

  componentWillUnmount = () => {
    const { cleanDialogDispatch } = this.props;
    cleanDialogDispatch();
  };

  handleDeleteSubject = (id) => {
    const { getListDispatch, deleteSubjectDispatch } = this.props;
    deleteSubjectDispatch(id).then(() => getListDispatch());
  };

  render() {
    const { subjects, history, showDispatch } = this.props;
    const { isLoading } = this.state;
    return (
      <SubjectsList
        subjects={subjects}
        localization={{
          header: {
            actions: 'Acciones',
          },
        }}
        isLoading={isLoading}
        history={history}
        handleSubjectDetail={this.handleSubjectDetail}
        handleDeleteSubject={this.handleDeleteSubject}
        show={showDispatch}
      />
    );
  }
}

SubjectsListContainer.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({}).isRequired,

  getListDispatch: PropTypes.func.isRequired,
  deleteSubjectDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  showDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  subjects: state.subjectReducer.list,
});

const mD = {
  getListDispatch: getList,
  deleteSubjectDispatch: deleteSubject,
  cleanDialogDispatch: cleanDialog,
  defineDispatch: define,
  showDispatch: show,
};

export default connect(mS, mD)(SubjectsListContainer);
