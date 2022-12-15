import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import ServeHome from '../components/ServeHome/ServeHome';
import PostDetail from '../pages/PostDetail/PostDetail';
import WritePost from './WritePost/WritePost';
import RequestPage from './RequestPage/RequestPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<ServeHome />} />
        <Route path="/postdetail" element={<PostDetail />} />
        <Route path="/writepost" element={<WritePost />} />
        <Route path="/requestpage" element={<RequestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
