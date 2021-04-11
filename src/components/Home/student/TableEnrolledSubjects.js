import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import MaterialTable from 'material-table';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import Cancel from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '../../Dialog';
import { reverseJson } from '../../../helpers/index';
import { SUBJECT_STATE } from '../../../services/constants';

const styles = () => ({
  tableContainer: {
    marginTop: 10,
  },
});
class TableEnrolledSubjects extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  handleDialogShow = (action, func) => {
    const { show } = this.props;
    this.setState({ func }, () => {
      show(action);
    });
  };

  render() {
    const {
      currentSubjects,
      classes,
      codSchoolPeriod,
      withdrawalDeadline,
      show,
      handleRetireSubject,
      isLoading,
    } = this.props;
    const { func } = this.state;
    return (
      <Grid item xs={12} className={classes.tableContainer}>
        <MaterialTable
          title={codSchoolPeriod}
          columns={[
            { title: 'id', field: 'id', hidden: true },
            { title: 'Codigo', field: 'code' },
            { title: 'Asignatura', field: 'name' },
            { title: 'Profesor', field: 'teacher' },
            { title: 'Calificacion', field: 'qualification' },
            { title: 'Estado', field: 'status' },
          ]}
          data={
            currentSubjects
              ? currentSubjects.map((subj) => ({
                  id: subj.id,
                  code: subj.data_subject.subject.code,
                  name: subj.data_subject.subject.name,
                  teacher: `${subj.data_subject.teacher.user.first_name} ${subj.data_subject.teacher.user.first_surname}`,
                  qualification: subj.qualification || 'Sin calificar',
                  status: reverseJson(SUBJECT_STATE)[subj.status],
                }))
              : []
          }
          localization={{
            body: {
              emptyDataSourceMessage: isLoading ? (
                <CircularProgress size={30} />
              ) : (
                'asignaturas inscritas'
              ),
            },

            header: {
              actions: 'Retiro',
            },
          }}
          actions={
            withdrawalDeadline && moment().isBefore(withdrawalDeadline)
              ? [
                  (rowData) => ({
                    icon: () => <Cancel />,
                    tooltip: 'Retirar asignatura',
                    disabled: rowData.status === reverseJson(SUBJECT_STATE)[SUBJECT_STATE.RETIRADO],
                    onClick: () =>
                      this.handleDialogShow('retirar', () => handleRetireSubject(rowData.id)),
                  }),
                ]
              : null
          }
          options={{
            search: false,
            paging: false,
            showTextRowsSelected: false,
          }}
        />
        <Dialog handleAgree={func} />
      </Grid>
    );
  }
}

TableEnrolledSubjects.propTypes = {};
TableEnrolledSubjects.defaultProps = {};

export default withStyles(styles)(TableEnrolledSubjects);
