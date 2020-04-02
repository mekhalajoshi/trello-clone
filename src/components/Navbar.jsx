import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import { Auth } from 'aws-amplify';


function Navbar() {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const user = useSelector((state) => state.login.user);
  console.log('Navbar');
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="public/trello_blue_logo.png" width="30" height="28" alt="trello-clone logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/welcome" className="navbar-item">
              Welcome
            </Link>
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

                {/* {this.props.auth.isAuthenticated && (
                  <a href="/" onClick={this.handleLogOut} className="button is-light">
                    Log out
                  </a>
                )} */}
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


// export default class Navbar extends Component {
//   handleLogOut = async event => {
//     event.preventDefault();
//     try {
//       Auth.signOut();
//       this.props.auth.setAuthStatus(false);
//       this.props.auth.setUser(null);
//     }catch(error) {
//       console.log(error.message);
//     }
//   }
//   render() {
//     return (
//       <nav className="navbar" role="navigation" aria-label="main navigation">
//         <div className="navbar-brand">
//           <a className="navbar-item" href="/">
//             <img src="hexal-logo.png" width="112" height="28" alt="hexal logo" />
//           </a>
//         </div>

//         <div id="navbarBasicExample" className="navbar-menu">
//           <div className="navbar-start">
//             <a href="/" className="navbar-item">
//               Home
//             </a>
//             <a href="/products" className="navbar-item">
//               Products
//             </a>
//             <a href="/admin" className="navbar-item">
//               Admin
//             </a>
//           </div>

//           <div className="navbar-end">
//             <div className="navbar-item">
//               {this.props.auth.isAuthenticated && this.props.auth.user && (
//                 <p>
//                   Hello
//                   {' '}
//                   {this.props.auth.user.username}
//                 </p>
//               )}
//               <div className="buttons">
//                 {!this.props.auth.isAuthenticated && (
//                   <div>
//                     <a href="/register" className="button is-primary">
//                       <strong>Register</strong>
//                     </a>
//                     <a href="/login" className="button is-light">
//                       Log in
//                     </a>
//                   </div>
//                 )}
//                 {this.props.auth.isAuthenticated && (
//                   <a href="/" onClick={this.handleLogOut} className="button is-light">
//                     Log out
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     );
//   }
// }
