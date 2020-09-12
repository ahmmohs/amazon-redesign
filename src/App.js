import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Login';

import { auth } from './config/firebase';
import { useStateValue } from './StateProvider';

import './styles/styles.css'

function App () {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      let user = null;
      if (authUser) {
        user = authUser;
      }
      dispatch({
        type: 'SET_USER',
        user,
      });
    })
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar setSidebar={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
        <Sidebar open={sidebarOpen} setSidebar={setSidebarOpen} />
        {/*Categories/Products Display*/}
      </div>
    </Router>
  );
}

export default App;
