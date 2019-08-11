import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Form, reduxForm, change, submit } from 'redux-form';
import { object, func, bool, string } from 'prop-types';
import { show } from '../../actions/dialog';
import Dialog from '../Dialog';
import { FieldArray } from 'redux-form'
import MaterialTable from 'material-table';

import RenderFields from '../RenderFields';
const styles = theme => ({
  inputLabel: {
    paddingTop: '4%',
  },
  input: {
    alignSelf: 'center',
  },
  form: {
    paddingLeft: '5%',
  },
  largeIcon: {
    width: '36.5%',
    height: '36.5%',
    cursor: 'pointer',
  },
  profilePhoto: {
    width: 360,
    height: 360,
    cursor: 'pointer',
  },
  buttonContainer: { paddingTop: '2%' },
  save: {
    color: 'white',
    backgroundColor: '#61A956',
    '&:hover': {
      backgroundColor: 'rgb(78, 127, 71)',
    },
  },
  fileInput: {
    display: 'none',
  },
  date: { boxSizing: 'content-box', paddingTop: '4%' },
  lastSave: { justifyContent: 'flex-end', display: 'flex' },
  error: {
    color: 'red',
  },
  container: {
    marginBottom: 20,
  },
});

class ScratchOffDetail extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  handleDialogShow = (action, func) => {
    this.setState({ func: func }, () => {
      this.props.show(action);
    });
  };

  generateLuckyNumber = (luckyNumbers) =>{
    
    do{
      var number = Math.floor(Math.random() * 100 + 1);

    }while(// eslint-disable-next-line no-loop-func
      luckyNumbers.some(item => item.number === number ))

    return number
  }

  renderTable = ({ fields, meta: { error} }) => {
    return ( <div>
      <Grid item xs={12}>
        {error && <span className={this.props.classes.error}>{error}</span>}
      </Grid>
      <MaterialTable
        columns={[
          {
            title: '#',
            field: 'index',
            editable: 'never',
          },
          {
            title: 'Lucky Number',
            field: 'number',
            type: 'numeric',
            editable: 'onUpdate',
          },
          {
            title: 'Prize',
            field: 'prize',
            type: 'numeric',
          },
          {
            title: 'Currency',
            field: 'type',
            type: 'string',
            lookup: { C: 'Coins', D: 'Doubloons' },
          },
        ]}
        data={fields.getAll() && fields.getAll().map((number, index) => ({ index: index + 1, ...number })) }
        title="Lucky Numbers"
        options={{
          filtering: false,
          search: false,
          pageSize: 10,
        }}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              
              fields.push({number: this.generateLuckyNumber(fields.getAll()), prize: newData.prize ?newData.prize :0, type: newData.type})
          
              resolve();
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              fields.splice(newData.index-1, 1, 
                  {
                    number: parseInt(newData.number), 
                    prize: parseInt(newData.prize), 
                    type: newData.type}
              )          
              resolve();
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              fields.remove(oldData.index-1)
              resolve();
            }),
        }}
  /></div> )
  }

  render = () => {
    const {
      classes,
      handleSubmit,
      goBack,
      scratchOffId,
      handleScratchOffDelete,
      pristine,
      submitting,
      valid,
      submit,
    } = this.props;
    const { func } = this.state;

    const inputs = [
      { label: 'Title', field: 'title', id: 'title', type: 'text' },
      {
        label: 'Grid type',
        field: 'gridType',
        id: 'grid-type',
        type: 'select',
        options: [
          { key: '1', value: 1 },
          { key: '2', value: 2 },
          { key: '3', value: 3 },
        ],
      },
      {
        label: 'Amount of bowl numbers',
        field: 'bowlNumbers',
        id: 'bowl-numbers',
        type: 'number',
      },
    ];
    return (
      <Form onSubmit={handleSubmit}>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <h3>
              {scratchOffId ? `Scratch Off: ${scratchOffId}` : 'New Scratch Off'}
            </h3>
            <hr />
          </Grid>
          <Grid item xs={6} className={classes.form}>
            <Grid container>
              <RenderFields
                classes={{
                  input: classes.input,
                  inputLabel: classes.inputLabel,
                  error: classes.error,
                }}
              >
                {inputs}
              </RenderFields>
            </Grid>
          </Grid>
          <Grid item xs={6} className={classes.form}>
            <Grid container>
              <RenderFields
                classes={{
                  input: classes.input,
                  inputLabel: classes.inputLabel,
                  error: classes.error,
                }}
              >
                {[
                  {
                    label: 'Maximun amount of winners',
                    field: 'maxWinners',
                    id: 'max-winners',
                    type: 'number',
                  },
                  {
                    label: 'Maximum prize of coins',
                    field: 'maxPrizeCoins',
                    id: 'max-prize-coins',
                    type: 'number',
                  },
                  {
                    label: 'Maximum prize of doubloons',
                    field: 'maxPrizeDoubloons',
                    id: 'max-prize-doubloon',
                    type: 'number',
                  },
                ]}
              </RenderFields>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Grid container className={classes.buttonContainer}>
                  <Grid item xs={4}>
                    <Button variant="contained" onClick={goBack}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    {scratchOffId ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          this.handleDialogShow(
                            'delete',
                            handleScratchOffDelete,
                          )
                        }
                      >
                        Delete
                      </Button>
                    ) : null}
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      className={classes.save}
                      onClick={() =>
                        scratchOffId
                          ? this.handleDialogShow('update', submit)
                          : submit('scratch-off')
                      }
                      disabled={!valid || pristine || submitting}
                    >
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <FieldArray name="luckyNumbers" component={this.renderTable} rerenderOnEveryChange />
        <Dialog handleAgree={func} />
      </Form>
    );
  };
}

ScratchOffDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  goBack: func.isRequired,
  scratchOffId: string,
  handleScratchOffDelete: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
};

const scratchOffValidation = values => {
  const errors = {};
  if (!values.title) errors.title = `Title is required`;
  if (!values.gridType) errors.gridType = `Grid type is required`;
  if (!values.bowlNumbers) errors.bowlNumbers = `Bowl numbers is required`;
  if (
    Number.parseInt(values.bowlNumbers) < 6 ||
    Number.parseInt(values.bowlNumbers) > 100
  )
    errors.bowlNumbers = `Minimum 6 and maximum 100 bowl numbers`;
  if (!values.maxWinners) errors.maxWinners = `Max winners is required`;
  if (!values.maxPrizeCoins) errors.maxPrizeCoins = `Max prize is required`;
  if (!values.maxPrizeDoubloons)
    errors.maxPrizeDoubloons = `Max prize is required`;
  
    if (values.luckyNumbers && (values.luckyNumbers.length < 3 || values.luckyNumbers.length > 10) ) {
      errors.luckyNumbers={_error:'Minimum 3 and maximum 10 lucky numbers'};      
    }else if (values.luckyNumbers){
        let acumC = 0;
        let acumD = 0;
        values.luckyNumbers.forEach(number =>
            number.type === 'C' ? (acumC += Number.parseInt(number.prize)) : (acumD += Number.parseInt(number.prize))
        );
        if (Number.parseInt(values.maxPrizeCoins) < acumC) {
          errors.luckyNumbers={_error:'Maximum prize of coins exceeded'};
        }

        if (Number.parseInt(values.maxPrizeDoubloons) < acumD) {
          errors.luckyNumbers={_error:'Maximum prize of doubloons exceeded'};
        }
    }

  return errors;
};

ScratchOffDetail = reduxForm({
  form: 'scratch-off',
  validate: scratchOffValidation,
  enableReinitialize: true,
})(ScratchOffDetail);

ScratchOffDetail = connect(
  state => ({
    initialValues: {
      title: state.scratchOffReducer.selectedScratchOff.title,
      bowlNumbers: state.scratchOffReducer.selectedScratchOff.bowlNumbers,
      maxWinners: state.scratchOffReducer.selectedScratchOff.maxWinners,
      maxPrizeCoins: state.scratchOffReducer.selectedScratchOff.maxPrizeCoins,
      maxPrizeDoubloons:
        state.scratchOffReducer.selectedScratchOff.maxPrizeDoubloons,
      gridType: state.scratchOffReducer.selectedScratchOff.gridType,
      luckyNumbers: state.scratchOffReducer.selectedScratchOff.luckyNumbers.numbers
    },
    action: state.dialogReducer.action,
  }),
  { change, show, submit },
)(ScratchOffDetail);

export default withStyles(styles)(ScratchOffDetail);
