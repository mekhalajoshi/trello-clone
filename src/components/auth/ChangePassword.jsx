import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import Validate from '../utility/FormValidation';
import FormErrors from './FormErrors';
import '../../App.css';

function ChangePassword(props) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
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
      oldPassword, newPassword, confirmPassword,
    });
    if (error) {
      setErrors({ ...errors, ...error });
    }

    // AWS Cognito integration
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        user,
        oldPassword,
        newPassword,
      );
      props.history.push('/changepasswordconfirmation');
    } catch (er) {
      setErrors({ ...errors, cognito: !er.message ? { message: er } : er });
    }
  };

  const onInputChange = (event) => {
    switch (event.target.id) {
      case 'oldPassword':
        setOldPassword(event.target.value);
        break;
      case 'newPassword':
        setNewPassword(event.target.value);
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
        <h1>Change Password</h1>
        <FormErrors formerrors={errors} />

        <form onSubmit={handleSubmit}>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                id="oldpassword"
                placeholder="Old password"
                value={oldPassword}
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
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                id="confirmpassword"
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
              <a href="/forgotpassword">Forgot password?</a>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button type="submit" className="button is-success">
                Change password
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

ChangePassword.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default ChangePassword;
