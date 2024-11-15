import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Plan from './components/Plan';
import Progress from './components/Progress';

function App() {
  return (
    <Router>
      <div id="app-container" className="app-container">
        <h1>Welcome to The Health Platform</h1>
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/progress" element={<Progress />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
