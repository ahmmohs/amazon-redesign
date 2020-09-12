import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Login';

import './styles/styles.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
