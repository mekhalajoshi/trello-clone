import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Board from './components/trello/Board';
import Navbar from './components/Navbar';
import Register from './components/auth/Register';
import Welcome from './components/auth/Welcome';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import configureStore from './redux/store/configureStore';
import LogIn from './components/auth/LogIn';
import initialData from './initial_data';

const store = configureStore(initialData);

const App = () => (
  <div>
    <ReduxProvider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Board} />
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
