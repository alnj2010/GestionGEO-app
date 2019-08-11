import React, { Component } from 'react';
import { connect } from 'react-redux';
import { define, cleanDialog, show } from '../../actions/dialog';
import { array, func } from 'prop-types';
import PrizesList from '../../components/Prizes';
import {getList, deletePrize, cleanSelectedPrize} from '../../actions/prize';

export class PrizesContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount = () => {
      const { getList, define } = this.props;
      getList().then(() => this.setState({ isLoading: false }));
      define('prize')
  };
  componentWillUnmount = () => {
    this.props.cleanSelectedPrize();
    this.props.cleanDialog();
;
  };

  handleDeletePrize = id => {
    const { getList, deletePrize } = this.props;
    deletePrize(id).then(res => getList());
  };

  render() {
    const {
        prizes,
        history,
        show
    }=this.props
    const { isLoading } = this.state;
    return <PrizesList
            history={history} 
            prizes={prizes}
            isLoading={isLoading}
            handleDeletePrize={this.handleDeletePrize}
            show={show}
            />
   
  }
}

PrizesContainer.propTypes = {
    prizes: array,
    deletePrize: func.isRequired,
};

const mS = state => ({
    prizes: state.prizeReducer.list,
   
});

const mD = {
    getList,
    deletePrize,
    cleanDialog,
    show,
    define,
    cleanSelectedPrize
};

const PrizesPage = connect(
  mS,
  mD,
)(PrizesContainer);

export default PrizesPage;
