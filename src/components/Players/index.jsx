import React, { Component } from 'react';
import MaterialTable from 'material-table';

import { array, bool, object, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import { handleExportCsv } from '../../services/constants';

class PLayersList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  transformData = users => {
    if (users)
      return users.map(user => {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          lastName: user.last,
          account: 'Regular',
          points: user.profile.points ? user.profile.points : 0,
          registration: new Date(user.created).toLocaleDateString(),
          phone: user.profile.phone,
        };
      });
    return [];
  };
  handleDialogShow = (action, func) => {
    const { show } = this.props;
    this.setState({ func: func }, () => {
      show(action);
    });
  };

  render = () => {
    const { users, isLoading, history, handleDeletePlayer } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/users/create`)}
          >
            <Add />
            Add User
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
              { title: 'Name', field: 'name', filtering: false },
              { title: 'Last Name', field: 'lastName', filtering: false },
              { title: 'Email', field: 'email', filtering: false },
              {
                title: 'Account',
                field: 'account',
                searchable: false,
                lookup: { Regular: 'Regular', seasonPass: 'Season Pass' },
              },
              {
                title: 'Total Holding',
                field: 'points',
                searchable: false,
                filtering: false,
              },
              {
                title: 'Registration',
                field: 'registration',
                searchable: false,
                filtering: false,
              },
              {
                title: 'Phone Number',
                field: 'phone',
                searchable: false,
                filtering: false,
              },
            ]}
            data={this.transformData(users)}
            title="Users List"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See detail',
                onClick: (event, rowData) => {
                  history.push(`/users/edit/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Delete user',
                onClick: (event, rowData) => {
                  this.handleDialogShow('delete', entity =>
                    handleDeletePlayer(rowData.id),
                  );
                },
              },
            ]}
            options={{
              filtering: true,
              pageSize: 10,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'users'),
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

PLayersList.propTypes = {
  users: array,
  isLoading: bool.isRequired,
  history: object.isRequired,
  handleDeletePlayer: func.isRequired,
};

export default PLayersList;
