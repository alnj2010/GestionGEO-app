import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { object, func, string, bool } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button
} from '@material-ui/core';
import {
  Form,
  reduxForm,
  change,
  submit,
} from 'redux-form';
import Dialog from '../Dialog';
import { show } from '../../actions/dialog';
import AdminNotes from '../AdminNotes';
import RenderFields from '../RenderFields'

  const styles = theme => ({
    inputLabel: {
      paddingTop: '4%',
    },
    rightInputLabel: {
      paddingTop: '4%',
      paddingLeft: '4%',
    },
    input: {
      alignSelf: 'center',
    },
    form: {
      paddingLeft: '5%',
      width:'100%'
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
    }
  });

class LocationDetail extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          func: null,
        };   
    }

      handleDialogShow = (action, func) => {
        this.setState({ func: func }, () => {
          this.props.show(action);
        });
      };
    

      render(){
          const {
            classes,
            handleSubmit,
            locationId,
            pristine,
            submitting,
            valid,
            goBack,
            submit,
            saveAdminNotes,
            handleSaveLocation,
            handleLocationDelete
          } = this.props;
          const { func } = this.state;
          return (
            <React.Fragment>
                <Grid container>
                  <h3> {locationId ? `Location Code: ${locationId}` : 'New Location Code'}</h3>                                                   
                </Grid>
                <hr />
                <Grid container>
                  <Form onSubmit={handleSubmit(handleSaveLocation)} className={classes.form}>
                    <RenderFields >{[
                      { label: 'Location Title', field: 'title', id: 'title', type: 'text' }, 
                      { label: 'Country', field: 'country', id: 'country', type: 'text' },  
                    ]}</RenderFields>
                    <Grid item xs={12}>
                      <Grid container className={classes.buttonContainer} justify="flex-end" >
                        <Grid item xs={2}>
                          <Button variant="contained" onClick={goBack}>
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item xs={2}>
                        {locationId ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              this.handleDialogShow(
                                'delete',
                                handleLocationDelete,
                              )
                            }
                          >
                            Delete
                          </Button>
                        ) : null}
                     
                      </Grid>
                          <Grid item xs={2}>
                            <Button
                              variant="contained"
                              className={classes.save}
                              onClick={() =>
                                locationId
                                  ? this.handleDialogShow('update', submit)
                                  : submit('location')
                              }
                              disabled={!valid || pristine || submitting}
                            >
                              Save Changes
                            </Button>
                          </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                  
                  <Grid item xs={12}>
                    {locationId ? (
                      <AdminNotes onSubmit={saveAdminNotes} parent={this} />
                    ) : (
                      <Fragment>
                        <hr />
                        <h3> Admin Notes will be avaliable after you create a location</h3>
                      </Fragment>
                    )}
                  </Grid>
                </Grid>
                <Dialog handleAgree={func} />

            </React.Fragment> 
            )
      }

}
const locationValidation = values => {
  const errors = {};
  if (!values.title) errors.title = 'Title must not be empty';
  if (!values.country) errors.country = 'Country must not be empty';
  return errors;
};

LocationDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  handleSaveLocation: func.isRequired,
  playerId: string,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
  photo: string,
  goBack: func.isRequired,
};

LocationDetail = reduxForm({
  form: 'location',
  validate: locationValidation,
  enableReinitialize: true,
})(LocationDetail);

LocationDetail = connect(
  state => ({
    initialValues: {
      title: state.locationReducer.selectedLocation ? state.locationReducer.selectedLocation.title :null,
      country: state.locationReducer.selectedLocation ? state.locationReducer.selectedLocation.country :null
    }
  }),
  { change, submit, show },
)(LocationDetail);

export default withStyles(styles)(LocationDetail);