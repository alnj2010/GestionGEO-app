import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { array, bool, object, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import { handleExportCsv } from '../../services/constants';

class ScratchOffList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  transformData = scratchOffs => {
    if (scratchOffs)
      return scratchOffs.map(scratchOff => {
        return {
          id: scratchOff.id,
          title: scratchOff.title,
          luckyNumbers: scratchOff.luckyNumbers.numbers
            .map(number => number.number)
            .join(', '),
          bowlNumbers: scratchOff.bowlNumbers,
          maxWinners: scratchOff.maxWinners,
          maxPrizeCoins: scratchOff.maxPrizeCoins,
          maxPrizeDoubloons: scratchOff.maxPrizeDoubloons,
          gridType: scratchOff.gridType,
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
    const {
      scratchOffs,
      isLoading,
      history,
      handleDeleteScratchOff,
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
            onClick={() => history.push(`/minigame/scratch-off/create`)}
          >
            <Add />
            Add Scratch Off
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              {
                title: '#',
                field: 'id',
              },
              { title: 'Title', field: 'title' },
              { title: 'Lucky numbers value', field: 'luckyNumbers' },
              { title: 'Number of numbers in the bowl', field: 'bowlNumbers' },
              {
                title: 'Maximum amount of winners',
                field: 'maxWinners',
              },
              {
                title: 'Maximum prize coins',
                field: 'maxPrizeCoins',
              },
              {
                title: 'Maximum prize doubloons',
                field: 'maxPrizeDoubloons',
              },
              {
                title: 'Type of grid',
                field: 'gridType',
              },
            ]}
            data={this.transformData(scratchOffs)}
            title="Scratch Off List"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See detail',
                onClick: (event, rowData) => {
                  history.push(`/minigame/scratch-off/edit/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Delete user',
                onClick: (event, rowData) => {
                  this.handleDialogShow('delete', entity =>
                    handleDeleteScratchOff(rowData.id),
                  );
                },
              },
            ]}
            options={{
              filtering: false,
              search: false,
              pageSize: 10,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'scratch-off'),
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

ScratchOffList.propTypes = {
  scratchOffs: array,
  isLoading: bool.isRequired,
  history: object.isRequired,
  handleDeleteScratchOff: func.isRequired,
};

export default ScratchOffList;
