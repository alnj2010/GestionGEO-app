import React, { Component } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import DeleteIcon from '@material-ui/icons/Delete';
import Download from '@material-ui/icons/Archive';
import Visibility from '@material-ui/icons/Visibility';
import Dialog from '../Dialog';
import { reverseJson } from '../../helpers/index';
import { CONSTANCES, USER_INSTANCE, COORDINATOR_ROL } from '../../services/constants';
import handleExportCsv from '../../utils/handleExportCsv';
import { getSessionUserId } from '../../storage/sessionStorage';
import HelpButton from '../HelpButton';

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
            rol: admin.administrator
              ? reverseJson(COORDINATOR_ROL)[admin.administrator.rol]
              : false,
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
    const { admins, isLoading, history, handleDeleteAdmin, getConstance, width } = this.props;
    const matches = isWidthUp('sm', width);
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/usuarios/administradores/agregar`)}
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
            title={
              matches ? (
                <>
                  Administradores{' '}
                  <HelpButton>
                    <div>
                      <b>Administrador</b>
                    </div>
                    <div>
                      El administrador de la plataforma es responsable de gestionar y conservar los
                      datos de gestionGeo, por lo que podra incorporar, modificar y dar de baja a
                      cada una de las entidades existentes en la plataforma
                    </div>
                    <br />
                    <div>
                      Abajo se listan los distintos administradores existenten en el Postgrado de
                      Geoquímica
                    </div>
                  </HelpButton>
                </>
              ) : (
                ''
              )
            }
            components={{
              Action: (props) => {
                const {
                  action: { id, onClick },
                  data,
                } = props;
                switch (id) {
                  case 'visibility':
                    return (
                      <Visibility
                        style={{ cursor: 'pointer', marginLeft: '30px' }}
                        onClick={(event) => onClick(event, data)}
                      />
                    );
                  case 'constances':
                    return (
                      <div>
                        <FormControl>
                          <InputLabel
                            htmlFor={`select-contance-${data.id}-label`}
                            style={{ top: 0, transform: 'none' }}
                          >
                            <Download />
                          </InputLabel>
                          <Select
                            label={`select-contance-${data.id}-label`}
                            id={`select-contance-${data.id}`}
                            input={<InputBase />}
                            value=""
                            onChange={(event) =>
                              getConstance(data.id, USER_INSTANCE.A, event.target.value)
                            }
                          >
                            {CONSTANCES.A.filter(({constanceType})=>constanceType!=='AnnualReport'
                            ).map(({ name, constanceType }) => (
                              <MenuItem key={constanceType} value={constanceType}>
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    );
                  case 'delete':
                    return (
                      <DeleteIcon
                        style={{ cursor: 'pointer' }}
                        onClick={(event) => onClick(event, data)}
                      />
                    );
                  default:
                    return 'x';
                }
              },
            }}
            actions={[
              {
                id: 'visibility',
                icon: 'visibility',
                tooltip: 'Ver detalles',
                onClick: (event, rowData) => {
                  history.push(`/usuarios/administradores/modificar/${rowData.id}`);
                },
              },
              {
                id: 'constances',
                icon: Download,
                onClick: () => null,
              },
              {
                icon: 'delete',
                id: 'delete',
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

AdminsList.propTypes = {
  admins: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  width: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getConstance: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  handleDeleteAdmin: PropTypes.func.isRequired,
};

export default withWidth()(AdminsList);
