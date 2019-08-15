import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { array, bool, object, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import { handleExportCsv } from '../../services/constants';

class PostgraduatesList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }
  transformData = postgraduates => {
    console.log(postgraduates);
    if (postgraduates)
      return postgraduates.map(postgraduate => {
        return {
          id: postgraduate.id,
          postgraduateName: postgraduate.postgraduate_name,
          numCu: postgraduate.num_cu,
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
    const { postgraduates, isLoading, history, handleDeletePostgraduate } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/postgrados/create`)}
          >
            <Add />
            Agregar postgrado
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: 'id', hidden: true },
              { title: 'Nombre', field: 'postgraduateName' },
              { title: '# Unidades de credito', field: 'numCu' },
            ]}
            data={this.transformData(postgraduates)}
            title="postgrados"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Ver detalles',
                onClick: (event, rowData) => {
                  history.push(`/postgrados/edit/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Borrar postgrado',
                onClick: (event, rowData) => {
                  this.handleDialogShow('eliminar', entity =>
                    handleDeletePostgraduate(rowData.id),
                  );
                },
              },
            ]}
            options={{
              pageSize: 10,
              search: true,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'postgraduates'),
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

PostgraduatesList.propTypes = {
  postgraduates: array,
  isLoading: bool.isRequired,
  history: object.isRequired,
  handleDeletePostgraduate: func.isRequired,
};

export default PostgraduatesList;
