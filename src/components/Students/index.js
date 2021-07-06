import React, { Component } from 'react';
import MaterialTable from 'material-table';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { PropTypes } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import handleExportCsv from '../../utils/handleExportCsv';
import HelpButton from '../HelpButton';

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
            onClick={() => history.push(`/usuarios/estudiantes/agregar`)}
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
              { title: 'cédula', field: 'identification' },
              { title: 'Email', field: 'email' },
            ]}
            data={this.transformData(students)}
            title={
              matches ? (
                <>
                  Estudiantes{' '}
                  <HelpButton>
                    <div>
                      <b>Estudiantes</b>
                    </div>
                    <div>
                      Son las entidades mas importantes del sistema. Estan asociados directamente a
                      un Programa Academico. Pueden inscribir asignaturas y solicitar constancias
                      tanto de inscripcion como de estudio.
                    </div>
                    <br />
                    <div>
                      Abajo se listan los distintos estudiantes existenten en el Postgrado de
                      Geoquímica
                    </div>
                  </HelpButton>
                </>
              ) : (
                ''
              )
            }
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Ver detalles',
                onClick: (event, rowData) => {
                  history.push(`/usuarios/estudiantes/modificar/${rowData.id}`);
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
