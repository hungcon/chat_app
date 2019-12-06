import React from 'react';
import { Route , BrowserRouter as Router , Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Header from './Component/Template/Header';
import Home from './Component/Template/Home';
import SignIn from './Component/Template/SignIn';
import SignUp from './Component/Template/SignUp';
import ConfigInformation from './Component/Template/ConfigInformation';
import MessageHistory from './Component/Template/MessageHistory';
function App() {
    return (
      <Router>
        <Switch >
            <Route path="/" exact component={SignIn} /> 
            <PrivateRoute path="/home" exact component={Home} />
            <PrivateRoute path="/header" exact component={Header} />
            <PrivateRoute path="/config-information" exact component={ConfigInformation} />
            <Route path="/message-history" exact component={MessageHistory} />
            <Route path="/sign-in" exact component={SignIn} /> 
            <Route path="/sign-up" exact component={SignUp} /> 
        </Switch >
      </Router>
    );
  }

export default App;
