import React, {Component} from 'react'
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import ZipcodeDetail from '../../components/Zipcodes/detail';
import { findZipcodeById, updateZipcode, saveZipcode,updateAdminNotes, cleanSelectedZipcode,deleteZipcode } from '../../actions/zipcode';
import { define,cleanDialog } from '../../actions/dialog';
import { getList as getLocationList } from '../../actions/location';

export class ZipcodeDetailContainer extends Component {

    componentDidMount = () => {
      const {
        match,
         findZipcodeById,
         getLocationList,
         define
      } = this.props;
      getLocationList()  
      if (match.params.id) findZipcodeById(match.params.id)
      define('zipcode');
    };

    componentWillUnmount = () => {
      this.props.cleanSelectedZipcode()
      this.props.cleanDialog();
    };
  
    handleSaveZipcode = values => {
      const {
        history,
        match,
        findZipcodeById,
        updateZipcode,
        saveZipcode,
      } = this.props;
      
      if (match.params.id)
        updateZipcode({ ...values, ...match.params }).then(res => {
          if (res) findZipcodeById(match.params.id);
        });
      else
        saveZipcode({ ...values }).then(response => {
          if (response) {
            findZipcodeById(response).then(res =>
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

    handleZipcodeDelete = () => {
      const { deleteZipcode, history, match } = this.props;
      deleteZipcode(match.params.id).then(res => history.push('/zipcodes'));
    };  
  
    render() {
      const { 
        zipcode: { id },
        locations,
      } = this.props;
      return ( 
        <ZipcodeDetail 
          handleZipcodeDelete={this.handleZipcodeDelete}
          zipcodeId={id}
          locations={locations} 
          goBack={this.goBack}
          handleSaveZipcode={this.handleSaveZipcode}
          saveAdminNotes={this.saveAdminNotes}
          />
      );
    }
  }
  
  ZipcodeDetailContainer.propTypes = {
    history: object.isRequired,
    match: object.isRequired,
    findZipcodeById: func.isRequired,
    updateZipcode: func.isRequired,
    saveZipcode: func.isRequired,
    deleteZipcode: func.isRequired,
  };
  
  const mS = state => ({
    zipcode: state.zipcodeReducer.selectedZipcode,
    locations: state.locationReducer.list,
  });
  
  const mD = {
    findZipcodeById,
    cleanDialog,
    saveZipcode,
    updateZipcode,
    updateAdminNotes,
    cleanSelectedZipcode,
    deleteZipcode,
    getLocationList,
    define
  };
  
  ZipcodeDetailContainer = connect(
    mS,
    mD,
  )(ZipcodeDetailContainer);
  
  export default ZipcodeDetailContainer;