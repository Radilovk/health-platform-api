import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Plan from './components/Plan';
import Progress from './components/Progress';

function App() {
  return (
    <BrowserRouter>
      <div id="app-container" className="app-container">
        <h2>Welcome to The Health Platform</h2>
        <Routes aria-label="Main Routes">
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={Profile } />
          <Route path="/plan" element={Plan } />
          <Route path="/progress" element={Progress } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
