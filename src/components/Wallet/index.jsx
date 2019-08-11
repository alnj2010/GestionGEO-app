import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { bool, array, func } from 'prop-types';
import { Grid, Chip, Collapse } from '@material-ui/core';
import { handleExportCsv } from '../../services/constants';

class linksList extends Component {
  componentDidMount = () => {
    this.setState({ showChip: true });
  };

  constructor() {
    super();

    this.state = {
      showChip: false,
    };
  }
  render = () => {
    const {
      isLoading,
      packages,
      handleUpdate,
      handleDelete,
      handleAdd,
    } = this.props;
    const { showChip } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Collapse in={showChip} timeout={500}>
            <Chip
              label="Remember to have the SKU (Android) and IAC (iOS) number before creating a package"
              color="primary"
            />
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              {
                title: '#',
                field: 'id',
                editable: 'never',
              },
              {
                title: 'Price',
                field: 'price',
                type: 'numeric',
              },
              {
                title: 'Amount of coins',
                field: 'coin',
                type: 'numeric',
              },
              {
                title: 'Amount of doubloons',
                field: 'doubloon',
                type: 'numeric',
              },
              {
                title: 'SKU Google',
                field: 'skuGoogle',
                type: 'string',
              },
              {
                title: 'SKU iOS',
                field: 'skuIos',
                type: 'string',
              },
              {
                title: 'Total Coins',
                field: 'totalCoin',
                type: 'numeric',
                editable: 'never',
              },
              {
                title: 'Total Doubloons',
                field: 'totalDoubloon',
                type: 'numeric',
                editable: 'never',
              },
              {
                title: 'Status',
                field: 'status',
                lookup: { true: 'Active', false: 'Inactive' },
              },
            ]}
            data={packages}
            title="Packages List"
            options={{
              filtering: false,
              search: false,
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
                  handleUpdate({ ...newData, id: oldData.id });
                  resolve();
                }),
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  handleDelete(oldData.id);
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
  packages: array,
  handleDelete: func.isRequired,
  handleAdd: func.isRequired,
  handleUpdate: func.isRequired,
};

export default linksList;
