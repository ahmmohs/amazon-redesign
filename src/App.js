import React, { useState } from 'react';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Sidebar from './components/Sidebar/Sidebar';

import './styles/styles.css'
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="App">
      <Navbar setSidebar={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <Landing />
      <Sidebar open={sidebarOpen} setSidebar={setSidebarOpen} />
      {/*Categories/Products Display*/}
    </div>
  );
}

export default App;
