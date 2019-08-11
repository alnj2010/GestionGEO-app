import React, { Component } from 'react';
import MaterialTable from 'material-table';

import { array, bool, object, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid, withStyles } from '@material-ui/core';
import Dialog from '../Dialog';
import { handleExportCsv } from '../../services/constants';

const styles = theme => ({
  image: {
    maxWidth: 100,
  },
});
class PhasesList extends Component {
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
    const {
      phases,
      isLoading,
      history,
      handleDeletePhase,
      classes,
    } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/initial-phase/create`)}
          >
            <Add />
            Add Phase
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              {
                title: '#',
                field: 'id',
              },
              { title: 'Image Title', field: 'title' },
              { title: 'Last Date Update', field: 'updated' },
              { title: 'Position', field: 'position' },
              { title: 'Admin Name', field: 'adminName' },
              {
                title: 'Mini - Caption',
                field: 'avatar',
                render: rowData => (
                  <img
                    src={rowData.androidPicture}
                    alt={rowData.image}
                    className={classes.image}
                  />
                ),
              },
            ]}
            data={phases}
            title="Phases List"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See detail',
                onClick: (event, rowData) => {
                  history.push(`/initial-phase/edit/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Delete phase',
                onClick: (event, rowData) => {
                  this.handleDialogShow('delete', entity =>
                    handleDeletePhase(rowData.id),
                  );
                },
              },
            ]}
            options={{
              pageSize: 10,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'phases'),
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

PhasesList.propTypes = {
  phases: array,
  isLoading: bool.isRequired,
  history: object.isRequired,
  handleDeletePhase: func.isRequired,
};

export default withStyles(styles)(PhasesList);
