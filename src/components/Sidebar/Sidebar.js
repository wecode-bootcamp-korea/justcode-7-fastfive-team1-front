import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import css from './Sidebar.module.scss';

function SideBar() {
  const [sidebarUserInfo, setSidebarUserInfo] = useState();
  const [sidebarUserGrade, setSidebarUserGrade] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === '' || token === null) {
    } else {
      fetch(`${process.env.REACT_APP_API_URI}/user`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
      })
        .then(res => res.json())
        .then(data => {
          setSidebarUserInfo(data.userInfo);
        });
    }
  }, []);

  const toCompanyList = () => {
    const token = localStorage.getItem('token');
    if (token === '' || token === null) {
      alert(`로그인 후 이용해주세요!`);
      navigate(`/`);
    } else {
      navigate(`/companyList`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === '' || token === null) {
    } else {
      fetch(`${process.env.REACT_APP_API_URI}/grade`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
      })
        .then(res => res.json())
        .then(data => setSidebarUserGrade(data.userGradeInfo));
    }
  }, []);

  return (
    <div className={css.main}>
      <Link to="/">
        <img
          className={css.logoImg}
          src="https://www.fastfive.co.kr/wp-content/uploads/2021/05/202105_logo_1.png"
          alt="로고이미지"
        />
      </Link>
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
          <div className={css.userInfoStatusCell}>
            <div className={css.userInfoCell}>상태: {sidebarUserGrade}</div>
          </div>
        )}
      </div>
      <div className={css.linkDiv}>
        <div className={css.link}>
          <Link to="/reqpage">요청페이지</Link>
        </div>
        <div className={css.link} onClick={toCompanyList}>
          <span>전체 게시글 보기</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
