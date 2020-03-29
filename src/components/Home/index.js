import React,{ Component } from 'react';
import StudentHomeContainer from '../../containers/Home/student'
import TeacherHomeContainer from '../../containers/Home/teacher'
import AdminHomeContainer from '../../containers/Home/admin'

class Home extends Component {
  render(){
    const rol = sessionStorage.getItem('rol');

    switch(rol){
      // eslint-disable-next-line
      case 'A': return (<AdminHomeContainer/>); break;
      // eslint-disable-next-line
      case 'T': return (<TeacherHomeContainer/>); break;
      // eslint-disable-next-line
      case 'S': return (<StudentHomeContainer/>); break;
      default: return null;
    }
    
  };
}

Home.propTypes = {};

export default Home;
