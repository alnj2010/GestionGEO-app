import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  findSchoolProgramById,
  updateSchoolProgram,
  deleteSchoolProgram,
  cleanSelectedSchoolProgram,
  saveSchoolProgram,
} from '../../actions/schoolProgram';
import SchoolProgramDetail from '../../components/SchoolPrograms/detail';
import { define, cleanDialog } from '../../actions/dialog';

class SchoolProgramDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findSchoolProgramByIdDispatch, defineDispatch } = this.props;
    if (match.params.id) findSchoolProgramByIdDispatch(match.params.id);
    defineDispatch('programa academico');
  };

  componentWillUnmount = () => {
    const { cleanSelectedSchoolProgramDispatch, cleanDialogDispatch } = this.props;
    cleanSelectedSchoolProgramDispatch();
    cleanDialogDispatch();
  };

  saveSchoolProgram = (values) => {
    const {
      match,
      updateSchoolProgramDispatch,
      findSchoolProgramByIdDispatch,
      saveSchoolProgramDispatch,
      history,
    } = this.props;
    const payload = { ...values };

    if (match.params.id) updateSchoolProgramDispatch({ ...payload, ...match.params });
    else
      saveSchoolProgramDispatch({ ...payload }).then((response) => {
        if (response) {
          findSchoolProgramByIdDispatch(response).then(() => history.push(`edit/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;

    history.goBack('/programas-academicos');
  };

  handleSchoolProgramDelete = () => {
    const { deleteSchoolProgramDispatch, history, match } = this.props;
    deleteSchoolProgramDispatch(match.params.id).then(() => history.push('/programas-academicos'));
  };

  render() {
    const { schoolProgram } = this.props;
    return (
      <SchoolProgramDetail
        saveSchoolProgram={this.saveSchoolProgram}
        goBack={this.goBack}
        schoolProgram={schoolProgram}
        schoolProgramId={schoolProgram.id}
        handleSchoolProgramDelete={this.handleSchoolProgramDelete}
      />
    );
  }
}

SchoolProgramDetailContainer.propTypes = {
  schoolProgram: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  }).isRequired,

  findSchoolProgramByIdDispatch: PropTypes.func.isRequired,
  updateSchoolProgramDispatch: PropTypes.func.isRequired,
  saveSchoolProgramDispatch: PropTypes.func.isRequired,
  deleteSchoolProgramDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  cleanSelectedSchoolProgramDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  schoolProgram: state.schoolProgramReducer.selectedSchoolProgram,
});

const mD = {
  findSchoolProgramByIdDispatch: findSchoolProgramById,
  updateSchoolProgramDispatch: updateSchoolProgram,
  saveSchoolProgramDispatch: saveSchoolProgram,
  deleteSchoolProgramDispatch: deleteSchoolProgram,
  defineDispatch: define,
  cleanSelectedSchoolProgramDispatch: cleanSelectedSchoolProgram,
  cleanDialogDispatch: cleanDialog,
};

export default connect(mS, mD)(SchoolProgramDetailContainer);
