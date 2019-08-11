import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { bool, object, array, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import { handleExportCsv } from '../../services/constants';

class TriviasList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  transformData = trivias => {
    if (trivias)
      return trivias.map(trivia => {
        return {
          id: trivia.id,
          title: trivia.name,
          category: trivia.category.name,
          level: trivia.level,
          questions: trivia.questions.length ? trivia.questions.length : 0,
          prize: `${
            trivia.coins && trivia.coins > 0 ? `${trivia.coins} coins` : ''
          } ${
            trivia.coins &&
            trivia.coins > 0 &&
            trivia.points &&
            trivia.points > 0
              ? ' & '
              : ''
          } ${
            trivia.points && trivia.points > 0
              ? `${trivia.points} doubloons`
              : ''
          }`,
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
    const { isLoading, history, trivias, handleDeleteTrivia } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/minigame/trivia/create`)}
          >
            <Add />
            Add Trivia
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
              { title: 'Title', field: 'title', filtering: false },
              { title: 'Category', field: 'category', filtering: false },
              { title: 'Level', field: 'level', filtering: false },
              {
                title: 'N° of Questions',
                field: 'questions',
                searchable: false,
                filtering: false,
              },
              {
                title: 'Prize',
                field: 'prize',
                searchable: false,
                filtering: false,
              },
            ]}
            data={this.transformData(trivias)}
            title="Trivias List"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See detail',
                onClick: (event, rowData) => {
                  history.push(`/minigame/trivia/edit/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Delete Trivia',
                onClick: (event, rowData) => {
                  this.handleDialogShow('delete', entity =>
                    handleDeleteTrivia(rowData.id),
                  );
                },
              },
            ]}
            options={{
              filtering: false,
              pageSize: 10,
              search: false,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'trivias'),
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

TriviasList.propTypes = {
  isLoading: bool.isRequired,
  history: object.isRequired,
  trivias: array,
  handleDeleteTrivia: func.isRequired,
};

export default TriviasList;
