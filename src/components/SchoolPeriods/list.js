import React, { Component } from 'react';
import MaterialTable from 'material-table';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import handleExportCsv from '../../utils/handleExportCsv';
import HelpButton from '../HelpButton';

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
    const { schoolPeriods, isLoading, history, handleDeleteSchoolPeriod, width } = this.props;
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
            onClick={() => history.push(`/periodo-semestral/agregar`)}
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
            title={
              matches ? (
                <>
                  Periodos Semestrales{' '}
                  <HelpButton>
                    <div>
                      <b> Periodos Semestral</b>
                    </div>
                    <div>
                      Se define como el tiempo durante el cual el Postgrado de Geoquímica imparte
                      clases a los estudiantes que cursan una o más asignaturas.
                    </div>
                    <br />
                    <div>
                      Abajo se listan los distintos Periodos Semestrales existenten en el Postgrado
                      de Geoquímica
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
                  history.push(`/periodo-semestral/modificar/${rowData.id}`);
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
  width: PropTypes.string.isRequired,

  isLoading: PropTypes.bool.isRequired,

  show: PropTypes.func.isRequired,
  handleDeleteSchoolPeriod: PropTypes.func.isRequired,
};

export default withWidth()(SchoolPeriodsList);
