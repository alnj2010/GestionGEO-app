import React from 'react';
import { Grid } from '@material-ui/core';
import Password from './Fields/Password';
import Text from './Fields/Text';
import Date from './Fields/Date';
import Time from './Fields/Time';
import Select from './Fields/Select';
import Phone from './Fields/Phone';
import Number from './Fields/Number';
import Switch from './Fields/Switch';

function RenderFields(props) {
  const { children, lineal } = props;
  const totalFields = children.length;
  const movil = 12;
  let desktop;
  if (Array.isArray(lineal)) desktop = lineal;
  else desktop = Array(totalFields).fill(lineal ? Math.floor(12 / totalFields) : 5);

  return children.map((input, index) => {
    switch (input.type) {
      case 'text':
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Grid key={index} item xs={movil} sm={desktop[index]}>
            <Text {...input} />
          </Grid>
        );
      case 'password':
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Grid key={index} item xs={movil} sm={desktop[index]}>
            <Password {...input} />
          </Grid>
        );
      case 'select':
        return (
          <Grid
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            item
            xs={movil}
            sm={totalFields > 1 ? desktop[index] : 12}
            style={{ paddingTop: 16 }}
          >
            <Select {...input} />
          </Grid>
        );
      case 'phone':
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Grid key={index} item xs={movil} sm={desktop[index]} style={{ paddingTop: 16 }}>
            <Phone {...input} />
          </Grid>
        );
      case 'number':
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Grid key={index} item xs={movil} sm={desktop[index]}>
            <Number {...input} />
          </Grid>
        );
      case 'date':
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Grid key={index} item xs={movil} sm={desktop[index]}>
            <Date {...input} />
          </Grid>
        );
      case 'time':
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Grid key={index} item xs={movil} sm={desktop[index]} style={{ paddingTop: 16 }}>
            <Time {...input} />
          </Grid>
        );
      case 'switch':
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Grid key={index} item xs={movil} sm={desktop[index]}>
            <Switch {...input} />
          </Grid>
        );

      default:
        return null;
    }
  });
}

export default RenderFields;
