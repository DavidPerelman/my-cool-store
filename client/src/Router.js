import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const Router = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/:status/:userName' element={<Home />} />
      </Routes>
    </div>
  );
};

export default Router;
