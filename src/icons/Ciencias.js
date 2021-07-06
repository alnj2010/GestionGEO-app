import React from 'react';
import PropTypes from 'prop-types';

function CienciasLogo({ size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <defs>
        <pattern id="a" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 239 239">
          <image
            width="239"
            height="239"
            xlinkHref="data:image/jpeg;base64,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"
          />
        </pattern>
      </defs>
      <rect width={size} height={size} rx="5" fill="url(#a)" />
    </svg>
  );
}

CienciasLogo.propTypes = {
  size: PropTypes.number,
};
CienciasLogo.defaultProps = {
  size: 21,
};

export default CienciasLogo;
