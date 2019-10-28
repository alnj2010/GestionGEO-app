import React,{ Component } from 'react';
import StudentHomeContainer from '../../containers/Home/student'
import TeacherHomeContainer from '../../containers/Home/teacher'
import AdminHomeContainer from '../../containers/Home/admin'

class Home extends Component {
  render(){
    const rol = sessionStorage.getItem('rol');

    switch(rol){
      case 'A': return <AdminHomeContainer/>; break;
      case 'T': return <TeacherHomeContainer/>; break;
      case 'S': return <StudentHomeContainer/>; break;
      default: return null;
    }
    
  };
}

Home.propTypes = {};

export default Home;
