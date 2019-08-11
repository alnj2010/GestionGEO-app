import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import * as moment from 'moment';
import { object, func, string, bool } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
} from '@material-ui/core';
import {
  Form,
  reduxForm,
  change,
  submit,
  formValueSelector
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
    smallIcon: {
      width: '36.5%',
      height: '36.5%',
      cursor: 'pointer',
    },
    largeIcon: {
      width: '70%',
      height: '70%',
      cursor: 'pointer',
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
    avatarPhoto: {
      width: '50%',
      height: '50%',
      cursor: 'pointer',
    },
    fileInput: {
      display: 'none',
    },
    photo: {
      width: '100%',
      height: '100%',
      cursor: 'pointer',
    },
    date: { boxSizing: 'content-box', paddingTop: '4%' },
    lastSave: { justifyContent: 'flex-end', display: 'flex' },
    error: {
      color: 'red',
    }
  });

class PrizeDetail extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          func: null,
        };
        // eslint-disable-next-line
        Date.prototype.addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        }   
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
            prizeId,
            pristine,
            submitting,
            valid,
            goBack,
            submit,
            saveAdminNotes,
            handleSavePrize,
            regular,
            categories,
            brands,
            avatar,
            handlePrizeDelete,
            change,
            category
          } = this.props;

          let brandsOption=brands.filter(brand =>brand.brandCategories && brand.brandCategories.some(brandCat=>brandCat.category && brandCat.category.id === category))
                .map(item => ({key:item.name,value:item.id}))
          const { func } = this.state;
          let date=new Date();
          return (
            <React.Fragment>
                <Grid container>
                  <Form onSubmit={handleSubmit(handleSavePrize)} className={classes.form}>
                      
                        <Grid container>
                            <h3> {prizeId ? `Prize: ${prizeId}` : 'New Prize'}</h3>                                                   
                        </Grid>
                        <hr/>
                        <Grid container justify="space-between">
                          <Grid item xs={5}>
                            <RenderFields >{[
                              { label: 'Prize Title', field: 'title', id: 'title', type: 'text'},
                              { label: 'Category Association', field: 'category', id: 'category', type: 'select', options: categories.map(category => { return { key: category.name, value: category.id } }) },
                              { label: 'Brand Association', field: 'brand', id: 'brand', type: 'select', options: brandsOption },
                              { label: 'Starting Date', field: 'initialDate', id: 'initial-date', type: 'datetime-local',minDate:date.addDays(1), },
                              { label: 'Final Date', field: 'finalDate', id: 'final-date', type: 'datetime-local',minDate:date.addDays(1), },
                              { label: 'Prize Apperance', field: 'apperance', id: 'apperance', type: 'label' },
                              { label: 'Regular Menu', field: 'regular', id: 'regular', type: 'checkbox'},
                              { label: 'Reg. Treasure Hunt Challenge', field: 'regTreasure', id: 'treasure-challenge', type: 'switch', disabled:regular, checked:!regular},
                              { label: 'Treasure Hunt Weekly Challenge', field: 'weeklyTreasure', id: 'weekly-treasure-challenge', type: 'switch', disabled:regular, checked:!regular },
                              { label: 'Treasure Hunt Premium Challenge', field: 'premiumTreasure', id: 'premium-treasure-challenge', type: 'switch', disabled:regular, checked:!regular },
                              { label: 'Aditional doubloons for winning the prize', field: 'winningDoubloons', id: 'winningDoubloons', type: 'number',min:0, },
                              { label: 'Adicional doubloons for sharing on FB the winning of the prize', field: 'sharingDoubloons', id: 'sharingDoubloons', type: 'number',min:0, },
                            ]}</RenderFields>                            
                          </Grid>
                            <hr/>
                          <Grid item xs={6}>
                            <RenderFields >{[
                                { field: 'photo', id: 'photo', type: 'file', avatar:avatar, change:change, images: [
                                  {label:' Prize Avatar', classesPhoto:classes.avatarPhoto, classesDefault:classes.smallIcon },
                                  {label:'Prize Image',  classesPhoto:classes.photo, classesDefault:classes.largeIcon }]
                                },        
                                { label: 'Prize Description (Instruction, Only Text)', field: 'description', id: 'description', type: 'text-area', rows:5},
                                { label: 'Internal prize Description (Only internal use)', field: 'internalDescription', id: 'internalDescription', type: 'text-area', rows:5},
                                { label: 'Inventory of Prize', field: 'inventory', id: 'inventory', type: 'number', min:0},
                                { label: 'Prize Value', field: 'value', id: 'value', type: 'number',min:0, },
                            ]}</RenderFields>                           
                          </Grid>                                                   
                        </Grid>
                        
                        
                        <Grid container className={classes.buttonContainer} justify="flex-end">
                          <Grid item xs={6}/>
                          <Grid item xs={2}>
                            <Button variant="contained" onClick={goBack}>
                              Cancel
                            </Button>
                          </Grid>
                          <Grid item xs={2}>
                            {prizeId ? (
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() =>
                                  this.handleDialogShow(
                                    'delete',
                                    handlePrizeDelete,
                                  )
                                }
                              >
                                Delete
                              </Button>
                            ) : null}
                        
                          </Grid>
                          <Grid item xs={2}>
                            <Button variant="contained" className={classes.save} onClick={() => prizeId ? this.handleDialogShow('update', submit) : submit('brand') } disabled={!valid || pristine || submitting} >
                              Save Changes
                            </Button>
                          </Grid>
                        </Grid>
                          
                  </Form>

                  <Grid item xs={12}>
                    {prizeId ? (
                    <AdminNotes onSubmit={saveAdminNotes} parent={this} />
                    ) : (
                    <Fragment>
                        <hr />
                        <h3> Admin Notes will be avaliable after you create a prize</h3>
                    </Fragment>
                    )}
                </Grid>
                </Grid>
                <Dialog handleAgree={func} />
            </React.Fragment> 
            )
      }

}
const prizeValidation = values => {
  const errors = {};

  if(values.photo && values.photo.type!=='image/jpeg' && values.photo.type!=='image/jpg' && values.photo.type!=='image/png' )
    errors.photo='Image mime type must be JPG or PNG'  
  
  if (!values.title) errors.title = 'Title must not be empty';
  if (!values.category) errors.category = 'Category must not be empty';
  if (!values.brand) errors.brand = 'Brand must not be empty';
  if (!values.initialDate || values.initialDate === 'Invalid date')
    errors.initialDate = 'Starting date must not be empty';
    
  if (!values.finalDate || values.initialDate === 'Invalid date')
    errors.finalDate = 'Final date must not be empty';
  else if (new Date(values.finalDate) < new Date(values.initialDate))
    errors.finalDate = 'Pick date-time greater than the initial date';
    if (
      !values.regular &&
      !values.regTreasure &&
      !values.weeklyTreasure &&
      !values.premiumTreasure
    )
      errors.apperance = 'At least one apperance must be selected';
    
    if (!values.winningDoubloons) errors.winningDoubloons = 'Doubloons must not be empty';
    else if (!/(?=[0-9])/.test(values.winningDoubloons))
      errors.winningDoubloons = 'Doubloons must only contain numbers';
    
    if (!values.sharingDoubloons) errors.sharingDoubloons = 'Doubloons must not be empty';
    else if (!/(?=[0-9])/.test(values.sharingDoubloons))
        errors.sharingDoubloons = 'Doubloons must only contain numbers';
      
    if (!values.description) errors.description = 'Description must not be empty';

    if (!values.inventory) errors.inventory = 'Inventory must not be empty';
    else if (!/(?=[0-9])/.test(values.inventory))
          errors.inventory = 'Inventory must only contain numbers';
      
    if (!values.value) errors.value = 'Value must not be empty';
    else if (!/(?=[0-9])/.test(values.value))
      errors.value = 'Value must only contain numbers';


  return errors;
};

PrizeDetail.propTypes = {
  classes: object.isRequired,
  handleSubmit: func.isRequired,
  handleSavePrize: func.isRequired,
  playerId: string,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
  goBack: func.isRequired,
};

PrizeDetail = reduxForm({
  form: 'prize',
  validate: prizeValidation,
  enableReinitialize: true,
  touchOnChange: true,
  touchOnBlur: true
})(PrizeDetail);
const selector = formValueSelector('prize') 
PrizeDetail = connect(
  state => ({
    initialValues: {
      title: state.prizeReducer.selectedPrize.title,
      
      category: state.prizeReducer.selectedPrize.category
        ? state.prizeReducer.selectedPrize.category.id
        : null,
      
      brand: state.prizeReducer.selectedPrize.brand
        ? state.prizeReducer.selectedPrize.brand.id
        : null,
      
      initialDate: moment(
          new Date(state.prizeReducer.selectedPrize.initialDate),
        ).format('YYYY-MM-DDTHH:mm'),
      
      finalDate: moment(
          new Date(state.prizeReducer.selectedPrize.finalDate),
        ).format('YYYY-MM-DDTHH:mm'),
      
        regular: state.prizeReducer.selectedPrize.regular,
      
        regTreasure: state.prizeReducer.selectedPrize.regular ? false : 
          (state.prizeReducer.selectedPrize.challengeTypes ? 
              state.prizeReducer.selectedPrize.challengeTypes.some( item => item.type==="Regular Challenge" ) :false),
      
        weeklyTreasure: state.prizeReducer.selectedPrize.regular ? false : 
        (state.prizeReducer.selectedPrize.challengeTypes ? 
            state.prizeReducer.selectedPrize.challengeTypes.some( item => item.type==="Weekly Challenge" ) :false),
      
        premiumTreasure: state.prizeReducer.selectedPrize.regular ? false : 
        (state.prizeReducer.selectedPrize.challengeTypes ? 
            state.prizeReducer.selectedPrize.challengeTypes.some( item => item.type==="Premium Challenge" ) :false),
      
        winningDoubloons: state.prizeReducer.selectedPrize.winningDoubloons
          ? `${state.prizeReducer.selectedPrize.winningDoubloons}`
          : null,
      
        sharingDoubloons: state.prizeReducer.selectedPrize.sharingDoubloons
          ? `${state.prizeReducer.selectedPrize.sharingDoubloons}`
          : null,
      
        description: state.prizeReducer.selectedPrize.description,

        internalDescription: state.prizeReducer.selectedPrize.internalDescription,

        inventory: state.prizeReducer.selectedPrize.inventory
          ? `${state.prizeReducer.selectedPrize.inventory}`
          : null,

        value: state.prizeReducer.selectedPrize.value
          ? `${state.prizeReducer.selectedPrize.value}`
          : null,
        
        avatar: state.prizeReducer.selectedPrize.avatar,
    },
    regular: selector(state, 'regular'),
    avatar: selector(state, 'avatar'),
    category: selector(state, 'category'),

  }),
  { change, submit, show },
)(PrizeDetail);

export default withStyles(styles)(PrizeDetail);