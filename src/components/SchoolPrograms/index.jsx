import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { array, bool, object, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import { handleExportCsv } from '../../services/constants';

class SchoolProgramsList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }
  transformData = schoolPrograms => {
    if (schoolPrograms)
      return schoolPrograms.map(schoolProgram => {
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
    this.setState({ func: func }, () => {
      show(action);
    });
  };

  render = () => {
    const { schoolPrograms, isLoading, history, handleDeleteSchoolProgram } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/programas-academicos/create`)}
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
            title="Programas Academicos"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Ver detalles',
                onClick: (event, rowData) => {
                  history.push(`/programas-academicos/edit/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Borrar programa academico',
                onClick: (event, rowData) => {
                  this.handleDialogShow('eliminar', entity =>
                    handleDeleteSchoolProgram(rowData.id),
                  );
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
            onChangePage={()=>{window.scroll(0,0)}}
            isLoading={isLoading}
          />
        </Grid>
        <Dialog handleAgree={func} />
      </Grid>
    );
  };
}

SchoolProgramsList.propTypes = {
  schoolPrograms: array,
  isLoading: bool.isRequired,
  history: object.isRequired,
  handleDeleteSchoolProgram: func.isRequired,
};

export default SchoolProgramsList;
