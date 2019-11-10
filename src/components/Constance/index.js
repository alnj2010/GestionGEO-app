import React,{ Component } from 'react';
import StudentConstanceContainer from '../../containers/Constance/student'
import TeacherConstanceContainer from '../../containers/Constance/teacher'

class Constance extends Component {
  render(){
    const rol = sessionStorage.getItem('rol');

    switch(rol){
      // eslint-disable-next-line
      case 'T': return (<TeacherConstanceContainer/>); break;
      // eslint-disable-next-line
      case 'S': return (<StudentConstanceContainer/>); break;
      default: return null;
    }
    
  };
}

Constance.propTypes = {};

export default Constance;
