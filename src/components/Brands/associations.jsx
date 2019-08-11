import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { bool, array, func } from 'prop-types';
import { Grid } from '@material-ui/core';
import { handleExportCsv } from '../../services/constants';

class AssociationsList extends Component {
  transformData = brandsCategories => {
    let transformedData = [];
    if (brandsCategories) {
      for (let brandCategory of brandsCategories) {
        transformedData = [
          ...transformedData,
          {
            brand: brandCategory.brand.id,
            category: brandCategory.category ? brandCategory.category.id : '',
            position: brandCategory.position ? brandCategory.position : null,
          },
        ];
      }
      return transformedData;
    }
    return [];
  };

  lookupCategory = data => {
    let lookup = {};
    for (let category of data) {
      lookup[category.id] = category.name;
    }
    return lookup;
  };

  lookupBrand = data => {
    let lookup = {};
    for (let brand of data) {
      lookup[brand.id] = brand.name;
    }
    return lookup;
  };
  render = () => {
    const {
      isLoading,
      brandsCategories,
      brands,
      categories,
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
                title: 'Title',
                field: 'brand',
                filtering: false,
                editable: 'onAdd',
                lookup: this.lookupBrand(brands),
              },
              {
                title: 'Category Associated',
                field: 'category',
                filtering: true,
                editable: 'onAdd',
                lookup: this.lookupCategory(categories),
              },
              {
                title: 'Position',
                field: 'position',
                searchable: false,
                filtering: false,
              },
            ]}
            data={this.transformData(brandsCategories)}
            title="Brands Associations List"
            options={{
              filtering: true,
              pageSize: 10,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'associations'),
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
                    category: oldData.category,
                    brand: oldData.brand,
                    position: newData.position,
                  });
                  resolve();
                }),
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  handleDelete(oldData.category, oldData.brand);
                  resolve();
                }),
            }}
          />
        </Grid>
      </Grid>
    );
  };
}

AssociationsList.propTypes = {
  isLoading: bool.isRequired,
  brands: array,
  brandsCategories: array,
  categories: array,
  handleDelete: func.isRequired,
  handleAdd: func.isRequired,
  handleUpdate: func.isRequired,
};

export default AssociationsList;
