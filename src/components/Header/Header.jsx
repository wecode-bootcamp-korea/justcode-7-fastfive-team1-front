import { React, useEffect, useState } from 'react';
import Login from '../Login/Login';
import Request from '../Request/Request';
import css from './Header.module.scss';

function Header() {
  const [modalImages, setModalImages] = useState([]);

  useEffect(() => {
    fetch('/data/modalImage.json')
      .then(res => res.json())
      .then(data => {
        setModalImages(data.image);
      });
  }, []);

  // useEffect(() => {
  //   const $body = document.querySelector('body');
  //   const overflow = $body.style.overflow;
  //   $body.style.overflow = 'hidden';
  //   return () => {
  //     $body.style.overflow = overflow;
  //   };
  // }, []);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRequestModal, setOpenRequestModal] = useState(false);

  const openLogin = () => {
    setOpenLoginModal(true);
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
          <button
            className={openLoginModal ? css.clickedLoginBtn : css.loginBtn}
            onClick={openLogin}
            disabled={openLoginModal ? true : false}
          >
            로그인
          </button>
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
}

export default Header;
