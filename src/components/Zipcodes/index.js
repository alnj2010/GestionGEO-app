import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { bool, object, array, func } from 'prop-types';
import { connect } from 'react-redux';
import Add from '@material-ui/icons/Add';
import { Fab, Grid} from '@material-ui/core';
import Dialog from '../Dialog';

import {
    Form,
    reduxForm,
    formValueSelector
  } from 'redux-form';
import RenderFields from '../RenderFields'
class ZipcodesList extends Component {
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

  lookupLocation = zipcodes => {
    let cities = zipcodes.map(item => ({name:item.location }) );    
    let lookup={};          
    cities = [...new Set(cities)];
    cities.forEach(city => {
      lookup[city.name] = city.name;
    });
    return lookup;
  };

  transformData = zipcodes => {
    let transformedData = [];
    if (zipcodes && zipcodes.length > 0) {
      zipcodes.forEach(zipcode => {
        transformedData.push({
          id: zipcode.id,
          code: zipcode.code,
          location: zipcode.location.title,
          longitude: zipcode.longitude,
          latitude: zipcode.latitude,
          city: zipcode.city,
          state: zipcode.state,
          
        });
      });
      transformedData = transformedData.filter( item => this.props.long === '' ||  (new RegExp(this.props.long)).test(item.longitude) )
      transformedData = transformedData.filter( item => this.props.lat === '' ||  (new RegExp(this.props.lat)).test(item.latitude) )
      transformedData = transformedData.filter( item => this.props.city === '' ||  (new RegExp(this.props.city)).test(item.city) )
      transformedData = transformedData.filter( item => this.props.state === '' ||  (new RegExp(this.props.state)).test(item.state) )
      transformedData = transformedData.filter( item => this.props.code === '' ||  (new RegExp(this.props.code)).test(item.code) )
      return transformedData;
    }
    return [];
  };


  render = () => {
    const { isLoading, 
        history, 
        zipcodes, 
        handleDeleteZipcode,
        handleSubmit,
} = this.props;
    const { func } = this.state;

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container spacing={8}>
                
                <Grid item xs={12}>
                    <Fab
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="Add"
                        onClick={() => history.push(`/zipcodes/create`)}
                    >
                        <Add />
                        Add Zipcode
                    </Fab>
                </Grid>
                <Grid item xs={2}>
                <RenderFields classes={{}}>{[
                      { label: 'Latitude', field: 'lat', id: 'lat', type: 'text', title:false},
                      { label: 'Longitude', field: 'long', id: 'long', type: 'text', title:false},
                      { label: 'City', field: 'city', id: 'city', type: 'text', title:false},
                      { label: 'State', field: 'state', id: 'state', type: 'text', title:false},
                      { label: 'Zip Code', field: 'code', id: 'code', type: 'text', title:false},
                ]}</RenderFields>
                                
                </Grid> 
                <Grid item xs={10}>
                <MaterialTable
                    columns={[
                    {
                        title: '#',
                        field: 'id',
                        searchable: true,
                        filtering: false,
                    },
                    {
                        title: 'Zip Code',
                        field: 'code',
                        searchable: true,
                        filtering: false,
                    },
                    {
                        title: 'Location',
                        field: 'location',
                        searchable: true,
                        lookup: this.lookupLocation(this.transformData(zipcodes))
                    },
                    ]}
                    data={this.transformData(zipcodes)}
                    title="Zipcode List"
                    actions={[
                    {
                        icon: 'visibility',
                        tooltip: 'See detail',
                        onClick: (event, rowData) => {
                            history.push(`/zipcodes/edit/${rowData.id}`);
                        },
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Zipcode',
                        onClick: (event, rowData) => {
                            this.handleDialogShow('delete', entity =>
                                handleDeleteZipcode(rowData.id),
                            );
                        },
                    },
                    ]}
                    options={{
                    filtering: true,
                    pageSize: 10,
                    }}
                    onChangePage={()=>{window.scroll(0,0)}}
                    isLoading={isLoading}
                />
                </Grid>
                <Dialog handleAgree={func} />
            </Grid> 
        </Form> 

        );
    };
}


ZipcodesList.propTypes = {
    isLoading: bool.isRequired,
    history: object.isRequired,
    zipcodes:array,
    handleDeleteZipcode: func.isRequired,

};

ZipcodesList = reduxForm({
    form: 'filterZipcode',
})(ZipcodesList);

const selector = formValueSelector('filterZipcode')

ZipcodesList = connect(
    state => ({        
        lat:selector(state, 'lat'),
        long:selector(state, 'long'),
        city:selector(state, 'city'),
        state:selector(state, 'state'),
        code:selector(state, 'code'),
    }),
  )(ZipcodesList);

export default ZipcodesList;