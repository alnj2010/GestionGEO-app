import React, { Component } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import handleExportCsv from '../../utils/handleExportCsv';

class SchoolPeriodsList extends Component {
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
          id: schoolPeriod.id,
          codSchoolPeriod: schoolPeriod.cod_school_period,
          startDate: schoolPeriod.start_date,
          endDate: schoolPeriod.end_date,
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
    const { schoolPeriods, isLoading, history, handleDeleteSchoolPeriod } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/periodo-semestral/create`)}
          >
            <Add />
            Agregar periodo semestral
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: 'id', hidden: true },
              { title: 'Codigo', field: 'codSchoolPeriod' },
              { title: 'Fecha Inicio', field: 'startDate' },
              { title: 'Fecha Fin', field: 'endDate' },
            ]}
            data={this.transformData(schoolPeriods)}
            title="Periodos semestrales"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Ver detalles',
                onClick: (event, rowData) => {
                  history.push(`/periodo-semestral/edit/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Borrar periodo semestral',
                onClick: (event, rowData) => {
                  this.handleDialogShow('eliminar', () => handleDeleteSchoolPeriod(rowData.id));
                },
              },
            ]}
            options={{
              pageSize: 10,
              search: true,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'schoolPeriods'),
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

SchoolPeriodsList.propTypes = {
  schoolPeriods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  isLoading: PropTypes.bool.isRequired,

  show: PropTypes.func.isRequired,
  handleDeleteSchoolPeriod: PropTypes.func.isRequired,
};

export default SchoolPeriodsList;
