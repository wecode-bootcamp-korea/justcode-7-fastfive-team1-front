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
    fetch('http://localhost:5500/user', {
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

        if (data.userInfo.company.isCompanyMainMember === 0) {
          setCurrUserClass('nomal');
          return;
        }

        if (data.userInfo.company.isCompanyMainMember === 1) {
          setCurrUserClass('represent');
          return;
        }
      });
  }, []);

  useEffect(() => {
    if (currUserClass === 'admin') {
      // fetch('http://localhost:5500/company-request', {
      fetch('/data/representReqData.json', {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
        .then(res => res.json())
        .then(data => {
          setReqData(data.companyList);
        });
    }

    if (currUserClass === 'represent') {
      // fetch('http://localhost:5500/member-request', {
      fetch('/data/memberReqData.json', {
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

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <>
      <Header />
      <div className={css.reqpage}>
        <SideBar />

        {currUserClass === 'nomal' && (
          <div className={css.noPermission}>권한이 없습니다</div>
        )}

        {currUserClass === 'represent' && (
          <div className={css.memberReqMain}>
            <div className={css.title}>
              {reqData[0] && reqData[0].company.companyName} 멤버 요청
            </div>
            <div className={css.memberReqMainElemDiv}>
              {reqData.map(reqListElem => (
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
