
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import Validate from '../utility/FormValidation';
import FormErrors from './FormErrors';

import '../../App.css';


const Register = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form validation
    clearErrorState();
    const error = Validate(event, {
      username, email, password, confirmPassword,
    });
    if (error) {
      setErrors({ ...errors, ...error });
    }

    // AWS Cognito integration
    try {
      // const signUpResponse =
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      props.history.push('/welcome');
      // console.log(signUpResponse);
    } catch (er) {
      setErrors({ ...errors, cognito: !er.message ? { message: er } : er });
    }
  };


  const onInputChange = (event) => {
    switch (event.target.id) {
      case 'username':
        setUsername(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(event.target.value);
        break;
      default:
        break;
    }

    document.getElementById(event.target.id).classList.remove('is-danger');
  };

  return (
    <section className="section auth">
      <div className="container">
        <h1>Register</h1>
        <FormErrors formerrors={errors} />
        <form onSubmit={handleSubmit}>
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="text"
                id="username"
                aria-describedby="userNameHelp"
                placeholder="Enter username"
                value={username}
                onChange={onInputChange}
              />
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
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
                className="input"
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={onInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={onInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button type="submit" className="button is-info">
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
Register.defaultProps = {
  history: {},
};
Register.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};
export default Register;
