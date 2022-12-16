import { React, useState } from 'react';
import Modal from '../Modal/Modal';
import SignUp from '../SignUp/SignUp';
import css from './Login.module.scss';

function Login({ onClose, modalImages }) {
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  const openSignUp = () => {
    setOpenSignUpModal(true);
  };

  const loginModalImage = modalImages.find(image => {
    return image.title === '로그인';
  });

  return (
    <Modal onClose={onClose} modalImage={loginModalImage.image}>
      <section className={css.loginContainer}>
        <h1>로그인</h1>
        <div className={css.loginFormBox}>
          <div className={css.emailForm}>
            <label htmlFor="email">이메일</label>
            <input type="text" id="email" placeholder="이메일" />
          </div>

          <div className={css.passwordForm}>
            <label htmlFor="password">패스워드</label>
            <input type="text" id="password" placeholder="패스워드" />
          </div>

          <button className={css.loginBtn}>로그인</button>

          <div className={css.joinContent}>
            <span>아직 회원이 아니시라면?</span>
            <button className={css.joinBtn} onClick={openSignUp}>
              회원가입 하러가기
            </button>
            {openSignUpModal && (
              <SignUp
                onClose={() => {
                  setOpenSignUpModal(false);
                }}
                modalImages={modalImages}
              />
            )}
          </div>
        </div>
      </section>
    </Modal>
  );
}

export default Login;
