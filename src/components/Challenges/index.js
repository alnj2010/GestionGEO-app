import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { bool, object, array, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid} from '@material-ui/core';
import Dialog from '../Dialog';
class ChallengesList extends Component {
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

  transformData = challenges => {
    let transformedData = [];

    if (challenges && challenges.length > 0) {
      challenges.forEach(challenge => {
        transformedData.push({
          id: challenge.id,
          title: challenge.title,
          status: !challenge.deleteAt ? 'ACTIVE' : 'INACTIVE',
          type:challenge.type.type
        });
      });
      return transformedData;
    }
    return [];
  };

  lookupStatus = challenges => {
    let lookup = {};
    let status = [];
    challenges.forEach(challenge => {
      status.push(challenge.status);
    });
    status = [...new Set(status)];
    status.forEach(stat => {
      lookup[stat] = stat;
    });
    return lookup;
  };

  lookupType = challenges => {
    let lookup = {};
    let types = [];
    challenges.forEach(challenge => {
      types.push(challenge.type);
    });
    types = [...new Set(types)];
    types.forEach(type => {
      lookup[type] = type;
    });
    return lookup;
  };


  render = () => {
    const { isLoading, history, challenges, handleDeleteChallenge } = this.props;
    const { func } = this.state;

    return ( 
        <Grid container spacing={8}>
            
            <Grid item xs={12}>
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="Add"
                    onClick={() => history.push(`/challenges/create`)}
                >
                    <Add />
                    Add Treasure Hunt
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
                    title: 'Status',
                    field: 'status',
                    searchable: true,
                    lookup: this.lookupStatus(this.transformData(challenges)),
                },
                {
                    title: 'Type',
                    field: 'type',
                    searchable: true,
                    lookup: this.lookupType(this.transformData(challenges)),
                }
                ]}
                data={this.transformData(challenges)}
                title="Treasure Hunt Challenges"
                actions={[
                {
                    icon: 'visibility',
                    tooltip: 'See detail',
                    onClick: (event, rowData) => {
                        history.push(`/challenges/edit/${rowData.id}`);
                    },
                },
                {
                    icon: 'delete',
                    tooltip: 'Delete Challenge',
                    onClick: (event, rowData) => {
                        this.handleDialogShow('delete', entity =>
                            handleDeleteChallenge(rowData.id),
                        );
                    },
                },
                ]}
                options={{
                pageSize: 10,
                filtering:true,
                }}
                onChangePage={()=>{window.scroll(0,0)}}
                isLoading={isLoading}
            />
            </Grid>
            <Dialog handleAgree={func} />
        </Grid> );
    };
}

ChallengesList.propTypes = {
    isLoading: bool.isRequired,
    history: object.isRequired,
    challenges:array,
    handleDeleteChallenge: func.isRequired,

};

export default ChallengesList;