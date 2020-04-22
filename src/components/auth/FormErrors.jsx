import React from 'react';
import PropTypes from 'prop-types';

function FormErrors(props) {
  const { formerrors, apierrors } = props;
  if (
    formerrors
    && (formerrors.blankfield || formerrors.passwordmatch)
  ) {
    return (
      <div className="error container help is-danger">
        <div className="row justify-content-center">
          {formerrors.passwordmatch
            ? 'Password value does not match confirm password value'
            : ''}
        </div>
        <div className="row justify-content-center help is-danger">
          {formerrors.blankfield ? 'All fields are required' : ''}
        </div>
      </div>
    );
  } if (apierrors) {
    return (
      <div className="error container help is-danger">
        <div className="row justify-content-center">{apierrors}</div>
      </div>
    );
  } if (formerrors && formerrors.cognito) {
    return (
      <div className="error container help is-danger">
        <div className="row justify-content-center">
          {formerrors.cognito.message}
        </div>
      </div>
    );
  }
  return <div />;
}

FormErrors.defaultProps = {
  formerrors: {},
  apierrors: null,
};

FormErrors.propTypes = {
  formerrors: PropTypes.objectOf(PropTypes.any),
  apierrors: PropTypes.node,
};

export default FormErrors;
