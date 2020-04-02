import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import Validate from '../utility/FormValidation';
import FormErrors from '../FormErrors';
import '../../App.css';

function ForgotPassword(props) {
  const [email, setEmail] = useState('');
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

  const forgotPasswordHandler = async (event) => {
    event.preventDefault();

    // Form validation
    clearErrorState();
    const error = Validate(event, {
      email,
    });
    if (error) {
      setErrors({ ...errors, ...error });
    }
    // AWS Cognito integration
    try {
      await Auth.forgotPassword(email);
      props.history.push('/forgotpasswordverification');
    } catch (err) {
      console.log(err);
    }
  };

  const onInputChange = (event) => {
    switch (event.target.id) {
      case 'email':
        setEmail(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <section className="section auth">
      <div className="container">
        <h1>Forgot your password?</h1>
        <p>
          Please enter the email address associated with your account and we&apos;ll
          email you a password reset link.
        </p>
        <FormErrors formerrors={errors} />

        <form onSubmit={forgotPasswordHandler}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                type="email"
                className="input"
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
            <p className="control">
              <a href="/forgotpassword">Forgot password?</a>
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

ForgotPassword.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default ForgotPassword;
