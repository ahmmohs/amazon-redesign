import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import CheckoutPage from './components/Checkout';
import Orders from './components/Orders';

import { auth } from './utils/firebase';
import { useStateValue } from './StateProvider';

import './styles/styles.css'
import MobileFooter from './components/MobileFooter';

const promise = loadStripe('pk_test_NwFtJV1WamXhyTAeuU5WThTW');

function App () {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const wrapper = useRef();
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
      <div className="App" ref={wrapper}>
        <Navbar setSidebar={setSidebarOpen} sidebarOpen={sidebarOpen} wrapper={wrapper} />
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
          <Route path="/orders">
            <Orders />
          </Route>
        </Switch>
        <Sidebar open={sidebarOpen} setSidebar={setSidebarOpen} />
        {/*Categories/Products Display*/}
        <MobileFooter />
      </div>
    </Router>
  );
}

export default App;
