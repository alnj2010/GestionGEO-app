import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminHome from '../../components/Home/admin';
import { getList, cleanGetList } from '../../actions/schoolPeriod';
import { getReport } from '../../actions/admin';
import {
  getWarningStudentsList,
  updateSchoolProgram,
  cleanGetWarningStudentsList,
} from '../../actions/student';

class AdminHomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const { getListDispatch, getWarningStudentsListDispatch } = this.props;
    getListDispatch();
    getWarningStudentsListDispatch().then(() => this.setState({ isLoading: false }));
  };

  updateStudentStatus = async (student) => {
    const { updateSchoolProgramDispatch } = this.props;
    updateSchoolProgramDispatch(student);
  };

  componentWillUnmount = () => {
    const { cleanGetListDispatch, cleanGetWarningStudentsListDispatch } = this.props;
    cleanGetListDispatch();
    cleanGetWarningStudentsListDispatch();
  };

  render() {
    const { schoolPeriods, getReportDispatch, warningStudents, history } = this.props;
    const { isLoading } = this.state;
    const schoolPeriodsSort = schoolPeriods.sort((a, b) => {
      return new Date(a.start_date) - new Date(b.start_date);
    });
    return (
      <AdminHome
        schoolPeriods={schoolPeriodsSort}
        getReport={getReportDispatch}
        updateStudentStatus={this.updateStudentStatus}
        warningStudents={warningStudents}
        isLoading={isLoading}
        history={history}
      />
    );
  }
}

AdminHomeContainer.propTypes = {
  schoolPeriods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  warningStudents: PropTypes.oneOfType([
    PropTypes.shape({ message: PropTypes.string, error: PropTypes.string }),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]).isRequired,
  history: PropTypes.shape({}).isRequired,
  getListDispatch: PropTypes.func.isRequired,
  getReportDispatch: PropTypes.func.isRequired,
  getWarningStudentsListDispatch: PropTypes.func.isRequired,
  updateSchoolProgramDispatch: PropTypes.func.isRequired,
  cleanGetListDispatch: PropTypes.func.isRequired,
  cleanGetWarningStudentsListDispatch: PropTypes.func.isRequired,
};
AdminHomeContainer.defaultProps = {};

const mS = (state) => ({
  schoolPeriods: state.schoolPeriodReducer.list,
  warningStudents: state.studentReducer.warningStudents,
});

const mD = {
  getListDispatch: getList,
  getReportDispatch: getReport,
  getWarningStudentsListDispatch: getWarningStudentsList,
  updateSchoolProgramDispatch: updateSchoolProgram,
  cleanGetListDispatch: cleanGetList,
  cleanGetWarningStudentsListDispatch: cleanGetWarningStudentsList,
};

export default connect(mS, mD)(AdminHomeContainer);
