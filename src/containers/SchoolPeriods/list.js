import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { getList, deleteSchoolPeriod } from '../../actions/schoolPeriod';
import SchoolPeriodsList from '../../components/SchoolPeriods/list';

class SchoolPeriodsListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const { getListDispatch, defineDispatch } = this.props;
    getListDispatch().then(() => this.setState({ isLoading: false }));
    defineDispatch('Periodo semestral');
  };

  componentWillUnmount = () => {
    const { cleanDialogDispatch } = this.props;
    cleanDialogDispatch();
  };

  handleDeleteSchoolPeriod = (id) => {
    const { getListDispatch, deleteSchoolPeriodDispatch } = this.props;
    deleteSchoolPeriodDispatch(id).then(() => getListDispatch());
  };

  render() {
    const { schoolPeriods, history, showDispatch } = this.props;
    const { isLoading } = this.state;
    return (
      <SchoolPeriodsList
        schoolPeriods={schoolPeriods}
        localization={{
          header: {
            actions: 'Acciones',
          },
        }}
        isLoading={isLoading}
        history={history}
        handleSchoolPeriodDetail={this.handleSchoolPeriodDetail}
        handleDeleteSchoolPeriod={this.handleDeleteSchoolPeriod}
        show={showDispatch}
      />
    );
  }
}

SchoolPeriodsListContainer.propTypes = {
  schoolPeriods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({}).isRequired,

  getListDispatch: PropTypes.func.isRequired,
  deleteSchoolPeriodDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  showDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  schoolPeriods: state.schoolPeriodReducer.list,
});

const mD = {
  getListDispatch: getList,
  deleteSchoolPeriodDispatch: deleteSchoolPeriod,
  cleanDialogDispatch: cleanDialog,
  defineDispatch: define,
  showDispatch: show,
};

export default connect(mS, mD)(SchoolPeriodsListContainer);
