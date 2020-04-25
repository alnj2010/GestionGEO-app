import React, { Component } from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteSchoolPeriod } from '../../actions/schoolPeriod';
import SchoolPeriodsList from '../../components/SchoolPeriods/list';

export class SchoolPeriodsListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const { getList, define } = this.props;
    getList().then(() => this.setState({ isLoading: false }));
    define('Periodo semestral');
  };

  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  handleDeleteSchoolPeriod = (id) => {
    const { getList, deleteSchoolPeriod } = this.props;
    deleteSchoolPeriod(id).then((res) => getList());
  };

  render() {
    const { schoolPeriods, history, show } = this.props;
    const { isLoading } = this.state;
    return (
      <SchoolPeriodsList
        schoolPeriods={schoolPeriods}
        isLoading={isLoading}
        history={history}
        handleSchoolPeriodDetail={this.handleSchoolPeriodDetail}
        handleDeleteSchoolPeriod={this.handleDeleteSchoolPeriod}
        show={show}
      />
    );
  }
}

SchoolPeriodsListContainer.propTypes = {
  schoolPeriods: array,
  history: object.isRequired,
  getList: func.isRequired,
  deleteSchoolPeriod: func.isRequired,
};

const mS = (state) => ({
  schoolPeriods: state.schoolPeriodReducer.list,
});

const mD = {
  getList,
  deleteSchoolPeriod,
  cleanDialog,
  define,
  show,
};

SchoolPeriodsListContainer = connect(mS, mD)(SchoolPeriodsListContainer);

export default SchoolPeriodsListContainer;
