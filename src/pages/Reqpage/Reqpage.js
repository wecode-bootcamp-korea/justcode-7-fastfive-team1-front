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

        if (data.userInfo.company.isCompanyMainMember === 0) {
          setCurrUserClass('nomal');
          return;
        }

        if (data.userInfo.company.isCompanyMainMember === 1) {
          setCurrUserClass('represent');
          return;
        }

        if (data.userInfo.email === 'admin@gmail.com') {
          setCurrUserClass('admin');
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

  return (
    <>
      <Header />
      <div className={css.reqpage}>
        <SideBar />
        <div className={css.main}>
          {reqData.map(elem => (
            <div className={css.reqElem} key={elem.id}>
              <div>{elem.usersId}</div>
              <div>{elem.companyName}</div>
              <div>{elem.startDate}</div>
              <div>{elem.endDate}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
