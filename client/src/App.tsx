import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/Home"
import RegisterPage from "./pages/Register";
import LoginPage from './pages/Login';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <HomePage/> }/>
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;