import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
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
    const { getList, define } = this.props;
    getList().then(() => this.setState({ isLoading: false }));
    define('Programa academico');
  };

  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  handleDeleteSchoolProgram = (id) => {
    const { getList, deleteSchoolProgram } = this.props;
    deleteSchoolProgram(id).then((res) => getList());
  };

  render() {
    const { schoolPrograms, history, show } = this.props;
    const { isLoading } = this.state;
    return (
      <SchoolProgramsList
        schoolPrograms={schoolPrograms}
        isLoading={isLoading}
        history={history}
        handleSchoolProgramDetail={this.handleSchoolProgramDetail}
        handleDeleteSchoolProgram={this.handleDeleteSchoolProgram}
        show={show}
      />
    );
  }
}

SchoolProgramsListContainer.propTypes = {
  schoolPrograms: array,
  history: object.isRequired,
  getList: func.isRequired,
  deleteSchoolProgram: func.isRequired,
};

const mS = (state) => ({
  schoolPrograms: state.schoolProgramReducer.list,
});

const mD = {
  getList,
  deleteSchoolProgram,
  cleanDialog,
  define,
  show,
};

SchoolProgramsListContainer = connect(mS, mD)(SchoolProgramsListContainer);

export default SchoolProgramsListContainer;
