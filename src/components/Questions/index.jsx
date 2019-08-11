import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { bool, object, array, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Dialog from '../Dialog';
import { handleExportCsv } from '../../services/constants';

class QuestionsList extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  transformData = questions => {
    if (questions)
      return questions.map(question => {
        return {
          id: question.id,
          title: question.title,
          question: question.text,
          firstOption: question.alternatives.text[0],
          secondOption: question.alternatives.text[1],
          thirdOption: question.alternatives.text[2],
          fourthOption: question.alternatives.text[3],
          answer: question.answer,
          level: question.level,
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
      isLoading,
      history,
      questions,
      handleDeleteQuestion,
      noActions,
    } = this.props;
    const { func } = this.state;
    return (
      <Grid container spacing={8}>
        {noActions ? null : (
          <Grid item xs={12}>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="Add"
              onClick={() => history.push(`/questions/create`)}
            >
              <Add />
              Add Question
            </Fab>
          </Grid>
        )}

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
              {
                title: 'Question',
                field: 'question',
                searchable: false,
                filtering: false,
              },
              {
                title: 'Option 1',
                field: 'firstOption',
                searchable: false,
                filtering: false,
              },
              {
                title: 'Option 2',
                field: 'secondOption',
                searchable: false,
                filtering: false,
              },
              {
                title: 'Option 3',
                field: 'thirdOption',
                searchable: false,
                filtering: false,
              },
              {
                title: 'Option 4',
                field: 'fourthOption',
                searchable: false,
                filtering: false,
              },
              {
                title: 'Answer',
                field: 'answer',
                searchable: false,
                filtering: false,
              },
              {
                title: 'Level',
                field: 'level',
                searchable: false,
                filtering: false,
              },
            ]}
            data={this.transformData(questions)}
            title="Questions List"
            actions={
              noActions
                ? []
                : [
                    {
                      icon: 'visibility',
                      tooltip: 'See detail',
                      onClick: (event, rowData) => {
                        history.push(`/questions/edit/${rowData.id}`);
                      },
                    },
                    {
                      icon: 'delete',
                      tooltip: 'Delete Question',
                      onClick: (event, rowData) => {
                        this.handleDialogShow('delete', entity =>
                          handleDeleteQuestion(rowData.id),
                        );
                      },
                    },
                  ]
            }
            options={{
              filtering: false,
              pageSize: 10,
              search: false,
              exportButton: true,
              exportCsv: (columns, renderData) =>
                handleExportCsv(columns, renderData, 'questions'),
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

QuestionsList.propTypes = {
  isLoading: bool.isRequired,
  history: object,
  questions: array,
  handleDeleteQuestion: func,
};

export default QuestionsList;
