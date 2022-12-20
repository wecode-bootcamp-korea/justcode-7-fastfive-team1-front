import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import PostDetail from '../pages/PostDetail/PostDetail';
import WritePost from './WritePost/WritePost';
import CompanyList from './CompanyList/CompanyList';
import Zendesk from './Zendesk/Zendesk';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postdetail" element={<PostDetail />} />
        <Route path="/writePost" element={<WritePost />} />
        <Route path="/companyList:id" element={<CompanyList />} />
        <Route path="/zendesk" element={<Zendesk />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
