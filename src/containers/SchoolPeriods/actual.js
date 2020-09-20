import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { updateSchoolPeriod, findCurrentSchoolPeriod } from '../../actions/schoolPeriod';
import SchoolPeriodActual from '../../components/SchoolPeriods/actual';
import { define, cleanDialog } from '../../actions/dialog';

class SchoolPeriodActualContainer extends Component {
  componentDidMount = () => {
    const { define, findCurrentSchoolPeriod } = this.props;
    define('periodo semestral');
    findCurrentSchoolPeriod();
    const weekDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
    document.querySelectorAll('.rbc-header').forEach((column, index) => {
      column.innerText = weekDays[index];
    });
  };

  componentWillUnmount = () => {
    this.props.cleanDialog();
  };

  saveSchoolPeriod = (values) => {
    const { updateSchoolPeriod, schoolPeriodActual } = this.props;
    values = {
      end_date: values.endDate,
      inscription_visible: values.incriptionVisible,
      load_notes: values.loadNotes,
    };
    let payload = { ...schoolPeriodActual, ...values };
    payload = {
      id: payload.id,
      inscriptionVisible: payload.inscription_visible,
      endSchoolPeriod: payload.end_school_period,
      loadNotes: payload.load_notes,
      codSchoolPeriod: payload.cod_school_period,
      inscriptionStartDate: payload.inscription_start_date,
      projectDuty: payload.project_duty,
      finalWorkDuty: payload.final_work_duty,
      endDate: payload.end_date,
      startDate: payload.start_date,
      subjects: payload.subjects.map((subject) => ({
        subjectId: subject.id,
        teacherId: subject.teacher_id,
        duty: subject.duty,
        limit: subject.limit,
        schedules: subject.schedules.map((schedule) => ({
          schoolPeriodSubjectTeacherId: schedule.school_period_subject_teacher_id,
          day: schedule.day,
          startHour: schedule.start_hour,
          endHour: schedule.end_hour,
          classroom: schedule.classroom,
        })),
      })),
    };
    updateSchoolPeriod(payload);
  };

  render() {
    const {
      schoolPeriodActual: { start_date, end_date, subjects },
    } = this.props;
    return !this.props.schoolPeriodActual.message ? (
      <SchoolPeriodActual
        startDate={start_date}
        endDate={end_date}
        saveSchoolPeriod={this.saveSchoolPeriod}
        subjects={subjects}
      />
    ) : (
      <Typography variant="h6" gutterBottom>
        Actualmente no existe un periodo semestral abierto
      </Typography>
    );
  }
}

SchoolPeriodActualContainer.propTypes = {
  history: object.isRequired,
  updateSchoolPeriod: func.isRequired,
};

const mS = (state) => ({
  schoolPeriodActual: state.schoolPeriodReducer.selectedSchoolPeriod,
});

const mD = {
  updateSchoolPeriod,
  define,
  cleanDialog,
  findCurrentSchoolPeriod,
};

SchoolPeriodActualContainer = connect(mS, mD)(SchoolPeriodActualContainer);

export default SchoolPeriodActualContainer;
