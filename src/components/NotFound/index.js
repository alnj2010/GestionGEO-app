import React from 'react';
import { withRouter } from 'react-router-dom';

const NotFound = ({ history, location }) => (
  <div>
    <h3>
      Oops seems you are lost? <code>{location.pathname}</code>
    </h3>
    <button onClick={history.goBack}>Go back</button>
  </div>
);

export default withRouter(NotFound);
