import React, { Component } from 'react';
import { func, object } from 'prop-types';
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
export class SchoolProgramDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findSchoolProgramById, define } = this.props;
    if (match.params.id) findSchoolProgramById(match.params.id);
    define('programa academico');
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedSchoolProgram();
    this.props.cleanDialog();
  };

  saveSchoolProgram = values => {
    const {
      match,
      updateSchoolProgram,
      findSchoolProgramById,
      saveSchoolProgram,
      history,
    } = this.props;
    const payload = { ...values };

    if (match.params.id) updateSchoolProgram({ ...payload, ...match.params });
    else
      saveSchoolProgram({ ...payload }).then(response => {

        if (response) {
          findSchoolProgramById(response).then(res => history.push(`edit/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  handleSchoolProgramDelete = () => {
    const { deleteSchoolProgram, history, match } = this.props;
    deleteSchoolProgram(match.params.id).then(res => history.push('/programas-academicos'));
  };


  render() {
    const {
      schoolProgram,
    } = this.props;
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
  deleteSchoolProgram: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  updateSchoolProgram: func.isRequired,
  findSchoolProgramById: func.isRequired,
  saveSchoolProgram: func.isRequired,
};

const mS = state => ({
  schoolProgram: state.schoolProgramReducer.selectedSchoolProgram,
});

const mD = {
  findSchoolProgramById,
  updateSchoolProgram,
  saveSchoolProgram,
  deleteSchoolProgram,
  define,
  cleanSelectedSchoolProgram,
  cleanDialog,
};

SchoolProgramDetailContainer = connect(
  mS,
  mD,
)(SchoolProgramDetailContainer);

export default SchoolProgramDetailContainer;
