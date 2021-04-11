import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

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

function SchoolProgramDetail({ students, updateQualifications, width, loadNotes, subject }) {
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
            qualification: student.qualification ? student.qualification : 'sin calificar',
            status: student.data_student.status,
          };
        })
      );
    }
  }, [students]);
  const matches = isWidthUp('sm', width);
  return (
    <MaterialTable
      title={matches ? `Estudiantes ${subject.name ? `de ${subject.name}` : ''}` : ''}
      columns={[
        { title: '#', field: 'id', hidden: true },
        {
          title: 'Cedula',
          field: 'identification',
          editable: 'never',
        },
        { title: 'Nombre', field: 'name', editable: 'never' },
        { title: 'Apellido', field: 'surname', editable: 'never' },
        {
          title: 'calificacion',
          field: 'qualification',
          type: 'numeric',
          editable: loadNotes ? 'always' : 'never',
        },
        { title: 'Estado', field: 'status', editable: 'never' },
      ]}
      data={studentsData}
      localization={{
        header: {
          actions: 'Acciones',
        },

        body: {
          emptyDataSourceMessage: 'No hay alumnos inscritos',
        },
      }}
      editable={
        loadNotes && {
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              updateQualifications(newData).then(() => {
                const dataUpdate = [...studentsData];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
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
  );
}

SchoolProgramDetail.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateQualifications: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  loadNotes: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withWidth()(SchoolProgramDetail));
