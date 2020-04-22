import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import Validate from '../utility/FormValidation';
import FormErrors from './FormErrors';

import '../../App.css';

function ForgotPasswordVerification(props) {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const initialErrors = {
    cognito: null,
    blankfield: false,
    passwordmatch: false,
  };
  const [errors, setErrors] = useState(initialErrors);

  const clearErrorState = () => {
    setErrors({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false,
      },
    });
  };

  const passwordVerificationHandler = async (event) => {
    event.preventDefault();

    // Form validation
    clearErrorState();
    const error = Validate(event, {
      email, verificationCode, newPassword,
    });
    if (error) {
      setErrors({ ...errors, ...error });
    }

    // AWS Cognito integration
    try {
      await Auth.forgotPasswordSubmit(
        email,
        verificationCode,
        newPassword,
      );
      props.history.push('/changepasswordconfirmation');
    } catch (err) {
      console.log(err);
    }
  };

  const onInputChange = (event) => {
    switch (event.target.id) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'verificationCode':
        setVerificationCode(event.target.value);
        break;
      case 'newPassword':
        setNewPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <section className="section auth">
      <div className="container">
        <h1>Set new password</h1>
        <p>
          Please enter the verification code sent to your email address below,
          your email address and a new password.
        </p>
        <FormErrors formerrors={errors} />

        <form onSubmit={passwordVerificationHandler}>
          <div className="field">
            <p className="control">
              <input
                type="text"
                className="input"
                id="verificationcode"
                aria-describedby="verificationCodeHelp"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={onInputChange}
              />
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="email"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={onInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                type="password"
                className="input"
                id="newpassword"
                placeholder="New password"
                value={newPassword}
                onChange={onInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button type="submit" className="button is-success">
                Submit
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

ForgotPasswordVerification.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default ForgotPasswordVerification;
