import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Register from './components/auth/Register';
import Welcome from './components/auth/Welcome';
import configureStore from './redux/store/configureStore';

const store = configureStore();

const App = () => (
  <div>
    <ReduxProvider store={store}>
      <Router>
        <div>
          {/* <Navbar auth={authProps} /> */}
          <Navbar />
          {/* <Switch> */}
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/welcome" component={Welcome} />
          {/* </Switch> */}
          {/* <Footer /> */}
        </div>
      </Router>
    </ReduxProvider>
  </div>
);

export default App;
