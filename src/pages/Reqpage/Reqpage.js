import React, { useState, useEffect } from 'react';
import css from './Reqpage.module.scss';
import SideBar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ReqElem from '../../components/ReqPage/ReqElem';

function App() {
  const [userData, setUserData] = useState();
  const [currUserClass, setCurrUserClass] = useState();
  const [reqData, setReqData] = useState([]);

  useEffect(() => {
    // fetch('data/userData.json', {
    fetch(`${process.env.REACT_APP_API_URI}/user`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setUserData(data);

        if (data.userInfo.email === 'admin@gmail.com') {
          setCurrUserClass('admin');
          return;
        }

        if (data.userInfo.company.isCompanyMainMember === 1) {
          setCurrUserClass('represent');
          return;
        }

        if (data.userInfo.company.isCompanyMainMember === 0) {
          setCurrUserClass('nomal');
          return;
        }
      });
  }, []);

  useEffect(() => {
    console.log(currUserClass);
    if (currUserClass === 'admin') {
      fetch(`${process.env.REACT_APP_API_URI}/company-request`, {
        // fetch('/data/representReqData.json', {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
        .then(res => res.json())
        .then(data => setReqData(data.companyList));
    }

    if (currUserClass === 'represent') {
      fetch(`${process.env.REACT_APP_API_URI}/member-request`, {
        // fetch('/data/memberReqData.json', {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
        .then(res => res.json())
        .then(data => setReqData(data.memberList));
    }
  }, [currUserClass]);

  // useEffect(() => {
  //   console.log(reqData);
  // }, [reqData]);

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  return (
    <>
      <Header />
      <div className={css.reqpage}>
        <SideBar />

        {currUserClass === 'nomal' && (
          <div className={css.noPermission}>권한이 없습니다</div>
        )}
        {!currUserClass && (
          <div className={css.noPermission}>권한이 없습니다</div>
        )}

        {currUserClass === 'represent' && (
          <div className={css.memberReqMain}>
            <div className={css.title}>
              {reqData[0] && reqData[0].company.companyName} 멤버 요청
            </div>
            <div className={css.memberReqMainElemDiv}>
              {reqData &&
                reqData.map(reqListElem => (
                  <ReqElem
                    key={reqListElem.id}
                    reqListElem={reqListElem}
                    userData={userData}
                    currUserClass={currUserClass}
                    setReqData={setReqData}
                  />
                ))}
            </div>
          </div>
        )}

        {currUserClass === 'admin' && (
          <div className={css.representReqMain}>
            <div className={css.title}>회사 대표 요청</div>
            <div className={css.representReqMainElemDiv}>
              {reqData &&
                reqData.map(reqListElem => (
                  <ReqElem
                    key={reqListElem.id}
                    reqListElem={reqListElem}
                    userData={userData}
                    currUserClass={currUserClass}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
