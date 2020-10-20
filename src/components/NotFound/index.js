import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const NotFound = ({ history, location }) => (
  <div>
    <h3>
      Ruta no encontrada <code>{location.pathname}</code>
    </h3>
    <button type="button" onClick={history.push}>
      Go back
    </button>
  </div>
);
NotFound.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(NotFound);
