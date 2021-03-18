import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import { withStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

const styles = () => ({});
function SubjectTable({ subjects, setSubjectsSelected, message }) {
  const transformData = () => {
    if (subjects)
      return subjects.map((subject) => {
        return {
          school_period_subject_teacher_id: subject.id,
          subject: subject.subject.name,
          teacher: `${subject.teacher.user.first_name} ${subject.teacher.user.first_surname}`,
          duty: subject.duty,
          uc: subject.subject.uc,
          enrolled_students: subject.enrolled_students,
        };
      });
    return [];
  };

  return (
    <Grid item xs={12}>
      <MaterialTable
        components={{
          Toolbar: () => null,
        }}
        columns={[
          {
            title: 'school_period_subject_teacher_id',
            field: 'school_period_subject_teacher_id',
            hidden: true,
          },
          { title: 'Materia', field: 'subject' },
          { title: 'Profesor', field: 'teacher' },
          { title: 'Aranceles', field: 'duty' },
          { title: 'Unidades de credito', field: 'uc' },
          { title: 'Inscritos', field: 'enrolled_students' },
        ]}
        data={transformData()}
        localization={{
          body: {
            emptyDataSourceMessage: message || 'No hay asignaturas disponibles para inscribir',
          },
        }}
        options={{
          search: false,
          selection: true,
          paging: false,
          showTextRowsSelected: false,
        }}
        onSelectionChange={(rows) => setSubjectsSelected(rows)}
      />
    </Grid>
  );
}

SubjectTable.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withStyles(styles)(
  memo(
    SubjectTable,
    (prevProps, nextProps) =>
      prevProps.subjects.length === nextProps.subjects.length &&
      prevProps.message === nextProps.message
  )
);
