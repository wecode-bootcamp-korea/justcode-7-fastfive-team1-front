import React from 'react';
import SideBar from '../../components/Sidebar/Sidebar';
import OwnerReq from '../../components/RequestPage/OwnerReqComponent';
import MemberReq from '../../components/RequestPage/MemberReqComponent';
import Setting from '../../components/RequestPage/Setting';
import Header from '../../components/Header/Header';
import css from './RequestPage.module.scss';

function App() {
  return (
    <div className={css.requestPage}>
      <Header />
      <div className={css.main}>
        <SideBar />
        <div className={css.reqAndSetting}>
          {true ? <OwnerReq /> : <MemberReq />}
          <Setting />
        </div>
      </div>
    </div>
  );
}

export default App;
