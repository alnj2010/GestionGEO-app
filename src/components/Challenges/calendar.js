import React, { Component } from 'react';
import { object, array } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import { Fab, Grid} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  Form,
  reduxForm,
  formValueSelector,
} from 'redux-form';
import RenderFields from '../RenderFields'
import {
    Calendar,
    momentLocalizer,
    Views,
} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const styles = theme => ({
  addContainer:{
    height:"5vh",
    marginBottom:"1%"
  },
  filters:{
    height:"5vh",
    marginBottom:"5%"
  },
  form: {
    paddingLeft: '5%',
    width:'100%'
  },
  calendar:{
    height:"90vh"
  }
});

const localizer = momentLocalizer(moment)

class ChallengeCalendar extends Component {

    transformData = challenges => {
      let transformedData = [];
      const {status,type}=this.props;
      if (challenges && challenges.length > 0) {
        challenges.forEach(challenge => {
          transformedData.push({
            id: challenge.id,
            title: challenge.title,
            start: new Date(challenge.startingDate),
            end: new Date(challenge.finalDate),
            status: !challenge.deleteAt ? 'ACTIVE' : 'INACTIVE',
            type:challenge.type
          });
        });
        transformedData = transformedData.filter( item => (!status || status.length===0 || status.some(s=>s===item.status )));
        transformedData = transformedData.filter( item => (!type || type.length===0 || type.some(t=>t===item.type.id )));
        
        return transformedData;
      }
      return [];
    };

    render = () => {
      const { history, challenges,handleSubmit,challengeTypes,classes } = this.props;
      const ColoredDateCellWrapper = ({ children }) =>
        React.cloneElement(React.Children.only(children), {
          style: {
            backgroundColor: 'lightblue',
          },
        })
      let allViews = Object.keys(Views).map(k => Views[k])
      return ( 
      <Form  onSubmit={handleSubmit} >
          <Grid container className={classes.addContainer} >
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
          </Grid>
          <Grid container className={classes.filters}>
            <Grid item xs={6}>
              <RenderFields >{[
                {field: 'type', id: 'type', type: 'select', placeholder:'Type Challenge', multiple:true, options: challengeTypes.map(type => { return { key: type.type, value: type.id } }) },
              ]}</RenderFields>
            </Grid>
            <Grid item xs={6}>
              <RenderFields>{[
                { field: 'status', id: 'status', type: 'select', placeholder:'Status',  multiple:true, options: ['ACTIVE' , 'INACTIVE'].map(status => { return { key: status, value: status } }) },
              ]}</RenderFields>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Calendar
                className={classes.calendar}
                events={this.transformData(challenges)}
                views={allViews}
                step={60}
                showMultiDayTimes
                onSelectEvent={event => history.push(`/challenges/edit/${event.id}`)}
                components={{
                  timeSlotWrapper: ColoredDateCellWrapper,
                }}
                localizer={localizer}
              />
            </Grid>
          </Grid>        
      </Form>);
      };
}

ChallengeCalendar.propTypes = {
    history: object.isRequired,
    challenges:array,
};

ChallengeCalendar = reduxForm({
  form: 'filterCalendar',
})(ChallengeCalendar);

const selector = formValueSelector('filterCalendar')

ChallengeCalendar = connect(
  state => ({        
      status:selector(state, 'status'),
      type:selector(state, 'type'),
  }),
)(ChallengeCalendar);

export default withStyles(styles)(ChallengeCalendar);