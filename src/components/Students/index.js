import React, { Component } from 'react';
import MaterialTable from 'material-table';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { PropTypes } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import handleExportCsv from '../../utils/handleExportCsv';

class StudentsList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  transformData = (students) => {
    if (students)
      return students.map((student) => {
        return {
          id: student.id,
          studentId: student.student.id,
          email: student.email,
          identification: student.identification,
          firstName: student.first_name,
          firstSurname: student.first_surname,
          secondName: student.second_name ? student.second_name : '',
          secondSurname: student.second_surname ? student.second_surname : '',
        };
      });
    return [];
  };

  handleDialogShow = (action, func) => {
    const { show } = this.props;
    this.setState({ func }, () => {
      show(action);
    });
  };

  render = () => {
    const { students, isLoading, history, handleDeleteStudent, width } = this.props;
    const { func } = this.state;
    const matches = isWidthUp('sm', width);
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/estudiantes/agregar`)}
          >
            <Add />
            Agregar estudiante
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: 'id', hidden: true },
              { title: '#', field: 'studentId', hidden: true },
              {
                title: 'Nombre',
                field: 'secondName',
                hidden: true,
              },
              {
                title: 'Apellido',
                field: 'secondSurname',
                hidden: true,
              },
              { title: 'Nombre', field: 'firstName' },
              { title: 'Apellido', field: 'firstSurname' },
              { title: 'Cedula', field: 'identification' },
              { title: 'Email', field: 'email' },
            ]}
            data={this.transformData(students)}
            title={matches ? 'Estudiantes' : ''}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Ver detalles',
                onClick: (event, rowData) => {
                  history.push(`/estudiantes/modificar/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Borrar estudiante',
                onClick: (event, rowData) => {
                  this.handleDialogShow('eliminar', () => handleDeleteStudent(rowData.id));
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
        <Dialog handleAgree={func} />
      </Grid>
    );
  };
}

StudentsList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  isLoading: PropTypes.bool.isRequired,

  show: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  handleDeleteStudent: PropTypes.func.isRequired,
};

export default withWidth()(StudentsList);
