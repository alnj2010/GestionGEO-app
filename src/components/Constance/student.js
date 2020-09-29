import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Download from '@material-ui/icons/GetApp';
import logoConstance from '../../images/constance.png';
import { Constance } from '../../services/constance';

const styles = (theme) => ({
  cardContainer: {
    display: 'flex',
  },
  card: {
    display: 'flex',
    marginRight: 10,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 130,
    marginTop: 21,
    backgroundSize: '51%',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
});

const RenderCardConstance = withStyles(styles, { withTheme: true })(
  ({ classes, title, subtitle, action }) => {
    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {subtitle}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="dowload" onClick={action}>
              <Download />
            </IconButton>
          </div>
        </div>
        <CardMedia className={classes.cover} image={logoConstance} title="constance" />
      </Card>
    );
  }
);

function StudentConstance({ classes, id }) {
  return (
    <div className={classes.cardContainer}>
      <RenderCardConstance
        title="Constancia de estudio"
        subtitle="Constancia de estudio"
        action={() => {
          Constance.getStudyConstance(id);
        }}
      />
      <RenderCardConstance
        title="Constancia de notas"
        subtitle="Constancia de notas"
        action={() => {
          Constance.getStudyHistoricalConstance(id);
        }}
      />
    </div>
  );
}

StudentConstance.propTypes = {
  classes: PropTypes.shape({
    cardContainer: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  id: PropTypes.any.isRequired,
};

export default withStyles(styles, { withTheme: true })(StudentConstance);
