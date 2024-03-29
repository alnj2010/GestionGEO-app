import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {
  updateSchoolPeriod,
  findCurrentSchoolPeriod,
  cleanSelectedSchoolPeriod,
} from '../../actions/schoolPeriod';
import SchoolPeriodActual from '../../components/SchoolPeriods/actual';
import { define, cleanDialog } from '../../actions/dialog';
import { WEEKDAYS } from '../../services/constants';

class SchoolPeriodActualContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const { defineDispatch, findCurrentSchoolPeriodDispatch } = this.props;
    defineDispatch('periodo semestral');
    findCurrentSchoolPeriodDispatch()
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false }));
    document.querySelectorAll('.rbc-header').forEach((column, index) => {
      // eslint-disable-next-line no-param-reassign
      column.innerText = WEEKDAYS[index];
    });
  };

  componentWillUnmount = () => {
    const { cleanDialogDispatch, cleanSelectedSchoolPeriodDispatch } = this.props;
    cleanDialogDispatch();
    cleanSelectedSchoolPeriodDispatch();
  };

  saveSchoolPeriod = (values) => {
    const { updateSchoolPeriodDispatch, schoolPeriodActual } = this.props;

    const val = {
      end_date: values.endDate,
      inscription_visible: values.incriptionVisible,
      load_notes: values.loadNotes,
      withdrawal_deadline: values.withdrawalDeadline,
    };
    let payload = { ...schoolPeriodActual, ...val };
    payload = {
      id: payload.id,
      inscriptionVisible: payload.inscription_visible,
      endSchoolPeriod: payload.end_school_period,
      loadNotes: payload.load_notes,
      withdrawalDeadline: payload.withdrawal_deadline,
      codSchoolPeriod: payload.cod_school_period,
      inscriptionStartDate: payload.inscription_start_date,
      projectDuty: payload.project_duty,
      finalWorkDuty: payload.final_work_duty,
      endDate: payload.end_date,
      startDate: payload.start_date,
      subjects: payload.subjects.map((subject) => ({
        subjectId: subject.subject_id,
        teacherId: subject.teacher_id,
        duty: subject.duty,
        limit: subject.limit,
        modality: subject.modality,

        schedules: subject.schedules.map((schedule) => ({
          schoolPeriodSubjectTeacherId: schedule.school_period_subject_teacher_id,
          day: schedule.day,
          startHour: schedule.start_hour,
          endHour: schedule.end_hour,
          classroom: schedule.classroom,
        })),
      })),
    };
    updateSchoolPeriodDispatch(payload);
  };

  render() {
    const {
      schoolPeriodActual: {
        start_date: startDate,
        end_date: endDate,
        subjects,
        message,
        cod_school_period,
      },
      history
    } = this.props;
    const { isLoading } = this.state;

    return !message ? (
      <SchoolPeriodActual
        codSchoolPeriod={cod_school_period}
        loading={isLoading}
        startDate={startDate}
        endDate={endDate}
        saveSchoolPeriod={this.saveSchoolPeriod}
        subjects={subjects}
        history={history}
      />
    ) : (
      <Typography variant="h6" gutterBottom>
        Actualmente, no existe un periodo semestral abierto
      </Typography>
    );
  }
}

SchoolPeriodActualContainer.propTypes = {
  history: PropTypes.shape({}).isRequired,
  schoolPeriodActual: PropTypes.shape({
    message: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    subjects: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  updateSchoolPeriodDispatch: PropTypes.func.isRequired,
  defineDispatch: PropTypes.func.isRequired,
  cleanDialogDispatch: PropTypes.func.isRequired,
  findCurrentSchoolPeriodDispatch: PropTypes.func.isRequired,
  cleanSelectedSchoolPeriodDispatch: PropTypes.func.isRequired,
};
SchoolPeriodActualContainer.defaultProps = {};

const mS = (state) => ({
  schoolPeriodActual: state.schoolPeriodReducer.selectedSchoolPeriod,
});

const mD = {
  updateSchoolPeriodDispatch: updateSchoolPeriod,
  defineDispatch: define,
  cleanDialogDispatch: cleanDialog,
  cleanSelectedSchoolPeriodDispatch: cleanSelectedSchoolPeriod,
  findCurrentSchoolPeriodDispatch: findCurrentSchoolPeriod,
};

export default connect(mS, mD)(SchoolPeriodActualContainer);
