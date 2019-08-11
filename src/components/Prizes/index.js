import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { bool, array, func } from 'prop-types';
import Add from '@material-ui/icons/Add';
import { Fab, Grid} from '@material-ui/core';
import Dialog from '../Dialog';

class PrizesList extends Component {
  constructor() {
    super();
    this.state = {
        func: null,
    };
  }

  transformData = prizes => {
    let transformedData = [];

    if (prizes && prizes.length > 0) {
      prizes.forEach(prize => {
        let challenge=(prize.challengeTypes.map(item => item.type)).join();
        challenge = (challenge === '') ? 'Regular Menu' : challenge ;
        transformedData.push({
          id: prize.id,
          title: prize.title,
          category: prize.category.name,
          brand: prize.brand.name,
          challengeTypes:challenge,
          status: !prize.deleteAt ? 'ACTIVE' : 'INACTIVE',
          value: prize.value,
          internalDescription:prize.internalDescription
        });
      });
      return transformedData;
    }
    return [];
  };

  handleDialogShow = (action, func) => {
    const { show } = this.props;
    this.setState({ func: func }, () => {
      show(action);
    });
  };

  lookupCategory = prizes => {
    let lookup = {};
    let categories = [];
    prizes.forEach(prize => {
      categories.push(prize.category);
    });
    categories = [...new Set(categories)];
    categories.forEach(category => {
      lookup[category.name] = category.name;
    });
    return lookup;
  };


  lookupBrand = prizes => {
    let brands = prizes.map(item => ({...item.brand }) );
    let lookup={};          
    brands = [...new Set(brands)];
    brands.forEach(brand => {
      lookup[brand.name] = brand.name;
    });
    return lookup;
  };

lookupStatus = prizes => {
  let lookup = {};
  let status = [];
  prizes.forEach(prize => {
    status.push(prize.status);
  });
  status = [...new Set(status)];
  status.forEach(s => {
    lookup[s] = s;
  });
  return lookup;
};


  render = () => {
    const {
        prizes,
        history,
        handleDeletePrize,
        isLoading,
    }=this.props
    const { func } = this.state;
    return ( 
        <Grid container spacing={8}>
            
            <Grid item xs={12}>
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="Add"
                    onClick={() => history.push(`/prizes/create`)}
                >
                    <Add />
                    Add Prize
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
                        title: 'Challenge Type',
                        field: 'challengeTypes',
                        searchable: true,
                        filtering: false,
                    },
                    {
                        title: 'Category',
                        field: 'category',
                        searchable: true,
                        lookup: this.lookupCategory(prizes),
                    },
                    {
                        title: 'Brand',
                        field: 'brand',
                        searchable: true,
                        lookup: this.lookupBrand(prizes)
                        
                    },
                    {
                        title: 'Internal description of prize',
                        field: 'internalDescription',
                        searchable: true,
                        filtering: false,
                    },
                    {
                        title: 'Status',
                        field: 'status',
                        searchable: true,
                        lookup: this.lookupStatus(this.transformData(prizes))
                    },
                    {
                        title: 'Value',
                        field: 'value',
                        searchable: true,
                        filtering: false,
                    }
                    ]}
                    data={this.transformData(prizes)}
                    title="Prize List"
                    actions={[
                        {
                            icon: 'visibility',
                            tooltip: 'See detail',
                            onClick: (event, rowData) => {
                                history.push(`/prizes/edit/${rowData.id}`);
                            },
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete Prize',
                            onClick: (event, rowData) => {
                                this.handleDialogShow('delete', entity =>
                                  handleDeletePrize(rowData.id),
                                );
                              },
                        },
                        ]}
                    options={{
                        filtering: true,
                        pageSize: 10,
                    }}
                    onChangePage={()=>{window.scroll(0,0)}}
                    isLoading={isLoading}
                />
            </Grid>
            <Dialog handleAgree={func} />
        </Grid> );
    };
}

PrizesList.propTypes = {
    isLoading: bool.isRequired,
    prizes:array,
    handleDeletePrize: func.isRequired,
};

export default PrizesList;