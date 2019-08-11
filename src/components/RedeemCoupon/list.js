import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { DateFormatInput } from 'material-ui-next-pickers';
import { Grid, withStyles  } from '@material-ui/core';

const styles = theme => ({
    date: { boxSizing: 'content-box' },
  });

class RedeemCouponList extends Component{
    constructor() {
        super();
        this.state = {
          func: null,
          initial: null,
          final: null,
        };
        this.transformData=this.transformData.bind(this);
      }
    
      transformData = coupons => {
        let { initial, final} = this.state;

        if (coupons && coupons.length > 0) {
            let records = coupons.map( element => ({
                id: element.user.id,
                user: element.user.name + ' ' +  element.user.last,
                name: element.user.name,
                lastname: element.user.last,
                email: element.user.email,
                brand: element.coupon.brand.name,
                coupon: element.coupon.title,
                dateused: element.used,
                status: element.status ? 'REPORTED' : 'APPROVED',
            }))
            
            if(initial){
                initial=new Date(initial);
                records = records.filter( record => (new Date(record.dateused)) >= initial)
            }

            if(final){
                final=new Date(final);
                records = records.filter( record => (new Date(record.dateused)) <= final )
            }
            
            return records;
          
        }
        return [];
      };
    
      lookupCoupon = coupons => {
        let couponList = coupons.map(item => ({...item.coupon, id:item.user.id }) );
          let lookup={};          
          couponList = [...new Set(couponList)];
          couponList.forEach(coupon => {
            lookup[coupon.title] = coupon.title;
          });
          return lookup;
      };
    
      lookupBrand = coupons => {
          let brands = coupons.map(item => ({...item.coupon.brand, id:item.user.id }) );
          let lookup={};          
          brands = [...new Set(brands)];
          brands.forEach(brand => {
            lookup[brand.name] = brand.name;
          });
          return lookup;
      };
    
      lookupStatus = coupons => {
        let statusReporteds = coupons.map(item => ({status:item.status ? 'REPORTED' : 'APPROVED', id:item.user.id }) );
        let lookup={};          
        statusReporteds = [...new Set(statusReporteds)];
        statusReporteds.forEach(status => {
          lookup[status.status] = status.status;
        });
        return lookup;
      };
      onChangeDate = (date, calendar) => {
        if (calendar === 'initial') this.setState({ initial: date });
        else this.setState({ final: date });
      };
    
      render = () => {
        const { isLoading, history, coupons, classes } = this.props;
        const { initial, final } = this.state;
        return (
          <Grid container spacing={8}>
            <Grid item xs={5}>
                <DateFormatInput
                id="initial-date"
                name="date-input"
                label="Initial date"
                fullWidth={true}
                onChange={date => this.onChangeDate(date, 'initial')}
                value={initial}
                className={classes.date}
                />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5}>
                <DateFormatInput
                id="last-date"
                name="date-input"
                label="Last date"
                fullWidth={true}
                onChange={this.onChangeDate}
                value={final}
                className={classes.date}
                />
            </Grid>
            <Grid item xs={12}>
              <MaterialTable
                columns={[
                  { title: 'User', field: 'user', searchable: true, filtering: false },
                  { title: 'Email', field: 'email', filtering: false },
                  { title: 'Brand', field: 'brand', searchable: true, lookup: this.lookupBrand(coupons) },
                  { title: 'Coupon', field: 'coupon', searchable: true, lookup: this.lookupCoupon(coupons) },
                  { title: 'Date used', field: 'dateused', searchable: true, filtering: false },
                  { title: 'Status', field: 'status', searchable: true, lookup: this.lookupStatus(coupons) },
                ]}

                data={this.transformData( coupons )}
                title="Redeemed coupons"
                actions={[
                  {
                    icon: 'visibility',
                    tooltip: 'See detail',
                    onClick: (event, rowData) => {
                      history.push(`/redeemcoupon/edit/${rowData.id}/${rowData.name}/${rowData.lastname}`);
                    },
                  },
                ]}
                options={{
                  pageSize: 10,
                  filtering: true,
                }}
                onChangePage={()=>{window.scroll(0,0)}}
                isLoading={isLoading}
              />
            </Grid>

          </Grid>
        );
      };
}


export default withStyles(styles)(RedeemCouponList)