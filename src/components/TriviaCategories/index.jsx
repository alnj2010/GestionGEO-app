import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { bool, object, array, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';

class TriviaCategoriesList extends Component {
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
    const { isLoading, history, triviaCategories, handleDeleteTriviaCategory } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/trivia-categories/create`)}
          >
            <Add />
            Add Trivia Category
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
              { title: 'Title', field: 'name', filtering: false },
              {
                title: 'Description',
                field: 'description',
                searchable: false,
                filtering: false,
              },
            ]}
            data={triviaCategories}
            title="Categories List"
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See detail',
                onClick: (event, rowData) => {
                  history.push(`/trivia-categories/edit/${rowData.id}`);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Delete category',
                onClick: (event, rowData) => {
                  this.handleDialogShow('delete', entity =>
                    handleDeleteTriviaCategory(rowData.id),
                  );
                },
              },
            ]}
            options={{
              filtering: false,
              pageSize: 10,
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

TriviaCategoriesList.propTypes = {
  isLoading: bool.isRequired,
  history: object.isRequired,
  triviaCategories: array,
  handleDeleteTriviaCategory: func.isRequired,
};

export default TriviaCategoriesList;
