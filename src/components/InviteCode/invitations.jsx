import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { array, bool } from 'prop-types';
import { Grid } from '@material-ui/core';
import { handleExportCsv } from '../../services/constants';

class Invitations extends Component {
  render = () => {
    const { invitations, isLoading, history } = this.props;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: 'id', hidden: true },
              { title: 'Name', field: 'name' },
              { title: 'Last Name', field: 'lastName' },
              { title: 'Invite Code', field: 'code' },
              { title: 'Number of Referals', field: 'referrals' },
              { title: ' Datetime Last Update', field: 'date' },
            ]}
            data={invitations}
            title="Invitations"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See detail',
                onClick: (event, rowData) => {
                  history.push(`/invitecode/invitations/detail/${rowData.id}`);
                },
              },
            ]}
            options={{
              pageSize: 10,
              search: false,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'invitations'),
            }}
            onChangePage={()=>{window.scroll(0,0)}}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    );
  };
}

Invitations.propTypes = {
  invitations: array,
  isLoading: bool.isRequired,
};

export default Invitations;
