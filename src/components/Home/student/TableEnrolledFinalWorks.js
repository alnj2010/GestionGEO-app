import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import { Grid, Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  tableContainer: {
    marginTop: 10,
  },
});

function TableEnrolledFinalWorks({ finalWorks, classes }) {
  const [{ is_project: isProject }] = finalWorks;
  const titleTable = isProject ? 'proyectos o seminarios' : 'trabajos finales';
  const searchStatus = (schoolPeriods) =>
    schoolPeriods.findIndex((sp) => sp.final_work_school_period.status !== 'PROGRESS').length
      ? 'REPROBADO'
      : 'EN PROGRESO';

  const transforData = () =>
    finalWorks.map((item) => ({
      title: item.title,
      qualification: item.approval_date ? 'APROBADO' : searchStatus(item.school_periods),
    }));

  return (
    <Grid item xs={12} className={classes.tableContainer}>
      <MaterialTable
        title={titleTable.toUpperCase()}
        columns={[
          { title: 'Título', field: 'title' },
          { title: 'Calificación', field: 'qualification' },
        ]}
        data={transforData()}
        localization={{
          body: {
            emptyDataSourceMessage: `No hay ${titleTable} inscritos`,
          },
        }}
        options={{
          search: false,
          paging: false,
          showTextRowsSelected: false,
        }}
      />
    </Grid>
  );
}

TableEnrolledFinalWorks.propTypes = {};
TableEnrolledFinalWorks.defaultProps = {};

export default withStyles(styles)(TableEnrolledFinalWorks);
