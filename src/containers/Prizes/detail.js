import React, {Component} from 'react'
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import PrizeDetail from '../../components/Prizes/detail';
import { findPrizeById, updatePrize, savePrize, updateAdminNotes, cleanSelectedPrize, deletePrize } from '../../actions/prize';
import { define,cleanDialog } from '../../actions/dialog';
import { getFullList as getBrandList } from '../../actions/brand';
import { getList as getCategoryList } from '../../actions/category';
import { getList as getChallengeTypeList } from '../../actions/challengeType';

export class PrizeDetailContainer extends Component {

    componentDidMount = () => {
        const {
          match,
          findPrizeById,
          getCategoryList,
          getChallengeTypeList,
          getBrandList,
          define,
        } = this.props;
        
        getCategoryList();
        getBrandList();
        getChallengeTypeList();
        if (match.params.id) findPrizeById(match.params.id);
          define('prize');
    };

    componentWillUnmount = () => {
      this.props.cleanSelectedPrize()
      this.props.cleanDialog();
    };
  
    handleSavePrize = values => {
      const {
        history,
        match,
        findPrizeById,
        updatePrize,
        savePrize,
        challengeTypes,
      } = this.props;

      values.challengeTypes=challengeTypes
        .filter((item => (item.type==="Regular Challenge" && values.regTreasure && !values.regular ) || 
               (item.type==="Weekly Challenge" && values.weeklyTreasure  && !values.regular ) ||
               (item.type==="Premium Challenge" && values.premiumTreasure  && !values.regular)) );                                          

      if (match.params.id)
        updatePrize({ ...values, ...match.params}).then(res => {
          if (res) findPrizeById(match.params.id);
        });
      else
        savePrize({ ...values}).then(response => {
          if (response) {
            findPrizeById(response).then(res =>
              history.push(`edit/${response}`),
            );
          }
        });
    };
    saveAdminNotes = values => {
      const { match, updateAdminNotes } = this.props;
      updateAdminNotes({ ...values, id: match.params.id });
    };   

    goBack = () => {
      const { history } = this.props;
      history.goBack();
    };

    handlePrizeDelete = () => {
      const { deletePrize, history, match } = this.props;
      deletePrize(match.params.id).then(res => history.push('/prizes'));
    };
  
    render() {
      const { 
        prize: { id },
        categories,
        brands
      } = this.props;

      return ( 
        <PrizeDetail 
          prizeId={id} 
          goBack={this.goBack}
          handleSavePrize={this.handleSavePrize}
          saveAdminNotes={this.saveAdminNotes}
          categories={categories}
          brands={brands}
          handlePrizeDelete={this.handlePrizeDelete}
          />
      );
    }
  }
  
  PrizeDetailContainer.propTypes = {
    history: object.isRequired,
    match: object.isRequired,
    findPrizeById: func.isRequired,
    updatePrize: func.isRequired,
    savePrize: func.isRequired,
    deletePrize: func.isRequired,
  };
  const mS = state => ({
    prize: state.prizeReducer.selectedPrize,
    categories: state.categoryReducer.list,
    brands: state.brandReducer.list,
    challengeTypes: state.challengeTypeReducer.list,
  });
  
  const mD = {
    findPrizeById,
    cleanDialog,
    savePrize,
    updatePrize,
    updateAdminNotes,
    cleanSelectedPrize,
    define,
    getCategoryList,
    getBrandList,
    getChallengeTypeList,
    deletePrize
  };
  
  PrizeDetailContainer = connect(
    mS,
    mD,
  )(PrizeDetailContainer);
  
  export default PrizeDetailContainer;