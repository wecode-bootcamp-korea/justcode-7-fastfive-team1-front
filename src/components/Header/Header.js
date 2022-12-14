import { React, useEffect, useState } from 'react';
import css from './Header.module.scss';
import Login from '../Login/Login';

function Header() {
  useEffect(() => {
    const $body = document.querySelector('body');
    const overflow = $body.style.overflow;
    $body.style.overflow = 'hidden';
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);

  const [openLoginModal, setOpenLoginModal] = useState(false);

  const openLogin = () => {
    setOpenLoginModal(true);
  };
  return (
    <div className={css.header}>
      <div className={css.menuBar}>
        <div className={css.menu}>
          <button className={css.requestBtn}>요청하기</button>
          <button className={css.loginBtn} onClick={openLogin}>
            로그인
          </button>
          {openLoginModal && (
            <Login
              onClose={() => {
                setOpenLoginModal(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
