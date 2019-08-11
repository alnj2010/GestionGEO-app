import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { bool, array, func } from 'prop-types';
import { Grid } from '@material-ui/core';
import { handleExportCsv } from '../../services/constants';

class linksList extends Component {
  render = () => {
    const {
      isLoading,
      links,
      handleUpdate,
      handleDelete,
      handleAdd,
    } = this.props;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              {
                title: '#',
                field: 'id',
                editable: 'never',
              },
              {
                title: 'Title',
                field: 'title',
                editable: 'onAdd',
              },
              {
                title: 'Link',
                field: 'url',
              },
            ]}
            data={links}
            title="External Links List"
            options={{
              filtering: false,
              pageSize: 10,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'links'),
            }}
            onChangePage={()=>{window.scroll(0,0)}}
            isLoading={isLoading}
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  handleAdd(newData);
                  resolve();
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  handleUpdate({
                    id: oldData.id,
                    title: newData.title,
                    url: newData.url,
                  });
                  resolve();
                }),
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  handleDelete(oldData.title);
                  resolve();
                }),
            }}
          />
        </Grid>
      </Grid>
    );
  };
}

linksList.propTypes = {
  isLoading: bool.isRequired,
  links: array,
  handleDelete: func.isRequired,
  handleAdd: func.isRequired,
  handleUpdate: func.isRequired,
};

export default linksList;
