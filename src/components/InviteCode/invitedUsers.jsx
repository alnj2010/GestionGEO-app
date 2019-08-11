import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { array } from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';
import { DateFormatInput } from 'material-ui-next-pickers';
import { handleExportCsv } from '../../services/constants';

const styles = theme => ({
  date: { boxSizing: 'content-box' },
});

class InvitedUsers extends Component {
  constructor() {
    super();
    this.state = {
      initialDate: null,
      lastDate: null,
    };
  }

  transformData = invitations => {
    let { initialDate, lastDate } = this.state;
    let transformedData = [];
    if (invitations) {
      for (let invitation of invitations) {
        if (initialDate && lastDate) {
          if (
            new Date(invitation.created) >= initialDate &&
            new Date(invitation.created) <= lastDate
          )
            transformedData = [
              ...transformedData,
              {
                id: invitation.id,
                name: invitation.name,
                lastName: invitation.last,
                date: invitation.created,
              },
            ];
        } else if (initialDate) {
          if (new Date(invitation.created) >= initialDate)
            transformedData = [
              ...transformedData,
              {
                id: invitation.id,
                name: invitation.name,
                lastName: invitation.last,
                date: invitation.created,
              },
            ];
        } else if (lastDate) {
          if (new Date(invitation.created) <= lastDate)
            transformedData = [
              ...transformedData,
              {
                id: invitation.id,
                name: invitation.name,
                lastName: invitation.last,
                date: invitation.created,
              },
            ];
        } else {
          transformedData = [
            ...transformedData,
            {
              id: invitation.id,
              name: invitation.name,
              lastName: invitation.last,
              date: invitation.created,
            },
          ];
        }
      }
      return transformedData;
    }
    return [];
  };

  onChangeDate = (date, whichDate) => {
    if (whichDate === 'initial') this.setState({ initialDate: new Date(date) });
    else this.setState({ lastDate: new Date(date) });
  };

  render = () => {
    const { invitations, classes } = this.props;
    const { lastDate, initialDate } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={5}>
          <DateFormatInput
            id="initial-date"
            name="date-input"
            label="Initial date"
            value={initialDate}
            fullWidth={true}
            onChange={date => this.onChangeDate(date, 'initial')}
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
            value={lastDate}
            onChange={this.onChangeDate}
            className={classes.date}
          />
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              {
                title: '#',
                field: 'id',
              },
              {
                title: 'Name',
                field: 'name',
              },
              {
                title: 'Last Name',
                field: 'lastName',
              },
              {
                title: 'Date',
                field: 'date',
              },
            ]}
            onChangePage={()=>{window.scroll(0,0)}}
            data={this.transformData(invitations)}
            title="Referred Users"
            options={{
              search: false,
              pageSize: 5,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'referredUsers'),
            }}
          />
        </Grid>
      </Grid>
    );
  };
}

InvitedUsers.propTypes = {
  invitations: array,
};

export default withStyles(styles)(InvitedUsers);
