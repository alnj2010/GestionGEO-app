import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { bool, object} from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';
import { DateFormatInput } from 'material-ui-next-pickers';
import { handleExportCsv } from '../../services/constants';

const styles = theme => ({
  date: { boxSizing: 'content-box' },
});

class WinnersList extends Component {
  constructor() {
    super();
    this.state = {
      initial: null,
      final: null,
    };
  }

  transformData = winners => {
    const { initial, final } = this.state;
    if (winners) {
      let list = [];
      let triviaWinners = winners.trivia;
      if (triviaWinners)
        for (let winner of triviaWinners) {
          let date = new Date(winner.date);
          date.setUTCHours(0, 0, 0, 0);
          if (initial && final) {
            if (initial <= date && final >= date)
              list.push({
                id: winner.profile.id,
                email: winner.profile.user.email,
                name: winner.name,
                lastName: winner.last,
                date: winner.date,
                minigame: winner.game,
                doubloons: winner.doubluns,
                coins: winner.coins,
                prize: 'example prize',
                earnedDoubloons: winner.sumDoubluns,
                earnedCoins: winner.sumCoins,
                winners: winner.sumWinners,
              });
          } else if (initial && initial <= date)
            list.push({
              id: winner.profile.id,
              email: winner.profile.user.email,
              name: winner.name,
              lastName: winner.last,
              date: winner.date,
              minigame: winner.game,
              doubloons: winner.doubluns,
              coins: winner.coins,
              prize: 'example prize',
              earnedDoubloons: winner.sumDoubluns,
              earnedCoins: winner.sumCoins,
              winners: winner.sumWinners,
            });
          else if (final && final >= date)
            list.push({
              id: winner.profile.id,
              email: winner.profile.user.email,
              name: winner.name,
              lastName: winner.last,
              date: winner.date,
              minigame: winner.game,
              doubloons: winner.doubluns,
              coins: winner.coins,
              prize: 'example prize',
              earnedDoubloons: winner.sumDoubluns,
              earnedCoins: winner.sumCoins,
              winners: winner.sumWinners,
            });
          else if (!initial && !final) {
            list.push({
              id: winner.profile.id,
              email: winner.profile.user.email,
              name: winner.name,
              lastName: winner.last,
              date: winner.date,
              minigame: winner.game,
              doubloons: winner.doubluns,
              coins: winner.coins,
              prize: 'example prize',
              earnedDoubloons: winner.sumDoubluns,
              earnedCoins: winner.sumCoins,
              winners: winner.sumWinners,
            });
          }
        }
      return list;
    }
    return [];
  };

  onChangeDate = (date, calendar) => {
    if (calendar === 'initial') this.setState({ initial: date });
    else this.setState({ final: date });
  };

  render = () => {
    const { winners, isLoading, classes } = this.props;
    const { initial, final } = this.state;
    return (
      <Grid item xs={12}>
        <Grid container>
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
                {
                  title: '#',
                  field: 'id',
                  searchable: false,
                  filtering: false,
                },
                { title: 'Email', field: 'email', filtering: false },
                { title: 'First Name', field: 'name', filtering: false },
                { title: 'Last Name', field: 'lastName', filtering: false },
                { title: 'Date', field: 'date', filtering: false },
                {
                  title: 'Game Played',
                  field: 'minigame',
                  searchable: false,
                },
                {
                  title: 'Doubloons',
                  field: 'doubloons',
                  searchable: false,
                  filtering: false,
                },
                {
                  title: 'Coins',
                  field: 'coins',
                  searchable: false,
                  filtering: false,
                },
                {
                  title: 'Prize',
                  field: 'prize',
                  searchable: false,
                  filtering: false,
                },
                {
                  title: 'Sums of points earned',
                  field: 'earnedDoubloons',
                  searchable: false,
                  filtering: false,
                },
                {
                  title: 'Sum of coins earned',
                  field: 'earnedCoins',
                  searchable: false,
                  filtering: false,
                },
                {
                  title: 'Sum of winners',
                  field: 'winners',
                  searchable: false,
                  filtering: false,
                },
              ]}
              data={this.transformData(winners)}
              title="Winners Table"
              options={{
                filtering: true,
                pageSize: 10,
                exportButton: true,
                exportCsv: (columns, renderData) =>
                  handleExportCsv(columns, renderData, 'winners'),
              }}
              onChangePage={()=>{window.scroll(0,0)}}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

WinnersList.propTypes = {
  winners: object,
  isLoading: bool.isRequired,
};

export default withStyles(styles)(WinnersList);
