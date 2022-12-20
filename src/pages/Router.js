import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import PostDetail from '../pages/PostDetail/PostDetail';
import WritePost from './WritePost/WritePost';
import CompanyList from './CompanyList/CompanyList';
import Zendesk from './Zendesk/Zendesk';
import Reqpage from './Reqpage/Reqpage';
import CategoryList from './CompanyList/CategoryList';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postdetail" element={<PostDetail />} />
        <Route path="/postdetail/:page" element={<PostDetail />} />
        <Route path="/writePost" element={<WritePost />} />
        <Route path="/zendesk" element={<Zendesk />} />
        <Route path="/reqpage" element={<Reqpage />} />
        <Route path="/companyList" element={<CompanyList />} />
        <Route path="/categoryList" element={<CategoryList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
