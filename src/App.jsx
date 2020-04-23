import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Board from './components/trello/Board';
import Navbar from './components/Navbar';
import Register from './components/auth/Register';
import SignUpMessage from './components/auth/SignUpMessage';
import LogOutMessage from './components/auth/LogOutMessage';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import configureStore from './redux/store/configureStore';
import LogIn from './components/auth/LogIn';
import initialData from './initial_data';
import Home from './components/Home';

const store = configureStore(initialData);

const App = () => (
  <div>
    <ReduxProvider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/logout" component={LogOutMessage} />
            <Route exact path="/welcome" component={SignUpMessage} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/forgotpasswordverification" component={ForgotPasswordVerification} />
            <Route exact path="/changepassword" component={ChangePassword} />
            <Route exact path="/changepasswordconfirmation" component={ChangePasswordConfirm} />
            <Route exact path="/board" component={Board} />
          </Switch>
        </div>
      </Router>
    </ReduxProvider>
  </div>
);

export default App;
