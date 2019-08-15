import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { array, bool, object, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import { handleExportCsv } from '../../services/constants';

class AdminsList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }
  transformData = admins => {
    console.log(admins);
    if (admins)
      return admins.map(admin => {
        return {
          id: admin.id,
          email: admin.email,
          firstName: admin.first_name,
          firstSurname: admin.first_surname,
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
    const { admins, isLoading, history, handleDeleteAdmin } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/admins/create`)}
          >
            <Add />
            Agregar Administrador
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: 'id', hidden: true },
              { title: 'Nombre', field: 'firstName' },
              { title: 'Apellido', field: 'firstSurname' },
              { title: 'Email', field: 'email' },
            ]}
            data={this.transformData(admins)}
            title="Administradores"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See detail',
                onClick: (event, rowData) => {
                  history.push(`/admins/edit/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Delete admin',
                onClick: (event, rowData) => {
                  this.handleDialogShow('eliminar', entity =>
                    handleDeleteAdmin(rowData.id),
                  );
                },
              },
            ]}
            options={{
              pageSize: 10,
              search: false,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'admins'),
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

AdminsList.propTypes = {
  admins: array,
  isLoading: bool.isRequired,
  history: object.isRequired,
  handleDeleteAdmin: func.isRequired,
};

export default AdminsList;
