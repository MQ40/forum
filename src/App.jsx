import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import CreatePost from "./components/CreatePost";
import Detail from "./components/Detail";
import Home from "./pages/Home";
import Edit from "./components/Edit";

import './App.css'

function App() {
  //search post navbar
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <Navbar setSearchQuery={setSearchQuery}/>
      <Routes>  
        <Route path="/" element={<Home searchQuery={searchQuery}/>} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:id" element={<Detail />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;