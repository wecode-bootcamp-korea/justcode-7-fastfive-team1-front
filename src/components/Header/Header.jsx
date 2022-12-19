import React, { useEffect, useState } from 'react';
import Login from '../Login/Login';
import Request from '../Request/Request';
import css from './Header.module.scss';

const Header = () => {
  const [modalImages, setModalImages] = useState([]);
  const [userName, setUserName] = useState();

  useEffect(() => {
    fetch('/data/modalImage.json')
      .then(res => res.json())
      .then(data => {
        setModalImages(data.image);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== '') {
      fetch(`http://localhost:5500/user`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      })
        .then(res => res.json())
        .then(res => setUserName(res.userInfo.username));
    } else {
      setUserName();
    }
  }, []);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRequestModal, setOpenRequestModal] = useState(false);

  const openLogin = () => {
    setOpenLoginModal(true);
  };

  const onLogout = () => {
    window.localStorage.setItem('token', '');
    window.location.href = '/';
    setUserName('');
  };

  const openRequest = () => {
    setOpenRequestModal(true);
  };
  return (
    <div className={css.header}>
      <div className={css.menuBar}>
        <div className={css.menu}>
          <button
            className={
              openRequestModal ? css.clickedRequestBtn : css.requestBtn
            }
            onClick={openRequest}
            disabled={openRequestModal ? true : false}
          >
            요청하기
          </button>
          {userName ? (
            <div className={css.userLogin}>
              <button className={css.userName}>{userName}님</button>
              <button className={css.logOut} onClick={onLogout}>
                로그아웃
              </button>
            </div>
          ) : (
            <button
              className={openLoginModal ? css.clickedLoginBtn : css.loginBtn}
              onClick={openLogin}
              disabled={openLoginModal ? true : false}
            >
              로그인
            </button>
          )}
          {openLoginModal && (
            <Login
              onClose={() => {
                setOpenLoginModal(false);
              }}
              modalImages={modalImages}
            />
          )}
          {openRequestModal && (
            <Request
              onClose={() => {
                setOpenRequestModal(false);
              }}
              modalImages={modalImages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
