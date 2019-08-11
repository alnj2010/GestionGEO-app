import React from 'react'
import {
    Grid,
  } from '@material-ui/core';
  import { DateFormatInput } from 'material-ui-next-pickers';
  import MaterialTable from 'material-table';
  import { withStyles } from '@material-ui/core/styles';

  const styles = theme => ({
      title:{
        paddingTop: 6
      },
      tableContainer:{
          paddingTop:30,
          maxWidth:1200,
          margin:'0 auto'
      },
      date: { boxSizing: 'content-box' },
  });

class RedeemCouponDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            initial:null,
            final:null
        }
   
      }

      transformData = coupons => {
        let { initial, final} = this.state;

        if (coupons && coupons.length > 0) {
            let records = coupons.map( element => ({
                id:element.coupon.id,
                coupon:element.coupon.title,
                brand:element.coupon.brand.name,
                ticketAmount:element.ticketAmount ? element.ticketAmount : 0,
                discountAmount:element.discountAmount ? element.discountAmount : 0,
                date:element.redeemedAt,
                status:element.status ? 'REPORTED' : 'APPROVED',
            }))
            
            if(initial){
                initial=new Date(initial);
                records = records.filter( record => (new Date(record.date)) >= initial)
            }

            if(final){
                final=new Date(final);
                records = records.filter( record => (new Date(record.date)) <= final )
            }
            
            return records;
          
        }
        return [];
      };

      lookupBrand = coupons => {
            let brands = coupons.map(item => item.coupon.brand );
            let lookup={};          
            brands = [...new Set(brands)];
            brands.forEach(brand => {
            lookup[brand.name] = brand.name;
            });
            return lookup;
        };

        lookupCoupon = coupons => {
            let couponList = coupons.map(item => item.coupon );
              let lookup={};          
              couponList = [...new Set(couponList)];
              couponList.forEach(coupon => {
                lookup[coupon.title] = coupon.title;
              });
              return lookup;
          };

          onChangeDate = (date, calendar) => {
            if (calendar === 'initial') this.setState({ initial: date });
            else this.setState({ final: date });
          };

      render(){
          const {classes,name,lastname, coupons,isLoading} =this.props;
          const {initial,final}=this.state;
          
          let count= coupons.length;
          let totalTicketAmount = coupons.reduce((ant, act)=>{ return ant + act.ticketAmount; },0);
          let totalDiscountAmount = coupons.reduce((ant, act)=>{ return ant + act.discountAmount; },0);
          
          var lastDateRedeem = ''
          if(count > 0){
              lastDateRedeem = new Date(coupons[0].redeemedAt);
              coupons.forEach( item => {
                let aux = new Date(item.redeemedAt);
                  if(lastDateRedeem <= aux) lastDateRedeem = aux;
              })
              lastDateRedeem=lastDateRedeem.toString();
          }
          

          return (
            <React.Fragment>
                <h3> Redeem Coupon - User Detail</h3>
                <hr />
                <Grid container direction="column">
                    <Grid item container justify="flex-start" >
                        <Grid item xs={1}><h4>Name:</h4></Grid>
                        <Grid item xs={1} className={classes.title}><p>{name}</p></Grid>                        
                    </Grid>
                    <Grid item container justify="flex-start" >
                        <Grid item xs={1}><h4>Last Name:</h4></Grid>
                        <Grid item xs={1} className={classes.title}><p>{lastname}</p></Grid>                        
                    </Grid>
                    <Grid item container justify="flex-start" >
                        <Grid item xs={2}><h4>Redeemed Coupons (Count):</h4></Grid>
                        <Grid item xs={1} className={classes.title}><p>{count}</p></Grid>                        
                    </Grid>

                    <Grid item container justify="flex-start" >
                        <Grid item xs={2}><h4>Total ticket amount:</h4></Grid>
                        <Grid item xs={1} className={classes.title}><p>{totalTicketAmount}</p></Grid>                        
                    </Grid>
                    <Grid item container justify="flex-start" >
                        <Grid item xs={2}><h4>Total discount amount:</h4></Grid>
                        <Grid item xs={1} className={classes.title}><p>{totalDiscountAmount}</p></Grid>                        
                    </Grid>
                    <Grid item container justify="flex-start" >
                        <Grid item xs={2}><h4>Last date redeem:</h4></Grid>
                        <Grid item xs={4} className={classes.title}><p>{lastDateRedeem}</p></Grid>                       
                    </Grid>                    
                </Grid>
                
                <Grid container className={classes.tableContainer} spacing={8} >
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
                            { title: 'Id', field: 'id', filtering: false },
                            { title: 'Coupon', field: 'coupon', lookup: this.lookupCoupon(coupons) },
                            { title: 'Brand', field: 'brand', lookup: this.lookupBrand(coupons) },
                            { title: 'Ticket Amount', field: 'ticketAmount', filtering: false },
                            { title: 'Discount Amount', field: 'discountAmount', filtering: false },
                            { title: 'Date', field: 'date', filtering: false },
                            { title: 'Status', field: 'status', filtering: false },

                            ]}

                            data={this.transformData( coupons )}
                            title="User redeemed coupons"
                            options={{
                                pageSize: 10,
                                filtering: true,
                                search:false
                            }}
                            onChangePage={()=>{window.scroll(0,0)}}
                            isLoading={isLoading}                            
                        />
                    </Grid>

                </Grid>

            </React.Fragment> 
            )
      }

}
export default withStyles(styles)(RedeemCouponDetail);