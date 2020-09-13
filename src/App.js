import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import CheckoutPage from './components/Checkout';

import { auth } from './config/firebase';
import { useStateValue } from './StateProvider';

import './styles/styles.css'

const promise = loadStripe('pk_test_NwFtJV1WamXhyTAeuU5WThTW');

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
          <Route path="/checkout">
            <Elements stripe={promise}>
              <CheckoutPage />
            </Elements>
          </Route>
        </Switch>
        <Sidebar open={sidebarOpen} setSidebar={setSidebarOpen} />
        {/*Categories/Products Display*/}
      </div>
    </Router>
  );
}

export default App;
