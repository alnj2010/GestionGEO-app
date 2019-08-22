import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import {
  findSchoolPeriodById,
  updateSchoolPeriod,
  deleteSchoolPeriod,
  cleanSelectedSchoolPeriod,
  saveSchoolPeriod,
} from '../../actions/schoolPeriod';
import { getList as getPostgraduateList } from '../../actions/postgraduate';
import SchoolPeriodDetail from '../../components/SchoolPeriods/detail';
import { define, cleanDialog } from '../../actions/dialog';
export class SchoolPeriodDetailContainer extends Component {
  componentDidMount = () => {
    const { match, findSchoolPeriodById, define } = this.props;
    console.log(match.params.id);
    if (match.params.id) findSchoolPeriodById(match.params.id);
    this.props.getPostgraduateList();
    define('Periodo semestral');
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedSchoolPeriod();
    this.props.cleanDialog();
    
  };

  saveSchoolPeriod = values => {
    const {
      match,
      updateSchoolPeriod,
      findSchoolPeriodById,
      saveSchoolPeriod,
      history,
    } = this.props;
    const payload = { ...values };
    if (match.params.id) updateSchoolPeriod({ ...payload, ...match.params });
    else
      saveSchoolPeriod({ ...payload }).then(response => {
        if (response) {
          findSchoolPeriodById(response).then(res => history.push(`edit/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleSchoolPeriodDelete = () => {
    const { deleteSchoolPeriod, history, match } = this.props;
    deleteSchoolPeriod(match.params.id).then(res => history.push('/periodo-semestral'));
  };


  render() {
    const {
      schoolPeriod: { id },
      postgraduates
    } = this.props;
    console.log('dasdsad',id);
    return (
      <SchoolPeriodDetail
        postgraduates={postgraduates}
        saveSchoolPeriod={this.saveSchoolPeriod}
        goBack={this.goBack}
        schoolPeriodId={id}
        handleSchoolPeriodDelete={this.handleSchoolPeriodDelete}
      />
    );
  }
}

SchoolPeriodDetailContainer.propTypes = {
  deleteSchoolPeriod: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  updateSchoolPeriod: func.isRequired,
  findSchoolPeriodById: func.isRequired,
  saveSchoolPeriod: func.isRequired,
};

const mS = state => ({
  schoolPeriod: state.schoolPeriodReducer.selectedSchoolPeriod,
  postgraduates: state.postgraduateReducer.list,
});

const mD = {
  findSchoolPeriodById,
  updateSchoolPeriod,
  saveSchoolPeriod,
  deleteSchoolPeriod,
  define,
  cleanSelectedSchoolPeriod,
  cleanDialog,
  getPostgraduateList
};

SchoolPeriodDetailContainer = connect(
  mS,
  mD,
)(SchoolPeriodDetailContainer);

export default SchoolPeriodDetailContainer;
