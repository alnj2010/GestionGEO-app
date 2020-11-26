import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  findSchoolPeriodById,
  updateSchoolPeriod,
  deleteSchoolPeriod,
  cleanSelectedSchoolPeriod,
  saveSchoolPeriod,
} from '../../actions/schoolPeriod';
import {
  getList as getSubjectList,
  cleanGetList as cleanGetSubjectList,
} from '../../actions/subject';
import {
  getList as getTeacherList,
  cleanGetList as cleanGetTeacherList,
} from '../../actions/teacher';
import SchoolPeriodDetail from '../../components/SchoolPeriods/detail';
import { define, cleanDialog } from '../../actions/dialog';

class SchoolPeriodDetailContainer extends Component {
  componentDidMount = () => {
    const {
      match,
      findSchoolPeriodByIdDispatch,
      defineDispatch,
      getSubjectListDispatch,
      getTeacherListDispatch,
    } = this.props;
    if (match.params.id) findSchoolPeriodByIdDispatch(match.params.id);
    getSubjectListDispatch();
    getTeacherListDispatch();
    defineDispatch('Periodo semestral');
  };

  componentWillUnmount = () => {
    const {
      cleanSelectedSchoolPeriodDispatch,
      cleanDialogDispatch,
      cleanGetSubjectListDispatch,
      cleanGetTeacherListDispatch,
    } = this.props;
    cleanSelectedSchoolPeriodDispatch();
    cleanDialogDispatch();
    cleanGetSubjectListDispatch();
    cleanGetTeacherListDispatch();
  };

  saveSchoolPeriod = (values) => {
    const {
      match,
      updateSchoolPeriodDispatch,
      findSchoolPeriodByIdDispatch,
      saveSchoolPeriodDispatch,
      history,
    } = this.props;
    if (match.params.id) updateSchoolPeriodDispatch({ ...values, ...match.params });
    else
      saveSchoolPeriodDispatch({ ...values }).then((response) => {
        if (response) {
          findSchoolPeriodByIdDispatch(response).then(() => history.push(`modificar/${response}`));
        }
      });
  };

  goBack = () => {
    const { history } = this.props;
    history.push('/periodo-semestral/periodos');
  };

  handleSchoolPeriodDelete = () => {
    const { deleteSchoolPeriodDispatch, history, match } = this.props;
    deleteSchoolPeriodDispatch(match.params.id).then(() => history.push('/periodo-semestral'));
  };

  render() {
    const { schoolPeriod, subjects, teachers } = this.props;
    return (
      <SchoolPeriodDetail
        subjects={subjects}
        teachers={teachers}
        saveSchoolPeriod={this.saveSchoolPeriod}
        goBack={this.goBack}
        schoolPeriod={schoolPeriod}
        schoolPeriodId={schoolPeriod.id}
        handleSchoolPeriodDelete={this.handleSchoolPeriodDelete}
      />
    );
  }
}

SchoolPeriodDetailContainer.propTypes = {
  schoolPeriod: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,

  subjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  }).isRequired,

  findSchoolPeriodByIdDispatch: PropTypes.func.isRequired,
  updateSchoolPeriodDispatch: PropTypes.func.isRequired,
  saveSchoolPeriodDispatch: PropTypes.func.isRequired,
  deleteSchoolPeriodDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  cleanSelectedSchoolPeriodDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  getSubjectListDispatch: PropTypes.func.isRequired,
  getTeacherListDispatch: PropTypes.func.isRequired,
  cleanGetSubjectListDispatch: PropTypes.func.isRequired,
  cleanGetTeacherListDispatch: PropTypes.func.isRequired,
};

const mS = (state) => ({
  schoolPeriod: state.schoolPeriodReducer.selectedSchoolPeriod,
  subjects: state.subjectReducer.list,
  teachers: state.teacherReducer.list,
});

const mD = {
  findSchoolPeriodByIdDispatch: findSchoolPeriodById,
  updateSchoolPeriodDispatch: updateSchoolPeriod,
  saveSchoolPeriodDispatch: saveSchoolPeriod,
  deleteSchoolPeriodDispatch: deleteSchoolPeriod,
  defineDispatch: define,
  cleanSelectedSchoolPeriodDispatch: cleanSelectedSchoolPeriod,
  cleanDialogDispatch: cleanDialog,
  getSubjectListDispatch: getSubjectList,
  getTeacherListDispatch: getTeacherList,
  cleanGetSubjectListDispatch: cleanGetSubjectList,
  cleanGetTeacherListDispatch: cleanGetTeacherList,
};

export default connect(mS, mD)(SchoolPeriodDetailContainer);
