import React, { Component } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import handleExportCsv from '../../utils/handleExportCsv';
import { getSessionUserId } from '../../storage/sessionStorage';

class AdminsList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  transformData = (admins) => {
    const id = getSessionUserId();
    if (admins)
      return admins
        .map((admin) => {
          return {
            id: admin.id,
            email: admin.email,
            firstName: admin.first_name,
            firstSurname: admin.first_surname,
            rol: admin.administrator ? admin.administrator.rol : false,
          };
        })
        .filter((admin) => parseInt(id, 10) !== parseInt(admin.id, 10));
    return [];
  };

  handleDialogShow = (action, func) => {
    const { show } = this.props;
    this.setState({ func }, () => {
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
            onClick={() => history.push(`/administradores/create`)}
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
              { title: 'Rol', field: 'rol' },
            ]}
            data={this.transformData(admins)}
            title="Administradores"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Ver detalles',
                onClick: (event, rowData) => {
                  history.push(`/administradores/edit/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Borrar admin',
                onClick: (event, rowData) => {
                  this.handleDialogShow('eliminar', () => handleDeleteAdmin(rowData.id));
                },
              },
            ]}
            options={{
              pageSize: 10,
              search: true,
              exportButton: true,
              exportCsv: (columns, renderData) => handleExportCsv(columns, renderData, 'admins'),
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

AdminsList.propTypes = {
  admins: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  isLoading: PropTypes.bool.isRequired,

  show: PropTypes.func.isRequired,
  handleDeleteAdmin: PropTypes.func.isRequired,
};

export default AdminsList;
