import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Register from './components/auth/Register';
import Welcome from './components/auth/Welcome';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import configureStore from './redux/store/configureStore';
import LogIn from './components/auth/LogIn';

const store = configureStore();

const App = () => (
  <div>
    <ReduxProvider store={store}>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/forgotpasswordverification" component={ForgotPasswordVerification} />
            <Route exact path="/changepassword" component={ChangePassword} />
            <Route exact path="/changepasswordconfirmation" component={ChangePasswordConfirm} />
          </Switch>
        </div>
      </Router>
    </ReduxProvider>
  </div>
);

export default App;
