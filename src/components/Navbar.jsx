import React from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as loginActions from '../redux/actions/loginActions';
import logo from '../images/trello_blue_logo.png';
import '../App.css';

function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const user = useSelector((state) => state.login.user);
  const history = useHistory();

  const handleLogOut = async (event) => {
    console.log('----------handleLogout----------');
    event.preventDefault();
    try {
      const u = await Auth.signOut();
      console.log(u);
      dispatch(loginActions.setAuthStatus(false));
      dispatch(loginActions.setUser(null));
      history.push('/logout');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={logo} alt="trello-clone logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home!
            </Link>
            {isAuthenticated && (
              <Link to="/board" className="navbar-item">
                Board
              </Link>
            )}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {isAuthenticated && user && (
                <p>
                  Hello
                  {' '}
                  {user.username}
                </p>
              )}
              <div className="buttons">
                {!isAuthenticated && (
                <div>
                  <Link to="/register" className="button is-info">
                    <strong>Register</strong>
                  </Link>
                  <Link to="/login" className="button is-light">
                    Log in
                  </Link>
                </div>
                )}

                {isAuthenticated && (
                <button type="submit" onClick={handleLogOut} className="button is-light">
                  Log out
                </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}


Link.propTypes = {
  to: PropTypes.string.isRequired,
};


export default Navbar;
