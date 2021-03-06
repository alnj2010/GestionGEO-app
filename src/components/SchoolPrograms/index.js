import React, { Component } from 'react';
import MaterialTable from 'material-table';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import handleExportCsv from '../../utils/handleExportCsv';

class SchoolProgramsList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  transformData = (schoolPrograms) => {
    if (schoolPrograms)
      return schoolPrograms.map((schoolProgram) => {
        return {
          id: schoolProgram.id,
          schoolProgramName: schoolProgram.school_program_name,
          numCu: schoolProgram.num_cu,
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
    const { schoolPrograms, isLoading, history, handleDeleteSchoolProgram, width } = this.props;
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
            onClick={() => history.push(`/programas-academicos/agregar`)}
          >
            <Add />
            Agregar programa academico
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: 'id', hidden: true },
              { title: 'Nombre', field: 'schoolProgramName' },
              { title: '# Unidades de credito', field: 'numCu' },
            ]}
            data={this.transformData(schoolPrograms)}
            title={matches ? 'Programas Academicos' : ''}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Ver detalles',
                onClick: (event, rowData) => {
                  history.push(`/programas-academicos/modificar/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Borrar programa academico',
                onClick: (event, rowData) => {
                  this.handleDialogShow('eliminar', () => handleDeleteSchoolProgram(rowData.id));
                },
              },
            ]}
            options={{
              pageSize: 10,
              search: true,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'schoolPrograms'),
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

SchoolProgramsList.propTypes = {
  schoolPrograms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  isLoading: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired,
  show: PropTypes.func.isRequired,
  handleDeleteSchoolProgram: PropTypes.func.isRequired,
};

export default withWidth()(SchoolProgramsList);
