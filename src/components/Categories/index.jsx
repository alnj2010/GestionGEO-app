import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { bool, object, array, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import { handleExportCsv } from '../../services/constants';

class CategoriesList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  handleDialogShow = (action, func) => {
    const { show } = this.props;
    this.setState({ func: func }, () => {
      show(action);
    });
  };

  render = () => {
    const { isLoading, history, categories, handleDeleteCategory } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/categories/create`)}
          >
            <Add />
            Add Category
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              {
                title: '#',
                field: 'id',
                searchable: false,
                filtering: false,
              },
              { title: 'Title', field: 'name', filtering: false },
              {
                title: 'Position',
                field: 'position',
                searchable: false,
                filtering: false,
              },
            ]}
            data={categories}
            title="Categories List"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See detail',
                onClick: (event, rowData) => {
                  history.push(`/categories/edit/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Delete category',
                onClick: (event, rowData) => {
                  this.handleDialogShow('delete', entity =>
                    handleDeleteCategory(rowData.id),
                  );
                },
              },
            ]}
            options={{
              filtering: false,
              pageSize: 10,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'categories'),
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

CategoriesList.propTypes = {
  isLoading: bool.isRequired,
  history: object.isRequired,
  categories: array,
  handleDeleteCategory: func.isRequired,
};

export default CategoriesList;
