import React, { Component } from 'react';
import MaterialTable from 'material-table';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import { handleExportCsv } from '../../services/constants';

class StudentInscriptions extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }
  transformData = SchoolPeriods => {
    if (SchoolPeriods)
      return SchoolPeriods.map(SchoolPeriod => {
        return {
          id:SchoolPeriod.id,
          code: SchoolPeriod.cod_school_period,
          startDate:SchoolPeriod.end_date,
          endDate: SchoolPeriod.start_date,  
        };
      });
    return [];
  };

  render = () => {
    const { inscribedSchoolPeriods, isLoading, history, studentId } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.replace(`/estudiantes/inscripciones/nueva/${studentId}`,inscribedSchoolPeriods)}
          >
            <Add />
            Inscribir estudiante
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: 'id', field: 'id',hidden:true },
              { title: 'Codigo', field: 'code' },
              { title: 'Fecha Inicio', field: 'startDate' },
              { title: 'Fecha fin', field: 'endDate' },
            
            ]}
            data={this.transformData(inscribedSchoolPeriods)}
            title="estudiantes"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Ver detalles',
                onClick: (event, rowData) => {
                 history.replace(`/estudiantes/inscripciones/${studentId}/${rowData.id}`,inscribedSchoolPeriods)
                },
              },
            ]}
            options={{
              pageSize: 10,
              search: true,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'students'),
            }}
            onChangePage={()=>{window.scroll(0,0)}}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    );
  };
}

export default StudentInscriptions;
