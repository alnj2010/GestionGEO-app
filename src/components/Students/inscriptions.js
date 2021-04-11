import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import Add from '@material-ui/icons/Add';
import { Fab, Grid, Button } from '@material-ui/core';
import handleExportCsv from '../../utils/handleExportCsv';
import Dialog from '../Dialog';

class StudentInscriptions extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  transformData = (schoolPeriods) => {
    if (schoolPeriods)
      return schoolPeriods.map((schoolPeriod) => {
        return {
          id: schoolPeriod.school_period_id,
          inscriptionId: schoolPeriod.id,
          code: schoolPeriod.school_period.cod_school_period,
          startDate: schoolPeriod.school_period.end_date,
          endDate: schoolPeriod.school_period.start_date,
        };
      });
    return [];
  };

  goBack = () => {
    const { history, userId } = this.props;
    history.push(`/usuarios/estudiantes/modificar/${userId}`);
  };

  handleDialogShow = (action, func) => {
    const { show } = this.props;
    this.setState({ func }, () => {
      show(action);
    });
  };

  render = () => {
    const {
      inscribedSchoolPeriods,
      isLoading,
      history,
      studentId,
      userId,
      fullname,
      handleDeleteInscription,
      getConstance,
    } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item container justify="space-between" xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() =>
              history.push(`/usuarios/estudiantes/inscripciones/${userId}/${studentId}/nueva`)
            }
          >
            <Add />
            Inscribir estudiante
          </Fab>
          <Button variant="contained" onClick={this.goBack}>
            Ir al detalle de {fullname.toUpperCase()}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: 'id', field: 'id', hidden: true },
              { title: 'inscriptionId', field: 'inscriptionId', hidden: true },
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
                  history.push(
                    `/usuarios/estudiantes/inscripciones/${userId}/${studentId}/${rowData.id}`
                  );
                },
              },
              {
                icon: 'archive',
                tooltip: 'Constancia de inscripción',
                onClick: (event, rowData) => {
                  getConstance(studentId, 'student', 'inscription', {
                    inscriptionId: rowData.inscriptionId,
                  });
                },
              },
              {
                icon: 'delete',
                id: 'delete',
                tooltip: 'Borrar Inscripcion',
                onClick: (event, rowData) => {
                  this.handleDialogShow('eliminar', () =>
                    handleDeleteInscription(rowData.inscriptionId)
                  );
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
              body: {
                emptyDataSourceMessage: 'Cargando',
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
