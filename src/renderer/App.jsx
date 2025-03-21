// import './App.css';
import './App.css'
import React, {useEffect, useState} from 'react';
import { MemoryRouter as Router, Routes, Route, Link, Switch, useNavigate } from 'react-router-dom';

import Parse from 'parse'
import axios from 'axios'

import { Provider } from "react-redux";
import {store, persistor} from "../redux/store";
import { PersistGate } from 'redux-persist/integration/react'

// PAGES
import Login from './login';
import Register from './register';
import UserHome from './user_platform/home';
import UserChapter from './user_platform/chapter'
import UserLeaderBoard from './user_platform/leader_board'
import AdminPanel from './admin_platform'



try {
  console.log(process.env.REACT_PARSE_APP_ID)
  Parse.initialize(process.env.REACT_PARSE_APP_ID, null, process.env.REACT_PARSE_JS_KEY);
  Parse.serverURL = process.env.REACT_PARSE_SERVER_URL    
  Parse.masterKey = process.env.REACT_PARSE_MASTER_KEY
  Parse.javaScriptKey = process.env.REACT_PARSE_JS_KEY
  
  // Parse.CoreManager.setStorageController(Parse.IndexedDB);
  
} catch (error) {
  console.log(error)
}


export default function App() {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route exact path="/user/home" element={<UserHome />} />
              <Route exact path="/user/leader_board" element={<UserLeaderBoard />} />
              <Route exact path="/user/lesson/:id" element={<UserChapter />} />
              <Route exact path="/admin_panel" element={<AdminPanel />} />
            </Routes>
          </Router>
        </PersistGate>
    </Provider>
    
  );
}
