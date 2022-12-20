import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import PostDetail from '../pages/PostDetail/PostDetail';
import WritePost from './WritePost/WritePost';
import CompanyList from './CompanyList/CompanyList';
import Zendesk from './Zendesk/Zendesk';
import Reqpage from './Reqpage/Reqpage';
import CategoryList from './CompanyList/CategoryList';
// import { QueryParamProvider } from 'use-query-params';
// import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
// import { parse, stringify } from 'query-string';
function Router() {
  return (
    <BrowserRouter>
      {/* <QueryParamProvider
      // adapter={ReactRouter6Adapter}
      // options={{
      //   searchStringToObject: parse,
      //   objectToSearchString: stringify,
      // }}
      > */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postdetail" element={<PostDetail />} />
        <Route path="/postdetail/:page" element={<PostDetail />} />
        <Route path="/writePost" element={<WritePost />} />
        <Route path="/zendesk" element={<Zendesk />} />
        <Route path="/reqpage" element={<Reqpage />} />
        <Route path="/companyList" element={<CompanyList />} />
        <Route path="/categoryList" element={<CategoryList />} />
        <Route path="/categoryList/:id" element={<CategoryList />} />
      </Routes>
      {/* </QueryParamProvider> */}
    </BrowserRouter>
  );
}

export default Router;
