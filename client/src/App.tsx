import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/Home"
import RegisterPage from "./pages/Register";
import LoginPage from './pages/Login';
import LabViewPage from './pages/LabView';
import ApplyPage from './pages/Apply';
import ApplyListPage from './pages/ApplyList';
import MyApplyListPage from './pages/MyApplyList';
import AddLabPage from './pages/AddLab';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <HomePage/> }/>
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/LabView" element={<LabViewPage />} />
          <Route path="/Apply" element={<ApplyPage />} />
          <Route path="/ApplyList" element={<ApplyListPage />} />
          <Route path="/MyApplyList" element={<MyApplyListPage />} />
          <Route path="/AddLab" element={<AddLabPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;