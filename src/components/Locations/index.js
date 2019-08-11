import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { bool, object, array, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid} from '@material-ui/core';
import Dialog from '../Dialog';
class LocationsList extends Component {
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
    const { isLoading, history, locations, handleDeleteLocation } = this.props;
    const { func } = this.state;

    return ( 
        <Grid container spacing={8}>
            
            <Grid item xs={12}>
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="Add"
                    onClick={() => history.push(`/locations/create`)}
                >
                    <Add />
                    Add Location
                </Fab>
            </Grid> 
            <Grid item xs={12}>
            <MaterialTable
                columns={[
                {
                    title: '#',
                    field: 'id',
                    searchable: true,
                    filtering: false,
                },
                {
                    title: 'Title',
                    field: 'title',
                    searchable: true,
                    filtering: false,
                },
                {
                    title: 'Country',
                    field: 'country',
                    searchable: true,
                    filtering: false,
                }
                ]}
                data={locations}
                title="Location List"
                actions={[
                {
                    icon: 'visibility',
                    tooltip: 'See detail',
                    onClick: (event, rowData) => {
                        history.push(`/locations/edit/${rowData.id}`);
                    },
                },
                {
                    icon: 'delete',
                    tooltip: 'Delete Location',
                    onClick: (event, rowData) => {
                        this.handleDialogShow('delete', entity =>
                            handleDeleteLocation(rowData.id),
                        );
                    },
                },
                ]}
                options={{
                pageSize: 10,
                }}
                onChangePage={()=>{window.scroll(0,0)}}
                isLoading={isLoading}
            />
            </Grid>
            <Dialog handleAgree={func} />
        </Grid> );
    };
}

LocationsList.propTypes = {
    isLoading: bool.isRequired,
    history: object.isRequired,
    locations:array,
    handleDeleteLocation: func.isRequired,

};

export default LocationsList;