import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import {
  updateSchoolPeriod,
  getList
} from '../../actions/schoolPeriod';
import SchoolPeriodActual from '../../components/SchoolPeriods/actual';
import { define, cleanDialog } from '../../actions/dialog';
export class SchoolPeriodActualContainer extends Component {
  componentDidMount = () => {
    const {define,getList } = this.props;
    define('periodo semestral');
    getList();
  };
  componentWillUnmount = () => {
    this.props.cleanDialog();    
  };

  saveSchoolPeriod = values => {
    const {
      match,
      updateSchoolPeriod,
    } = this.props;
    const payload = { ...values };
    console.log(payload);
   //if (match.params.id) updateSchoolPeriod({ ...payload, ...match.params });
  };


  render() {
    const {
      schoolPeriodActual:{start_date,end_date}
    }=this.props;
 
    return (
      <SchoolPeriodActual
        startDate={start_date}
        endDate={end_date}
        saveSchoolPeriod={this.saveSchoolPeriod}
      />
    );
  }
}

SchoolPeriodActualContainer.propTypes = {
  history: object.isRequired,
  updateSchoolPeriod: func.isRequired,
};

const mS = state => ({
  schoolPeriodActual: state.schoolPeriodReducer.list.length ? state.schoolPeriodReducer.list[0] : {},
});

const mD = {
  updateSchoolPeriod,
  define,
  cleanDialog,
  getList,
};

SchoolPeriodActualContainer = connect(
  mS,
  mD,
)(SchoolPeriodActualContainer);

export default SchoolPeriodActualContainer;
