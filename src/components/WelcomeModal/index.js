import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const styles = (theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    maxWidth: 400,

    width: '100%',
  },
  dialog: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  container: {
    display: 'flex',
    height: '100%',
  },
  containerImage: {
    boxSizing: 'boder-box',
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  containerContent: { padding: 30, maxHeight: 316, overflow: 'scroll' },
});

const stylesTutorialSteps = (theme) => ({
  title: { fontSize: 28, fontFamily: 'Roboto', marginBottom: 20, fontWeight: 'bold' },
  descriptionContainer: { fontSize: 17, fontFamily: 'Roboto', lineHeight: '25px' },
  introduction: { fontSize: 16, fontFamily: 'Roboto', display: 'block' },
  section: { marginBottom: 32, fontSize: 16, fontFamily: 'Roboto', display: 'block' },
  listOrderItem: { '&::marker': { fontWeight: 'bold', fontStyle: 'italic' } },
});

function WelcomeModal({
  classes,
  theme,
  fullScreen,
  tutorialSteps,
  open,
  handleCloseWelcomeModal,
}) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const maxSteps = tutorialSteps.length;

  return (
    <Dialog
      onClose={handleCloseWelcomeModal}
      open={open}
      aria-labelledby="simple-dialog-title"
      fullScreen={fullScreen}
      maxWidth="lg"
    >
      <DialogContent className={classes.dialog}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map(({ image, Content }, index) => {
            const ContentStep = withStyles(stylesTutorialSteps)(Content);
            return (
              <div className={classes.container} key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <div className={classes.containerImage}>
                    <img className={classes.img} src={image} alt="step" />
                  </div>
                ) : null}
                <div className={classes.containerContent}>
                  <ContentStep />
                </div>
              </div>
            );
          })}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Siguiente
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Atras
            </Button>
          }
        />
      </DialogContent>
    </Dialog>
  );
}

WelcomeModal.propTypes = {
  classes: PropTypes.shape({
    mobileStepper: PropTypes.string,
    img: PropTypes.string,
    header: PropTypes.string,
    container: PropTypes.string,
    containerImage: PropTypes.string,
    containerContent: PropTypes.string,
  }).isRequired,
  open: PropTypes.bool,
  theme: PropTypes.shape({ direction: PropTypes.string }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
};
WelcomeModal.defaultProps = {
  open: true,
};
export default React.memo(
  withMobileDialog()(withStyles(styles, { withTheme: true })(WelcomeModal))
);
