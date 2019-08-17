import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { array, bool, object, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import { handleExportCsv } from '../../services/constants';

class SubjectsList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }
  transformData = subjects => {
    if (subjects)
      return subjects.map(subject => {
        return {
          id: subject.id,
          subjectCode: subject.subject_code,
          subjectName: subject.subject_name,
          subjectType: subject.subject_type,
          uc: subject.uc,
       
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
    const { subjects, isLoading, history, handleDeleteSubject } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/materias/create`)}
          >
            <Add />
            Agregar materia
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: 'id', hidden: true },
              { title: 'Codigo', field: 'subjectCode' },
              { title: 'Nombre', field: 'subjectName' },
              { title: 'Tipo', field: 'subjectType' },
              { title: 'Unidades de Credito', field: 'uc' },
            
            ]}
            data={this.transformData(subjects)}
            title="materias"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Ver detalles',
                onClick: (event, rowData) => {
                  history.push(`/materias/edit/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Borrar materia',
                onClick: (event, rowData) => {
                  this.handleDialogShow('eliminar', entity =>
                    handleDeleteSubject(rowData.id),
                  );
                },
              },
            ]}
            options={{
              pageSize: 10,
              search: true,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'subjects'),
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

SubjectsList.propTypes = {
  subjects: array,
  isLoading: bool.isRequired,
  history: object.isRequired,
  handleDeleteSubject: func.isRequired,
};

export default SubjectsList;
