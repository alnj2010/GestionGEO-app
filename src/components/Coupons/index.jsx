import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { bool, object, array, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import { handleExportCsv } from '../../services/constants';

class CouponsList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  transformData = coupons => {
    let transformedData = [];
    const today = new Date();
    if (coupons && coupons.length > 0) {
      coupons.forEach(coupon => {
        transformedData.push({
          id: coupon.id,
          name: coupon.title,
          category: coupon.category.id,
          brand: coupon.brand.id,
          status: today <= new Date(coupon.end) ? 'Active' : 'Inactive',
          value: coupon.value,
        });
      });
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

  lookupCategory = coupons => {
    let lookup = {};
    let categories = [];
    coupons.forEach(coupon => {
      categories.push(coupon.category);
    });
    categories = [...new Set(categories)];
    categories.forEach(category => {
      lookup[category.id] = category.name;
    });
    return lookup;
  };

  lookupBrand = coupons => {
    let lookup = {};
    let brands = [];
    coupons.forEach(coupon => {
      brands.push(coupon.brand);
    });
    brands = [...new Set(brands)];
    brands.forEach(brand => {
      lookup[brand.id] = brand.name;
    });
    return lookup;
  };

  lookupStatus = coupons => {
    let lookup = {};
    let status = [];
    coupons.forEach(coupon => {
      status.push(coupon.status);
    });
    status = [...new Set(status)];
    status.forEach(stat => {
      lookup[stat] = stat;
    });
    return lookup;
  };

  render = () => {
    const { isLoading, history, coupons, handleDeleteCoupon } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/coupons/create`)}
          >
            <Add />
            Add Coupon
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
                title: 'Category',
                field: 'category',
                searchable: false,
                lookup: this.lookupCategory(coupons),
              },
              {
                title: 'Brand',
                field: 'brand',
                searchable: false,
                lookup: this.lookupBrand(coupons),
              },
              {
                title: 'Status',
                field: 'status',
                searchable: false,
                lookup: this.lookupStatus(this.transformData(coupons)),
              },
              {
                title: 'Value',
                field: 'value',
                searchable: false,
                filtering: false,
              },
            ]}
            data={this.transformData(coupons)}
            title="Coupons List"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See detail',
                onClick: (event, rowData) => {
                  history.push(`/coupons/edit/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Delete Coupon',
                onClick: (event, rowData) => {
                  this.handleDialogShow('delete', entity =>
                    handleDeleteCoupon(rowData.id),
                  );
                },
              },
            ]}
            options={{
              pageSize: 10,
              exportButton: true,
              filtering: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'coupons'),
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

CouponsList.propTypes = {
  isLoading: bool.isRequired,
  history: object.isRequired,
  coupons: array,
  handleDeleteCoupon: func.isRequired,
};

export default CouponsList;
