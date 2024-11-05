import React from 'react';
import { Browser, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Plan from './components/Plan';
import Progress from './components/Progress';

function App() {
  return (
    <Browser>
      <Div id="app-container" className="app-container">
        <H2>Welcome to The Health Platform</H2>
        <Routes.>
          <Route path="/" lement="Home" component={Home} />
          <Route path="/profile" lement="Profile" component={Profile} />
          <Route path="/plan" lement="Plan" component={Plan} />
          <Route path="/progress" lement="Progress" component={Progress} />
        </Routes.>
      </Div>
    </Browser.>
);
}

export default App;