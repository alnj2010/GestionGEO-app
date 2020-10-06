import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteSchoolProgram } from '../../actions/schoolProgram';
import SchoolProgramsList from '../../components/SchoolPrograms';

class SchoolProgramsListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const { getListDispatch, defineDispatch } = this.props;
    getListDispatch().then(() => this.setState({ isLoading: false }));
    defineDispatch('Programa academico');
  };

  componentWillUnmount = () => {
    const { cleanDialogDispatch } = this.props;
    cleanDialogDispatch();
  };

  handleDeleteSchoolProgram = (id) => {
    const { getListDispatch, deleteSchoolProgramDispatch } = this.props;
    deleteSchoolProgramDispatch(id).then(() => getListDispatch());
  };

  render() {
    const { schoolPrograms, history, showDispatch } = this.props;
    const { isLoading } = this.state;
    return (
      <SchoolProgramsList
        schoolPrograms={schoolPrograms}
        localization={{
          header: {
            actions: 'Acciones',
          },
        }}
        isLoading={isLoading}
        history={history}
        handleSchoolProgramDetail={this.handleSchoolProgramDetail}
        handleDeleteSchoolProgram={this.handleDeleteSchoolProgram}
        show={showDispatch}
      />
    );
  }
}

SchoolProgramsListContainer.propTypes = {
  schoolPrograms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({}).isRequired,

  getListDispatch: PropTypes.func.isRequired,
  deleteSchoolProgramDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  showDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  schoolPrograms: state.schoolProgramReducer.list,
});

const mD = {
  getListDispatch: getList,
  deleteSchoolProgramDispatch: deleteSchoolProgram,
  cleanDialogDispatch: cleanDialog,
  defineDispatch: define,
  showDispatch: show,
};

export default connect(mS, mD)(SchoolProgramsListContainer);
