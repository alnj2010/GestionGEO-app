import React, {Component} from 'react'
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import ChallengeDetail from '../../components/Challenges/detail';
import { 
  findChallengeById, 
  updateChallenge, 
  saveChallenge, 
  cleanSelectedChallenge,
  deleteChallenge,
  updateSpecialHint, } from '../../actions/challenge';
import {define, cleanDialog } from '../../actions/dialog';
import { getList as getChallengeTypeList } from '../../actions/challengeType';
import { getList as getCouponList } from '../../actions/coupon';
import { getList as getPrizeList } from '../../actions/prize';
import { getList as getZipcodeList } from '../../actions/zipcode';
import { getList as getMileList } from '../../actions/mile';
import { getTriviaList } from '../../actions/minigame';

export class ChallengeDetailContainer extends Component {

    componentDidMount = () => {
      const {
        match,
         findChallengeById,
         define,
      } = this.props;
      this.getList()
      if (match.params.id) findChallengeById(match.params.id)
      define('challenge');
    };

    componentWillUnmount = () => {
      this.props.cleanSelectedChallenge()
      this.props.cleanDialog();
    };

    getList(){
      const {
         getChallengeTypeList,
         getCouponList,
         getPrizeList,
         getZipcodeList,
         getMileList,
         getTriviaList
      } = this.props;
      getChallengeTypeList()
      getCouponList()
      getPrizeList()
      getZipcodeList()
      getMileList()
      getTriviaList()  
    }
    
    handleSaveChallenge = values => {
      const {
        history,
        match,
        findChallengeById,
        updateChallenge,
        saveChallenge,
      } = this.props;

      if (match.params.id)
        updateChallenge({ ...values, ...match.params }).then(res => {
          if (res) findChallengeById(match.params.id);
        });
      else
        saveChallenge({ ...values }).then(response => {
          if (response) {
            findChallengeById(response).then(res =>
              history.push(`edit/${response}`),
            );
          }
        });
    };


    goBack = () => {
      const { history } = this.props;
      history.goBack();
    };

    handleChallengeDelete = () => {
      const { deleteChallenge, history, match } = this.props;
      deleteChallenge(match.params.id).then(res => history.push('/challenges/list'));
    };
    saveSpecialHint = values => {
      const { match, updateSpecialHint } = this.props;
      updateSpecialHint({ ...values, id: match.params.id });
    };
    
  
    render() {
      const { 
        challenge: { id, startingDate,finalDate },
        challengeTypes,
        coupons,
        prizes,
        zipcodes,
        trivias,
        miles
      } = this.props;
      return ( 
        <ChallengeDetail
          miles={miles}
          trivias={trivias}
          coupons={coupons}
          initialDate={startingDate}
          finalDate={finalDate}
          prizes={prizes}
          zipcodes={zipcodes}
          handleChallengeDelete={this.handleChallengeDelete}
          challengeId={id} 
          goBack={this.goBack}
          handleSaveChallenge={this.handleSaveChallenge}
          challengeTypes={challengeTypes}
          saveSpecialHint={this.saveSpecialHint}
          />
      );
    }
  }
  
  ChallengeDetailContainer.propTypes = {
    history: object.isRequired,
    match: object.isRequired,
    findChallengeById: func.isRequired,
    updateChallenge: func.isRequired,
    saveChallenge: func.isRequired,
    deleteChallenge: func.isRequired,
  };
  
  const mS = state => ({
    challenge: state.challengeReducer.selectedChallenge,
    challengeTypes: state.challengeTypeReducer.list,
    coupons: state.couponReducer.list,
    prizes: state.prizeReducer.list,
    zipcodes: state.zipcodeReducer.list,
    trivias: state.minigameReducer.list,
    miles: state.mileReducer.list,
  });
  
  const mD = {
    findChallengeById,
    cleanDialog,
    saveChallenge,
    updateChallenge,
    cleanSelectedChallenge,
    deleteChallenge,
    define,
    getChallengeTypeList,
    getCouponList,
    getPrizeList,
    getZipcodeList,
    getMileList,
    getTriviaList,
    updateSpecialHint
  };
  
  ChallengeDetailContainer = connect(
    mS,
    mD,
  )(ChallengeDetailContainer);
  
  export default ChallengeDetailContainer;