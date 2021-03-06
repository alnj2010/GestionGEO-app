import React, { Component } from 'react';
import MaterialTable from 'material-table';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import handleExportCsv from '../../utils/handleExportCsv';

class SubjectsList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  transformData = (subjects) => {
    if (subjects)
      return subjects.map((subject) => {
        return {
          id: subject.id,
          subjectCode: subject.code,
          subjectName: subject.name,
          uc: subject.uc,
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
    const { subjects, isLoading, history, handleDeleteSubject, width } = this.props;
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
            onClick={() => history.push(`/materias/agregar`)}
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
              { title: 'Unidades de Credito', field: 'uc' },
            ]}
            data={this.transformData(subjects)}
            title={matches ? 'Materias' : ''}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Ver detalles',
                onClick: (event, rowData) => {
                  history.push(`/materias/modificar/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Borrar materia',
                onClick: (event, rowData) => {
                  this.handleDialogShow('eliminar', () => handleDeleteSubject(rowData.id));
                },
              },
            ]}
            options={{
              pageSize: 10,
              search: true,
              exportButton: true,
              exportCsv: (columns, renderData) => handleExportCsv(columns, renderData, 'subjects'),
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

SubjectsList.propTypes = {
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      subject_code: PropTypes.string,
      subject_name: PropTypes.string,
      subject_type: PropTypes.string,
      uc: PropTypes.number,
    })
  ).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  width: PropTypes.string.isRequired,

  isLoading: PropTypes.bool.isRequired,

  show: PropTypes.func.isRequired,
  handleDeleteSubject: PropTypes.func.isRequired,
};

export default withWidth()(SubjectsList);
