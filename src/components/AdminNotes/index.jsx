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

class AdminNotes extends Component {
  constructor() {
    super();
    this.state = {
      func: null,
    };
  }

  renderAdminNotes = props => {
    return (
      <TextField
        id="admin-notes"
        label=""
        multiline
        rows="4"
        margin="normal"
        variant="outlined"
        fullWidth={true}
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
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <hr />
          <h3> Internal Admin Notes</h3>
        </Grid>
        <Grid item xs={12}>
          <Field name="adminNotes" component={this.renderAdminNotes} />
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

AdminNotes = reduxForm({
  form: 'adminNotes',
  enableReinitialize: true,
})(AdminNotes);

AdminNotes = connect(
  state => ({
    initialValues: {
      adminNotes: state.adminNotesReducer.value,
    },
  }),
  { change, show, submit },
)(AdminNotes);

AdminNotes = withStyles(styles)(AdminNotes);

export default AdminNotes;
