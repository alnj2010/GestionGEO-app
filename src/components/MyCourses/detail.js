import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

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

class SchoolProgramDetail extends Component {
  transformData = (students) => {
    if (students)
      return students.map((student) => {
        return {
          id: student.id,
          identification: student.data_student.student.user.identification,
          name: student.data_student.student.user.first_name,
          surname: student.data_student.student.user.first_surname,
          qualification: student.qualification ? student.qualification : 0,
          status: student.data_student.status,
        };
      });
    return [];
  };

  render = () => {
    const { students, updateQualifications } = this.props;
    return (
      <MaterialTable
        title="Estudiantes"
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
          },
          { title: 'Estado', field: 'status', editable: 'never' },
        ]}
        data={this.transformData(students)}
        editable={{
          onRowUpdate: (newData) =>
            new Promise((resolve) => {
              updateQualifications(newData);
              resolve();
            }),
        }}
      />
    );
  };
}

SchoolProgramDetail.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateQualifications: PropTypes.func.isRequired,
};

export default withStyles(styles)(SchoolProgramDetail);
