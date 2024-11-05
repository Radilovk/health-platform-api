import React from 'react';
import { Browser, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Plan from './components/Plan';
import Progress from './components/Progress';

function App() {
  return (
    <Browser>
      <div id="app-container" className="app-container">
        <h2>Welcome to The Health Platform</h2>
        <Routes aria-label="Main Routes">
          <Route path="/" element={<Home } />
          <Route path="/profile" element={<Profile } />
          <Route path="/plan" element={< Plan } />
          <Route path="/progress" element={<Progress } />
        </Routes>
      </div>
    </Browser>
  );
}

export default App;
