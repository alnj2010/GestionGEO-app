import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import handleExportCsv from '../../utils/handleExportCsv';

class StudentInscriptions extends Component {
  transformData = (schoolPeriods) => {
    if (schoolPeriods)
      return schoolPeriods.map((schoolPeriod) => {
        return {
          id: schoolPeriod.school_period_id,
          code: schoolPeriod.school_period.cod_school_period,
          startDate: schoolPeriod.school_period.end_date,
          endDate: schoolPeriod.school_period.start_date,
        };
      });
    return [];
  };

  render = () => {
    const { inscribedSchoolPeriods, isLoading, history, studentId, userId, fullname } = this.props;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/estudiantes/inscripciones/${userId}/${studentId}/nueva`)}
          >
            <Add />
            Inscribir estudiante
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: 'id', field: 'id', hidden: true },
              { title: 'Codigo', field: 'code' },
              { title: 'Fecha Inicio', field: 'startDate' },
              { title: 'Fecha fin', field: 'endDate' },
            ]}
            data={this.transformData(inscribedSchoolPeriods)}
            title={fullname.toUpperCase()}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Ver detalles',
                onClick: (event, rowData) => {
                  history.push(`/estudiantes/inscripciones/${userId}/${studentId}/${rowData.id}`);
                },
              },
            ]}
            options={{
              pageSize: 10,
              search: true,
              exportButton: true,
              exportCsv: (columns, renderData) => handleExportCsv(columns, renderData, 'students'),
            }}
            onChangePage={() => {
              window.scroll(0, 0);
            }}
            localization={{
              header: {
                actions: 'Acciones',
              },
            }}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    );
  };
}
StudentInscriptions.propTypes = {
  inscribedSchoolPeriods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  // eslint-disable-next-line react/forbid-prop-types
  studentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  fullname: PropTypes.string.isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  isLoading: PropTypes.bool.isRequired,
};
export default StudentInscriptions;
