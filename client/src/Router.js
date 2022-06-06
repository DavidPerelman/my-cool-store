import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';

const Router = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />} />
      </Routes>
    </div>
  );
};

export default Router;
