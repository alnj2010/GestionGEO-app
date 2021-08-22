import React from 'react';
import { Grid, Tooltip } from '@material-ui/core';
import Help from '@material-ui/icons/Help';
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
  const fields = children.filter((item) => item.type !== 'hidden');
  return fields.map((input, index) => {
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
            style={{
              paddingTop: 16,
              display: 'flex',
              justifyContent: input.tooltipText && 'center',
              alignItems: input.tooltipText && 'center',
            }}
          >
            <Select {...input} />
            {input.tooltipText && (
              <Tooltip title={input.tooltipText} aria-label="Add" placement="right">
                <Help />
              </Tooltip>
            )}
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
      case 'instruction':
        return (
          <Grid
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            item
            xs={movil}
            sm={totalFields > 1 ? desktop[index] : 12}
          >
            <Grid container>
              <Grid
                item
                xs={3}
                style={{
                  paddingTop: 16,
                  display: 'flex',
                  justifyContent: input.tooltipText && 'center',
                  alignItems: input.tooltipText && 'center',
                }}
              >
                <Select {...input.select} />
                {input.tooltipText && (
                  <Tooltip title={input.tooltipText} aria-label="Add" placement="right">
                    <Help />
                  </Tooltip>
                )}
              </Grid>
              <Grid item xs={9}>
                <Text {...input.text} />
              </Grid>
            </Grid>
          </Grid>
        );
      default:
        // eslint-disable-next-line react/no-array-index-key
        return <Grid key={index} item xs={movil} sm={desktop[index]} />;
    }
  });
}

export default RenderFields;
