import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import css from './Sidebar.module.scss';

function SideBar() {
  const [sidebarUserInfo, setsidebarUserInfo] = useState();
  const [sidebarUserGrade, setSidebarUserGrade] = useState();

  useEffect(() => {
    fetch(`http://localhost:5500/user`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setsidebarUserInfo(data.userInfo);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5500/grade`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => setSidebarUserGrade(data.userGradeInfo));
  }, []);

  useEffect(() => {
    console.log(sidebarUserInfo);
    console.log(sidebarUserGrade);
  }, [sidebarUserInfo, sidebarUserGrade]);
  return (
    <div className={css.main}>
      <div className={css.userInfo}>
        {sidebarUserInfo && (
          <div className={css.userInfoCell}>
            유저: {sidebarUserInfo.username}
          </div>
        )}
        {sidebarUserInfo && (
          <div className={css.userInfoCell}>
            소속: {sidebarUserInfo.company.companyName}
            <span>
              {sidebarUserInfo.company.isCompanyMainMember &&
              sidebarUserInfo.company.isCompanyMainMember === 1
                ? ' (대표)'
                : ' (일반)'}
            </span>
          </div>
        )}

        {sidebarUserGrade && (
          <div className={css.userInfoCell}>상태: {sidebarUserGrade}</div>
        )}
      </div>
      <div className={css.divider}></div>
      <div className={css.linkDiv}>
        <div className={css.link}>
          <Link to="/">홈</Link>
        </div>
        <div className={css.link}>
          <Link to="/reqpage">요청페이지</Link>
        </div>
        <div className={css.link}>
          <Link to="/categoryList">카테고리 전체보기</Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
