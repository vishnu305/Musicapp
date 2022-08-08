import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from './components/Welcome.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Dashboard from './components/Dashboard.js';
import Searchpage from './components/Searchpage.js';
import Favourite from './components/Favourite.js';
import PlayerState from './components/PlayerState.js';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Welcome/>}>
          </Route>
          <Route exact path='/login' element={<Login/>}>
          </Route>
          <Route exact path='/signup' element={<Signup/>}>
          </Route>
          <Route exact path='/dashboard' element={<PlayerState><Dashboard/></PlayerState>}>
          </Route>
          <Route exact path='/dashboard/search' element={<Searchpage/>}>
          </Route>
          <Route exact path='/dashboard/favourite' element={<Favourite/>}>
          </Route>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
