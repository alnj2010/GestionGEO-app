import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, TextField, Button } from '@material-ui/core';
import { Form, Field, reduxForm, change, submit } from 'redux-form';
import { show } from '../../actions/dialog';

const styles = theme => ({
  save: {
    color: 'white',
    backgroundColor: '#61A956',
    '&:hover': {
      backgroundColor: 'rgb(78, 127, 71)',
    },
  },
  lastSave: { justifyContent: 'flex-end', display: 'flex' },
});

class SpecialHint extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  renderSpecialHint = props => {
    return (
      <TextField
        id="special-hint"
        label=""
        multiline
        rows="4"
        margin="normal"
        variant="outlined"
        fullWidth={true}
        disabled={props.disabled}
        {...props.input}
      />
    );
  };
  render = () => {
    const {
      classes,
      handleSubmit,
      valid,
      pristine,
      submitting,
      submit,
      parent,
      disabled
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <hr />
          <h3>Special Hint</h3>
        </Grid>
        <Grid item xs={12}>
          <Field name="specialHint" component={this.renderSpecialHint} disabled={disabled}/>
        </Grid>
        <Grid item xs={12} className={classes.lastSave}>
          <Button
            variant="contained"
            className={classes.save}
            onClick={() => parent.handleDialogShow('update', submit)}
            disabled={!valid || pristine || submitting}
          >
            Save Changes
          </Button>
        </Grid>
      </Form>
    );
  };
}

SpecialHint = reduxForm({
  form: 'specialHint',
  enableReinitialize: true,
})(SpecialHint);

SpecialHint = connect(
  state => ({
    initialValues: {
      specialHint: state.challengeReducer.selectedChallenge.specialHint,
    },
  }),
  { change, show, submit },
)(SpecialHint);

SpecialHint = withStyles(styles)(SpecialHint);

export default SpecialHint;
