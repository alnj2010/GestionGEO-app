import React from 'react'
import Text from './Fields/Text'
import Date from './Fields/Date'
import Time from './Fields/Time'
import Select from './Fields/Select'
import Phone from './Fields/Phone'
import Number from './Fields/Number'
import Switch from './Fields/Switch'

import { Grid } from '@material-ui/core';

class RenderFields extends React.Component{

    render(){
      const { children,lineal }=this.props
      const totalFields=children.length;
      let movil=12
      let desktop=!lineal?5:Math.floor(12/totalFields)
      return children.map((input,index) => {
        switch(input.type){

          case 'text': return <Grid key={index} item xs={movil} sm={desktop}> <Text {...input} /></Grid>
          case 'select': return <Grid key={index} item xs={movil} sm={totalFields>1 ? desktop :12} style={{paddingTop:16}} ><Select {...input} /></Grid>
          case 'phone': return <Grid key={index} item xs={movil} sm={desktop} style={{paddingTop:16}}><Phone {...input} /></Grid>
          case 'number': return <Grid key={index} item xs={movil} sm={desktop}> <Number {...input} /></Grid>
          case 'date': return <Grid key={index} item xs={movil} sm={desktop}> <Date {...input} /></Grid>
          case 'time': return <Grid key={index} item xs={movil} sm={desktop} style={{paddingTop:16}}> <Time {...input} /></Grid>
          case 'switch': return <Grid key={index} item xs={movil} sm={desktop}> <Switch {...input} /></Grid>

          default: return <div key={index} >No esta creado</div>
        }
      });
    }

}

export default RenderFields;