import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import Download from '@material-ui/icons/Archive';
import Visibility from '@material-ui/icons/Visibility';
import Dialog from '../Dialog';
import { CONSTANCES, USER_INSTANCE } from '../../services/constants';
import handleExportCsv from '../../utils/handleExportCsv';
import HelpButton from '../HelpButton';

class TeachersList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  transformData = (teachers) => {
    if (teachers)
      return teachers.map((teacher) => {
        return {
          id: teacher.id,
          email: teacher.email,
          identification: teacher.identification,
          firstName: teacher.first_name,
          firstSurname: teacher.first_surname,
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
    const { teachers, isLoading, history, handleDeleteTeacher, getConstance } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/usuarios/profesores/agregar`)}
          >
            <Add />
            Agregar profesor
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: 'id', hidden: true },
              { title: 'Nombre', field: 'firstName' },
              { title: 'Apellido', field: 'firstSurname' },
              { title: 'Cedula', field: 'identification' },
              { title: 'Email', field: 'email' },
            ]}
            data={this.transformData(teachers)}
            title={
              <>
                Profesores{' '}
                <HelpButton>
                  <div>
                    <b>Profesores</b>
                  </div>
                  <div>
                    Los profesores tienen como rol administrar y calificar los estudiantes
                    pertenecientes a los cursos que imparten.
                  </div>
                  <br />
                  <div>
                    Abajo se listan los distintos Profesores existenten en el Postgrado de
                    Geoquímica
                  </div>
                </HelpButton>
              </>
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
                              getConstance(data.id, USER_INSTANCE.T, event.target.value)
                            }
                          >
                            {CONSTANCES.T.map(({ name, constanceType }) => (
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
                  history.push(`/usuarios/profesores/modificar/${rowData.id}`);
                },
              },
              {
                id: 'constances',
                icon: Download,
                onClick: () => null,
              },
              {
                id: 'delete',
                icon: 'delete',
                tooltip: 'Borrar profesor',
                onClick: (event, rowData) => {
                  this.handleDialogShow('eliminar', () => handleDeleteTeacher(rowData.id));
                },
              },
            ]}
            options={{
              pageSize: 10,
              search: true,
              exportButton: true,
              exportCsv: (columns, renderData) => handleExportCsv(columns, renderData, 'teachers'),
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

TeachersList.propTypes = {
  teachers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      email: PropTypes.string,
      identification: PropTypes.string,
      first_name: PropTypes.string,
      first_surname: PropTypes.string,
    })
  ).isRequired,

  isLoading: PropTypes.bool.isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getConstance: PropTypes.func.isRequired,
  handleDeleteTeacher: PropTypes.func.isRequired,

  show: PropTypes.func.isRequired,
};

export default TeachersList;
