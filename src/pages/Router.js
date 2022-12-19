import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import ServeHome from '../components/ServeHome/ServeHome';
import PostDetail from '../pages/PostDetail/PostDetail';
import WritePost from './WritePost/WritePost';
import CompanyList from './CompanyList/CompanyList';
import Reqpage from './Reqpage/Reqpage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<ServeHome />} />
        <Route path="/postdetail" element={<PostDetail />} />
        <Route path="/writePost" element={<WritePost />} />
        <Route path="/companyList:id" element={<CompanyList />} />
        <Route path="/reqpage" element={<Reqpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
