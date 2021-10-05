import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress, Grid, Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';

import MaterialTable from 'material-table';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { reverseJson } from '../../helpers/index';
import { SUBJECT_STATE } from '../../services/constants';

const styles = () => ({
  form: {
    paddingLeft: '5%',
  },
  buttonContainer: { paddingTop: '2%' },
  save: {
    color: 'white',
    backgroundColor: '#61A956',
    '&:hover': {
      backgroundColor: 'rgb(78, 127, 71)',
    },
  },
  button: {
    width: '100%',
  },
});

function SchoolProgramDetail({
  students,
  updateQualifications,
  width,
  loadNotes,
  subject,
  isLoading,
  goBack,
}) {
  const [studentsData, setStudentsData] = useState([]);
  useEffect(() => {
    if (students && students.length) {
      setStudentsData(
        students.map((student) => {
          return {
            id: student.id,
            identification: student.data_student.student.user.identification,
            name: student.data_student.student.user.first_name,
            surname: student.data_student.student.user.first_surname,
            qualification: student.qualification !== null ? student.qualification : 'sin calificar',
            status: reverseJson(SUBJECT_STATE)[student.status],
          };
        })
      );
    }
  }, [students]);
  const matches = isWidthUp('sm', width);
  return (
    <Grid container>
      <Grid container item xs={12} justify="flex-end">
        <Grid item xs={1}>
          <Button variant="contained" onClick={goBack} style={{ width: '100%' }}>
            <ArrowBack />
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MaterialTable
          title={matches ? `Estudiantes ${subject.name ? `de ${subject.name}` : ''}` : ''}
          columns={[
            { title: '#', field: 'id', hidden: true },
            {
              title: 'cédula',
              field: 'identification',
              editable: 'never',
            },
            { title: 'Nombre', field: 'name', editable: 'never' },
            { title: 'Apellido', field: 'surname', editable: 'never' },
            { title: 'Estado', field: 'status', editable: 'never' },
            {
              title: 'calificacion',
              field: 'qualification',
              type: 'numeric',
              editable: loadNotes ? 'always' : 'never',
            },
          ]}
          data={studentsData}
          localization={{
            header: {
              actions: 'Acciones',
            },

            body: {
              emptyDataSourceMessage: isLoading ? (
                <CircularProgress size={30} />
              ) : (
                'No hay alumnos inscritos'
              ),
            },
          }}
          editable={
            loadNotes && {
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  updateQualifications(newData).then((res) => {
                    const dataUpdate = [...studentsData];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = {
                      ...newData,
                      status:
                        newData.status === SUBJECT_STATE.RETIRADO
                          ? newData.status
                          : newData.qualification < 10
                            ? reverseJson(SUBJECT_STATE)[SUBJECT_STATE.REPROBADO]
                            : reverseJson(SUBJECT_STATE)[SUBJECT_STATE.APROBADO],
                    };
                    setStudentsData([...dataUpdate]);

                    resolve();
                  });
                }),
            }
          }
          options={{
            search: false,
            paging: false,
            actionsColumnIndex: -1,
          }}
        />
      </Grid>
    </Grid>
  );
}

SchoolProgramDetail.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateQualifications: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  loadNotes: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withWidth()(SchoolProgramDetail));
