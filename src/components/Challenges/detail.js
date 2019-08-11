import React, { Component } from 'react'
import { connect } from 'react-redux';
import { object, func, string, bool } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as moment from 'moment';
import {
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import {
  Form,
  reduxForm,
  change,
  submit,
  FieldArray,
  Field,
  formValueSelector
} from 'redux-form';
import Dialog from '../Dialog';
import { show } from '../../actions/dialog';
import RenderFields from '../RenderFields'
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import SpecialHint from '../SpecialHint';
import geodist from 'geodist';
import {AMOUNT_POINT, INDEX_LAST_POINT} from '../../services/constants'
import * as dateMath from 'date-arithmetic'


  const styles = theme => ({
    inputLabel: {
      paddingTop: '4%',
    },
    InputPoint: {
      paddingLeft: '2%',
      paddingRight: '2%',
    },
    input: {
      alignSelf: 'center',
    },
    form: {
      paddingLeft: '5%',
      width:'100%'
    },
    buttonContainer: { paddingTop: '2%' },
    fileInput: {
      display: 'none',
    },
    date: { boxSizing: 'content-box', paddingTop: '4%' },
    lastSave: { justifyContent: 'flex-end', display: 'flex' },
    error: {
      color: 'red',
    },
    root: {
      flexGrow: 1,
      height: 250,
    },
    inputSelect: {
      display: 'flex',
      padding: 0,
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === 'light'
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
        0.08,
      ),
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 1000,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing.unit * 2,
    },
    save: {
      color: 'white',
      backgroundColor: '#61A956',
      '&:hover': {
        backgroundColor: 'rgb(78, 127, 71)',
      },
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  });


class ChallengeDetail extends Component {

    constructor(props) {
        super(props);

        // eslint-disable-next-line
        Date.prototype.addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        }
        
        this.state = {
          func: null,
        };   
    }

      handleDialogShow = (action, func) => {
        this.setState({ func: func }, () => {
          this.props.show(action);
        });
      };

      renderField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
          <label>{label}</label>
          <div>
            <input {...input} type={type} placeholder={label} />
            {touched && error && <span>{error}</span>}
          </div>
        </div>
      )

      renderPoins = ({ fields,disabled, meta: { error, submitFailed } }) => {
  
        const {classes,trivias,miles} = this.props;
        return (
          <Grid container>
            <Grid item container xs={12}>
              {error && <span className={this.props.classes.error}>{error}</span>}
            </Grid>
            {fields.map((point, index) => <Grid key={index} item container xs={12} >
              <Grid item container xs={1} justify="center" alignItems="flex-end">
                <Typography variant={"subtitle2"} gutterBottom>{index+1}</Typography>
                <Field name={`${point}.order`}  component="input" type="hidden" value={index}/>
              </Grid>
              <Grid item container xs={3}>
                <RenderFields >{[
                  {  field: `${point}.trivias`, id: `${point}.trivias`, type: 'select', multiple:true,disabled:disabled, options:trivias.map(item => ({key:item.name,value:item.id}))},
                ]}</RenderFields>                          
              </Grid>
              <Grid item container xs={2} className={classes.InputPoint}>
                <RenderFields >{[
                  { field: `${point}.hint`, id: `${point}.hint`,disabled:disabled, type: (index === INDEX_LAST_POINT) ?'hidden':'text' },
                ]}</RenderFields>                            
              </Grid>  
              <Grid item container xs={2} className={classes.InputPoint}> 
                <RenderFields >{[
                  { field: `${point}.latitude`,disabled:disabled, id: `${point}.latitude`, type: 'text' },
                ]}</RenderFields>                           
              </Grid>  
              <Grid item container xs={2} className={classes.InputPoint}> 
                <RenderFields >{[
                  { field: `${point}.longitude`,disabled:disabled, id: `${point}.longitude`, type: 'text' },
                ]}</RenderFields>                           
              </Grid>
              <Grid item container xs={2} className={classes.InputPoint}> 
                <RenderFields >{[
                  { field: `${point}.ratio`,disabled:disabled, id: `${point}.ratio`, type: 'select', options: miles.map(mile => { return { key: mile.mile, value: mile.mile } }) },
                ]}</RenderFields>                           
              </Grid>                          
            </Grid>)}
          </Grid>) 
      }

      render(){
          const {
            classes,
            handleSubmit,
            challengeId,
            pristine,
            submitting,
            valid,
            goBack,
            submit,
            handleSaveChallenge,
            handleChallengeDelete,
            challengeTypes,
            coupons,
            prizes,
            zipcodes,
            typeChallenge,
            saveSpecialHint,
            initialDate,
            startingDate,
            finalDate,
          } = this.props;
          const { func } = this.state;
          let today=new Date();
          let isBeforeTHC=challengeId && dateMath.lt((new Date(initialDate)), today);
          let isAfterTHC=challengeId && dateMath.lt((new Date(finalDate)), today);
          let couponsOption=coupons.filter(coupon => coupon.challengeTypes.some(type=>type.id===typeChallenge))
                .map(item => ({key:item.title,value:item.id}))
          
           let prizesOption=prizes.filter(prize => prize.challengeTypes.some(type=>type.id===typeChallenge))
                .map(item => ({key:item.title,value:item.id}))

          return (
            <React.Fragment>
                <Grid container>
                  <h3> {challengeId ? `Treasure Hunt Code: ${challengeId}` : 'New Treasure Hunt Code'}</h3>                                                   
                </Grid>
                <hr />
                <Grid container>
                  <Form onSubmit={handleSubmit(handleSaveChallenge)} className={classes.form}>

                    <Grid container>
                      <Grid item container>
                        <Grid item xs={6}>
                          <RenderFields >{[
                            { label: 'Challenge Title', field: 'title', id: 'title', type: 'text',disabled:isBeforeTHC },
                            { label: 'Starting Date', field: 'startingDate', id: 'startingDate', type: 'datetime-local', minDate:today, disabled:isBeforeTHC }, 
                          ]}</RenderFields>
                        </Grid>
                        <Grid item xs={6}>
                          <RenderFields >{[
                             { label: 'Challenge Type', field: 'type', id: 'type', type: 'select',disabled:!!challengeId, options: challengeTypes.map(type => { return { key: type.type, value: type.id } }) },
                             { label: 'Final Date', field: 'finalDate', id: 'finalDate', type: 'datetime-local', minDate:(new Date(startingDate)),disabled:(isBeforeTHC || startingDate==='Invalid date') },
                          ]}</RenderFields>
                        </Grid>
                        <Grid container item xs={12}>
                          <Grid item xs={6}>
                            <RenderFields >{[
                              { label: 'Challenge Zip Code', type: 'label'},
                              { label: 'Zip Code', field: 'zipcode', id: 'zipcode', type: 'select', options: zipcodes.map(type => { return { key: type.code, value: type.id } }),disabled:isBeforeTHC },
                              { label: 'Rewards Associated', type: 'label'},
                            ]}</RenderFields>
                          </Grid>                         
                        </Grid>
                        <Grid item xs={6}>
                          <RenderFields >{[
                             { label: 'Coupon Reward', field: 'coupons', id: 'coupons', type: 'select', multiple:true, options:couponsOption,disabled:isBeforeTHC},
                             { label: 'Number Coupon Winners', field: 'winnersCoupon', id: 'winnersCoupon', type: 'number', min:0, disabled:isBeforeTHC},
                             { label: 'Number of Doubloons Reward', field: 'doubloonsReward', id: 'doubloonsReward', type: 'number', min:0,disabled:isBeforeTHC},
                             { label: 'Number Winners', field: 'winners', id: 'winners', type: 'number', min:0,disabled:isBeforeTHC},
                          ]}</RenderFields>
                        </Grid>
                        <Grid item xs={6}>
                          <RenderFields >{[
                              { label: 'Prize Reward', field: 'prizes', id: 'prizes', type: 'select', multiple:true, options:prizesOption,disabled:isBeforeTHC},
                              { label: 'Number Prize Winners', field: 'winnersPrize', id: 'winnersPrize', type: 'number', min:0, disabled:isBeforeTHC},
                              { label: 'Number of Coins Reward', field: 'coinsReward', id: 'coinsReward', type: 'number', min:0,disabled:isBeforeTHC},
                              { label: 'Number of Doubloons if Share on FB Reward', field: 'shareDoubloons', id: 'shareDoubloons', type: 'number', min:0,disabled:isAfterTHC},
                          ]}</RenderFields>
                        </Grid>               
                      </Grid> 
                      
                      <Grid item container>                     
                        <Grid item container xs={12}>                          
                          <Grid item container xs={6}>
                            <Grid item xs={6}> <Typography variant={"h6"} gutterBottom>Calculations</Typography></Grid>
                            <Grid item xs={6}> <Typography variant={"h6"} gutterBottom>Number of Users</Typography></Grid>
                            <RenderFields >{[                         
                            { label: '# of First Places', field: 'firstPlaces', id: 'firstPlaces', type: 'number', min:0,disabled:isBeforeTHC},
                            { label: '# of Second Places', field: 'secondPlaces', id: 'secondPlaces', type: 'number', min:0,disabled:isBeforeTHC},
                            { label: '# of Third Places', field: 'thirdPlaces', id: 'thirdPlaces', type: 'number', min:0,disabled:isBeforeTHC},
                            ]}</RenderFields>
                          </Grid>
                        </Grid>    
                      </Grid>
                      
                      <Grid item container className={classes.inputLabel}>
                        <Grid item xs={12}> <Typography variant={"h6"} gutterBottom>Points Associated</Typography></Grid>
                        <Grid item container xs={12} justify="center" >
                          <Grid item xs={1}><Typography variant={"h6"} gutterBottom style={{textAlign:"center"}} >Point</Typography></Grid>
                          <Grid item xs={3}><Typography variant={"h6"} gutterBottom style={{textAlign:"center"}}>Trivias</Typography></Grid>
                          <Grid item xs={2}><Typography variant={"h6"} gutterBottom style={{textAlign:"center"}}>Hints for map points</Typography></Grid>
                          <Grid item xs={2}><Typography variant={"h6"} gutterBottom style={{textAlign:"center"}}>Latitudes</Typography></Grid>
                          <Grid item xs={2}><Typography variant={"h6"} gutterBottom style={{textAlign:"center"}}>Longitudes</Typography></Grid>
                          <Grid item xs={2}><Typography variant={"h6"} gutterBottom style={{textAlign:"center"}}>Ratio (mi)</Typography></Grid>
                        </Grid>
                        <FieldArray name="mapPoints" component={this.renderPoins} disabled={isBeforeTHC} />          
      
                      </Grid>
                      <Grid item container >
                        <RenderFields >{[                         
                          { label: 'Final Percentage', field: 'finalPercentage', id: 'finalPercentage', type: 'number', min:0, max:100,disabled:isBeforeTHC},
                        ]}</RenderFields>
                      </Grid>

                      <Grid item container >
                        <RenderFields >{[                         
                          { label: !challengeId &&'Special Hint', field: 'specialHint', id: 'specialHint', type: challengeId ? 'hidden': 'text'},
                        ]}</RenderFields>
                      </Grid>
                    </Grid>

                    

                    <Grid item xs={12}>
                      <Grid container className={classes.buttonContainer} justify="flex-end" >
                        <Grid item xs={2}>
                          <Button variant="contained" onClick={goBack}>
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item xs={2}>
                        {challengeId ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              this.handleDialogShow(
                                'delete',
                                handleChallengeDelete,
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
                                challengeId
                                  ? this.handleDialogShow('update', submit)
                                  : submit('challenge')
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
                    {challengeId && <SpecialHint onSubmit={saveSpecialHint} parent={this} disabled={isAfterTHC} /> }
                  </Grid>
                </Grid>
                <Dialog handleAgree={func} />

            </React.Fragment> 
            )
      }

}
const challengeValidation = values => {
  const errors = {};
  if (!values.title) errors.title = 'Title must not be empty';

  if(!values.startingDate || values.startingDate === 'Invalid date') 
    errors.startingDate = 'Starting Date must not be empty';
  
  if(!values.finalDate || values.finalDate === 'Invalid date') 
    errors.finalDate = 'Final Date must not be empty';
  else if (new Date(values.finalDate) <= new Date(values.startingDate))
    errors.finalDate = 'Pick date-time greater than the Starting date';

  if(!values.type) errors.type = 'Challenge Type must not be empty';
  if(!values.zipcode) errors.zipcode = 'Zip Code must not be empty';
  if(!values.coupons || values.coupons.length===0) errors.coupons = 'At least one coupon must be selected';
  
  if(!values.winnersCoupon) errors.winnersCoupon = 'Number Coupon Winners must not be empty';
  else if (!/(?=[0-9])/.test(values.winnersCoupon))
    errors.winnersCoupon = ' must only contain numbers';
  
  if(!values.winnersPrize) errors.winnersPrize = 'Number Prize Winners must not be empty';
  else if (!/(?=[0-9])/.test(values.winnersPrize))
    errors.winnersPrize = 'Number Prize Winners must only contain numbers';

  if(!values.doubloonsReward) errors.doubloonsReward = 'Number of Doubloons Reward must not be empty';
  else if (!/(?=[0-9])/.test(values.doubloonsReward))
    errors.doubloonsReward = 'Number of Doubloons Reward must only contain numbers';
  
  if(!values.firstPlaces) errors.firstPlaces = '# of First Places must not be empty';
  else if (!/(?=[0-9])/.test(values.firstPlaces))
    errors.firstPlaces = '# of First Places must only contain numbers';

  if(!values.secondPlaces) errors.secondPlaces = '# of Second Places must not be empty';
  else if (!/(?=[0-9])/.test(values.secondPlaces))
    errors.secondPlaces = '# of Second Places must only contain numbers';
  else if(!errors.firstPlaces && parseInt(values.firstPlaces)> parseInt(values.secondPlaces))
    errors.secondPlaces = '# of Second Places must not be less than # of First Places';


  if(!values.thirdPlaces) errors.thirdPlaces = '# of Third Places must not be empty';
  else if (!/(?=[0-9])/.test(values.thirdPlaces))
    errors.thirdPlaces = '# of Third Places must only contain numbers';
  else if(!errors.secondPlaces && parseInt(values.secondPlaces)> parseInt(values.thirdPlaces))
    errors.thirdPlaces = '# of Third Places must not be less than # of Second Places';

  if(!values.winners) errors.winners = 'Number Winners must not be empty';
  else if (!/(?=[0-9])/.test(values.winners))
    errors.winners = 'Number Winners must only contain numbers';
  else if(values.winnersCoupon && values.winnersPrize && !errors.winnersPrize && !errors.winnersCoupon && (parseInt((values.winnersCoupon)) + parseInt((values.winnersPrize))) > parseInt(values.winners)  )
    errors.winners = 'The sum of Prize and Coupon Winners must not be greater than Number Winners';
  else if(
    values.firstPlaces && 
    values.secondPlaces && 
    values.thirdPlaces && 
    !errors.firstPlaces && 
    !errors.secondPlaces && 
    !errors.thirdPlaces && 
    ((  parseInt((values.firstPlaces)) + parseInt((values.secondPlaces)) + parseInt((values.thirdPlaces))   )>parseInt(values.winners)   )) errors.winners = 'The sum of first, second and third place must not be greater than Number Winners';

  if(!values.prizes || values.prizes.length===0) errors.prizes = 'At least one prize must be selected';

  if(!values.coinsReward) errors.coinsReward = 'Number of Coins Reward must not be empty';
  else if (!/(?=[0-9])/.test(values.coinsReward))
    errors.coinsReward = 'Number of Coins Reward must only contain numbers';

  if(!values.shareDoubloons) errors.shareDoubloons = 'Number of Doubloons if Share on FB Reward must not be empty';
  else if (!/(?=[0-9])/.test(values.shareDoubloons))
    errors.shareDoubloons = 'Number of Doubloons must only contain numbers';

  if(!values.finalPercentage) errors.finalPercentage = 'Final Percentage must not be empty';
  else if (!/(?=[0-9])/.test(values.finalPercentage))
    errors.finalPercentage = 'Final Percentage must only contain numbers';
  else if (parseInt(values.finalPercentage)<0 || parseInt(values.finalPercentage)>100)
    errors.finalPercentage = 'Final Percentage must be between 0 and 100';

  if(!values.specialHint) errors.specialHint = 'Special Hint must not be empty';

  
  
  if (values.mapPoints && values.mapPoints.length!==AMOUNT_POINT ) {
    errors.mapPoints={_error:'There must be exactly '+(AMOUNT_POINT)+' points'};    
  }else if (values.mapPoints){
    
    const mapPointsArrayErrors = []
    var error=false;
    values.mapPoints.forEach((point, pointIndex) => {
      const pointErrors = {}

      if( point.trivias.length!==0 && point.trivias.length !== 3 ) pointErrors.trivias='You must choose only 3 trivias'

      if((!point || !point.hint) && pointIndex!==INDEX_LAST_POINT ) pointErrors.hint = 'Required'

      if(!point || !point.latitude ) pointErrors.latitude = 'Required'
      else if (!/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(point.latitude)) 
        pointErrors.latitude = "Enter a valid latitude"

      if(!point || !point.longitude ) pointErrors.longitude = 'Required'
      else if (!/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(point.longitude)) 
        pointErrors.longitude = "Enter a valid longitude"

      if(!point || !point.ratio ) pointErrors.ratio = 'Required'    
      
      if( pointIndex>0 && !mapPointsArrayErrors[pointIndex-1].latitude && !mapPointsArrayErrors[pointIndex-1].longitude && !mapPointsArrayErrors[pointIndex-1].ratio && !pointErrors.latitude && !pointErrors.longitude && !pointErrors.ratio){
          let latA=parseFloat(values.mapPoints[pointIndex-1].latitude);
          let lonA=parseFloat(values.mapPoints[pointIndex-1].longitude);
          let latB=parseFloat(values.mapPoints[pointIndex].latitude);
          let lonB=parseFloat(values.mapPoints[pointIndex].longitude);
          let RA=values.mapPoints[pointIndex-1].ratio;
          let RB=values.mapPoints[pointIndex].ratio;
          let distAB = geodist({ lat:latA, lon: lonA }, {  lat:latB, lon: lonB} )
          let distRARB=distAB-RA-RB;
          
          error = distRARB < 0
          if( error ) errors.mapPoints={_error:'Map points '+pointIndex+' and '+(pointIndex+1)+' are very close. You must separate them'};
                 
      }
      
      mapPointsArrayErrors[pointIndex] = pointErrors
      
    })
    if (mapPointsArrayErrors.length && !error) {
      errors.mapPoints = mapPointsArrayErrors
    }
  }

  return errors;
};

ChallengeDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  handleSaveChallenge: func.isRequired,
  challengeId: string,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
  goBack: func.isRequired,
};

ChallengeDetail = reduxForm({
  form: 'challenge',
  validate: challengeValidation,
  enableReinitialize: true,
})(ChallengeDetail);
const selector = formValueSelector('challenge');
ChallengeDetail = connect(
  state => ({
    initialValues: {
      title:state.challengeReducer.selectedChallenge.title,
      startingDate: moment(
        new Date(state.challengeReducer.selectedChallenge.startingDate),
      ).format('YYYY-MM-DDTHH:mm'),
      finalDate: moment(
        new Date(state.challengeReducer.selectedChallenge.finalDate),
      ).format('YYYY-MM-DDTHH:mm'),
      type: state.challengeReducer.selectedChallenge.type
        ? state.challengeReducer.selectedChallenge.type.id
        : null,
      zipcode:state.challengeReducer.selectedChallenge.zipcode
      ? state.challengeReducer.selectedChallenge.zipcode.id
      : null,
      coupons:state.challengeReducer.selectedChallenge.coupons
      ? state.challengeReducer.selectedChallenge.coupons.map(item => item.id)
      : null,
      winnersCoupon:state.challengeReducer.selectedChallenge.winnersCoupon,
      doubloonsReward:state.challengeReducer.selectedChallenge.doubloonsReward,
      winners:state.challengeReducer.selectedChallenge.winners,
      prizes:state.challengeReducer.selectedChallenge.prizes
      ? state.challengeReducer.selectedChallenge.prizes.map(item => item.id)
      : null,
      winnersPrize: state.challengeReducer.selectedChallenge.winnersPrize,    
      coinsReward:state.challengeReducer.selectedChallenge.coinsReward,
      shareDoubloons:state.challengeReducer.selectedChallenge.shareDoubloons,
      firstPlaces:state.challengeReducer.selectedChallenge.firstPlaces,
      secondPlaces:state.challengeReducer.selectedChallenge.secondPlaces,
      thirdPlaces:state.challengeReducer.selectedChallenge.thirdPlaces,
      finalPercentage:state.challengeReducer.selectedChallenge.finalPercentage,
      specialHint:state.challengeReducer.selectedChallenge.specialHint,
      mapPoints:(state.challengeReducer.selectedChallenge.mapPoints && state.challengeReducer.selectedChallenge.mapPoints.length!==0 )
      ? state.challengeReducer.selectedChallenge.mapPoints.map(item => ({...item, trivias:item.trivias.map(t => t.id ), ratio:item.ratio.mile}))
      : [...Array(AMOUNT_POINT).keys()].map( n =>({hint: "", latitude: null, longitude: null, order: n+1, ratio: null, trivias:[],})),        
    },
    typeChallenge: selector(state, 'type'),
    startingDate: selector( state, 'startingDate'),
  }),
  { change, submit, show },
)(ChallengeDetail);

export default withStyles(styles)(ChallengeDetail);