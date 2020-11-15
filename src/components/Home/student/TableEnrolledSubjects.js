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

function TableEnrolledSubjects({ currentSubjects, classes, codSchoolPeriod }) {
  return (
    <Grid item xs={12} className={classes.tableContainer}>
      <MaterialTable
        title={codSchoolPeriod}
        columns={[
          { title: 'Codigo', field: 'code' },
          { title: 'Materia', field: 'name' },
          { title: 'Profesor', field: 'teacher' },
          { title: 'Calificacion', field: 'qualification' },
        ]}
        data={
          currentSubjects
            ? currentSubjects.map((subj) => ({
                code: subj.data_subject.subject.code,
                name: subj.data_subject.subject.name,
                teacher: `${subj.data_subject.teacher.user.first_name} ${subj.data_subject.teacher.user.first_surname}`,
                qualification: subj.qualification || 'Sin calificar',
              }))
            : []
        }
        localization={{
          body: {
            emptyDataSourceMessage: 'No hay materias inscritas',
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

TableEnrolledSubjects.propTypes = {};
TableEnrolledSubjects.defaultProps = {};

export default withStyles(styles)(TableEnrolledSubjects);
