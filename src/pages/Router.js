import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home/Home';
import WritePost from './WritePost/WritePost';
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writePost" element={<WritePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
