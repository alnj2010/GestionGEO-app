import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import MaterialTable, { MTableToolbar } from 'material-table';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import { Grid, Fab } from '@material-ui/core';
import Table from './Table';
import TableBodyRow from './Row';

function Inscription({ subjects, saveInscription, width, finalWorks }) {
  const matches = isWidthUp('sm', width);

  const [finalWorksData, setFinalWorksData] = useState([]);
  const tableFinalWorkRef = useRef(null);
  const tableSubjectRef = useRef(null);
  useEffect(() => {
    setFinalWorksData(
      finalWorks.map((fw) => {
        return {
          id: fw.id,
          code: fw.code,
          name: fw.name,
          laboratoryHours: fw.laboratory_hours,
          practicalHours: fw.practical_hours,
          theoreticalHours: fw.theoretical_hours,
          uc: fw.uc,
          title: 'Sin titulo',
        };
      })
    );
  }, [finalWorks]);

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
    <Grid container>
      <Grid item xs={12}>
        <MaterialTable
          tableRef={tableSubjectRef}
          title={matches ? 'Inscripcion' : ''}
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
            header: {
              actions: 'Acciones',
            },
          }}
          options={{
            search: false,
            selection: true,
            paging: false,
            showTextRowsSelected: false,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Table
          tableRef={tableFinalWorkRef}
          title={matches ? 'Inscripcion' : ''}
          options={{
            selection: true,
            search: false,
            paging: false,
            actionsColumnIndex: -1,
          }}
          components={{
            Row: TableBodyRow,
            Toolbar: () => null,
          }}
          columns={[
            {
              title: 'id',
              field: 'id',
              hidden: true,
            },
            {
              title: 'Codigo',
              field: 'code',
              editable: 'never',
            },
            {
              title: 'Titulo',
              field: 'title',
              editable: 'onUpdate',
            },
            { title: 'Nombre', field: 'name', editable: 'never' },
            { title: 'Unidades de Credito', field: 'uc', editable: 'never' },
          ]}
          data={finalWorksData}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                const data = [...finalWorksData];
                const index = data.indexOf(oldData);
                data[index] = newData;
                setFinalWorksData(data);

                resolve();
              }),
          }}
        />
      </Grid>

      <Grid container justify="center">
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="Add"
          onClick={() => {
            const enrolledSubjects = tableSubjectRef.current.props.data.filter(
              (item) => item.tableData.checked
            );
            const enrolledFinalWorks = tableSubjectRef.current.props.data.filter(
              (item) => item.tableData.checked
            );
            console.log({ enrolledSubjects, enrolledFinalWorks });
            //saveInscription({ enrolledSubjects, enrolledFinalWorks });
          }}
        >
          Inscribir
        </Fab>
      </Grid>
    </Grid>
  );
}

Inscription.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  saveInscription: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};

export default withWidth()(Inscription);
