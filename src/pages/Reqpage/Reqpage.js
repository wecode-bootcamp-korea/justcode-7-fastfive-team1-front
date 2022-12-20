import React, { useState, useEffect } from 'react';
import css from './Reqpage.module.scss';
import SideBar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function App() {
  const [userData, setUserData] = useState();
  const [currUserClass, setCurrUserClass] = useState();
  const [reqData, setReqData] = useState([]);

  useEffect(() => {
    fetch('data/userData.json', {
      headers: {
        authorization: localStorage.getItem('authorization'),
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
    console.log(currUserClass);
    if (currUserClass === 'admin') {
      // fetch('http://localhost:5500/company', {
      fetch('/data/representReqData.json', {
        headers: {
          authorization: localStorage.getItem('authorization'),
        },
      })
        .then(res => res.json())
        .then(data => setReqData(data.companyList));
    }

    if (currUserClass === 'represent') {
      // fetch('http://localhost:5500/company', {
      fetch('/data/memberReqData.json', {
        headers: {
          authorization: localStorage.getItem('authorization'),
        },
      })
        .then(res => res.json())
        .then(data => setReqData(data.memberList));
    }
  }, [currUserClass]);

  const clickMemberSubmitBtn = () => {
    fetch('http://localhost:5500/member', {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('authorization'),
      },
    });
  };

  const clickMemberRefuseBtn = () => {
    fetch('http://localhost:5500/member', {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem('authorization'),
      },
    });
  };

  const clickRepresentSubmitBtn = () => {
    fetch('http://localhost:5500/approve', {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('authorization'),
      },
    });
  };

  const clickRepresentRefuseBtn = () => {
    fetch('http://localhost:5500/approve', {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem('authorization'),
      },
    });
  };

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
              {reqData.map(elem => (
                <div className={css.memberReqMainElem} key={elem.id}>
                  <div>{elem.usersId}</div>
                  <div>{elem.username}</div>
                  <div>{elem.email}</div>
                  <div className={`${css.reqBtnDiv}`}>
                    <button
                      className={`${css.reqBtn}`}
                      onClick={clickMemberSubmitBtn}
                    >
                      수락
                    </button>
                    <button
                      className={`${css.reqBtn}`}
                      onClick={clickMemberRefuseBtn}
                    >
                      거절
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currUserClass === 'admin' && (
          <div className={css.representReqMain}>
            <div className={css.title}>회사 대표 요청</div>
            <div className={css.representReqMainElemDiv}>
              {reqData.map(elem => (
                <div className={css.representReqMainElem} key={elem.id}>
                  <div>{elem.usersId}</div>
                  <div>{elem.companyName}</div>
                  <div>{elem.startDate}</div>
                  <div>{elem.endDate}</div>
                  <div className={`${css.reqBtnDiv}`}>
                    <button
                      className={`${css.reqBtn}`}
                      onClick={clickRepresentSubmitBtn}
                    >
                      수락
                    </button>
                    <button
                      className={`${css.reqBtn}`}
                      onClick={clickRepresentRefuseBtn}
                    >
                      거절
                    </button>
                  </div>
                </div>
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
