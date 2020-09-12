import React from 'react';

import Navbar from './components/Navbar';
import Landing from './components/Landing';

import './styles/styles.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Landing />
      {/*Categories/Products Display*/}
    </div>
  );
}

export default App;
