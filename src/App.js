import React from 'react';
import { Route, Routes } from "react-router-dom";
import NavBar from './NavBar';
import Home from './Home.js';
import Sundaes from './Sundaes.js';
import Shakes from './Shakes.js';
import Footer from './Footer.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <br/>
      <Routes>
        <Route exact="true" path="/" element={<Home />}/>
          {/* <Home />
        </Route> */}
        <Route path="/sundaes" element={<Sundaes />}/>
          {/* <Sundaes />
        </Route> */}
        <Route path="/shakes" element={<Shakes />}/>
          {/* <Shakes />
        </Route> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
