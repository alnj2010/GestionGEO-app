import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { bool, object, array, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid, Avatar, withStyles } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Dialog from '../Dialog';
import { handleExportCsv } from '../../services/constants';

const styles = theme => ({
  redAvatar: {
    color: '#fff',
    backgroundColor: red[200],
  },
  purpleAvatar: {
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
});
class BrandsList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  transformData = brands => {
    let transformedData = [];
    if (brands) {
      for (let brand of brands) {
        transformedData = [
          ...transformedData,
          {
            id: brand.id,
            name: brand.name,
            avatar: brand.image,
          },
        ];
      }
      return transformedData;
    }
    return [];
  };

  handleDialogShow = (action, func) => {
    const { show } = this.props;
    this.setState({ func: func }, () => {
      show(action);
    });
  };

  render = () => {
    const {
      isLoading,
      history,
      brands,
      handleDeleteBrand,
      classes,
    } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/brands/create`)}
          >
            <Add />
            Add Brand
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              {
                title: '#',
                field: 'id',
                searchable: false,
              },
              { title: 'Title', field: 'name' },
              {
                title: 'Avatar',
                field: 'avatar',
                searchable: false,
                render: rowData =>
                  rowData.avatar ? (
                    <Avatar alt={rowData.name} src={rowData.avatar} />
                  ) : (
                    <Avatar className={classes.redAvatar}>
                      {rowData.name.length > 1
                        ? rowData.name.substring(0, 2)
                        : rowData.name.charAt(0)}
                    </Avatar>
                  ),
              },
            ]}
            data={this.transformData(brands)}
            title="Brands List"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See detail',
                onClick: (event, rowData) => {
                  history.push(`/brands/edit/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Delete Brand',
                onClick: (event, rowData) => {
                  this.handleDialogShow('delete', entity =>
                    handleDeleteBrand(rowData.id),
                  );
                },
              },
            ]}
            options={{
              pageSize: 10,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'brands'),
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

BrandsList.propTypes = {
  isLoading: bool.isRequired,
  history: object.isRequired,
  brands: array,
  handleDeleteBrand: func.isRequired,
};

export default withStyles(styles)(BrandsList);
