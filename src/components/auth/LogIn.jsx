import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import * as loginActions from '../../redux/actions/loginActions';
import Validate from '../utility/FormValidation';
import FormErrors from './FormErrors';

function LogIn(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

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
      username, password,
    });
    if (error) {
      setErrors({ ...errors, ...error });
    }

    // AWS Cognito integration here
    try {
      const user = await Auth.signIn(username, password);
      dispatch(loginActions.setAuthStatus(true));
      dispatch(loginActions.setUser(user));
      props.history.push('/board');
    } catch (er) {
      setErrors({ ...errors, cognito: !er.message ? { message: er } : er });
    }
  };

  const handleGuestLogin = async () => {
    try {
      const user = await Auth.signIn('Guest', 'Canada2020!');
      dispatch(loginActions.setAuthStatus(true));
      dispatch(loginActions.setUser(user));
      props.history.push('/board');
    } catch (er) {
      setErrors({ ...errors, cognito: !er.message ? { message: er } : er });
    }
  };


  const onInputChange = (event) => {
    switch (event.target.id) {
      case 'username':
        setUsername(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }

    document.getElementById(event.target.id).classList.remove('is-danger');
  };

  return (
    <section className="section auth">
      <div className="container">
        <h1>Log in</h1>
        <FormErrors formerrors={errors} />

        <form onSubmit={handleSubmit}>
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="text"
                id="username"
                aria-describedby="usernameHelp"
                placeholder="Enter username or email"
                value={username}
                onChange={onInputChange}
              />
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
            <p className="control">
              <a href="/forgotpassword">Forgot password?</a>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button type="submit" className="button is-success">
                Login
              </button>
            </p>
          </div>
        </form>
        <div>OR</div>
        <div><button type="button" onClick={handleGuestLogin}> Continue as Guest</button></div>
      </div>
    </section>
  );
}
LogIn.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default LogIn;
