import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { array } from 'prop-types';
import { Grid } from '@material-ui/core';
import { handleExportCsv } from '../../services/constants';

class BrandsList extends Component {
  transformData = categoryBrands => {
    let transformedData = [];
    if (categoryBrands) {
      for (let brandCat of categoryBrands) {
        transformedData = [
          ...transformedData,
          {
            name: brandCat.brand.name,
            position: brandCat.position,
          },
        ];
      }
      return transformedData;
    }
    return [];
  };

  render = () => {
    const { categoryBrands } = this.props;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              {
                title: 'Brand Associated',
                field: 'name',
                filtering: false,
                searchable: true,
              },
              {
                title: 'Position',
                field: 'position',
                searchable: false,
                filtering: false,
              },
            ]}
            onChangePage={()=>{window.scroll(0,0)}}
            data={this.transformData(categoryBrands)}
            title="Categories Associations List"
            options={{
              pageSize: 5,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'associations'),
            }}
          />
        </Grid>
      </Grid>
    );
  };
}

BrandsList.propTypes = {
  brands: array,
};

export default BrandsList;
