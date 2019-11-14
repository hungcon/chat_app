import React from 'react';
import { Route , BrowserRouter as Router , Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './Component/Template/Home';
import SignIn from './Component/Template/SignIn';
import SignUp from './Component/Template/SignUp';
function App() {
    return (
      <Router>
        <Switch >
            <Route path="/" exact component={SignIn} /> 
            <PrivateRoute path="/home" exact component={Home} /> 
            <Route path="/sign-in" exact component={SignIn} /> 
            <Route path="/sign-up" exact component={SignUp} /> 
        </Switch >
      </Router>
    );
  }

export default App;
