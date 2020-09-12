import React from 'react';
import './styles/styles.css'

import Navbar from './components/Navbar';
import Landing from './components/Landing';

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
