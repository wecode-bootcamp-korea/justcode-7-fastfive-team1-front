import React, { useState } from 'react';
import css from './Login.module.scss';
import Modal from '../Modal/Modal';
import SignUp from '../SignUp/SignUp';

const Login = ({ onClose, modalImages }) => {
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);

  const openSignUp = () => {
    setOpenSignUpModal(true);
  };

  const loginModalImage = modalImages.find(image => {
    return image.title === '로그인';
  });

  const onEmailData = e => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (emailRegex.test(e.target.value)) {
      setEmailError(false);
      setEmail(e.target.value);
    } else {
      setEmailError(true);
    }
  };

  const onPasswordData = e => {
    setPassword(e.target.value);
  };

  const onLogin = () => {
    fetch(`http://localhost:5500/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(res => {
        if (res !== null) {
          localStorage.setItem('token', res.token);
          alert('로그인에 성공하였습니다!');
          window.location.href = '/';
        } else {
          alert('로그인에 실패하였습니다.');
        }
      });
  };

  return (
    <Modal onClose={onClose} modalImage={loginModalImage.image}>
      <section className={css.loginContainer}>
        <h1 className={css.login}>로그인</h1>
        <div className={css.loginFormBox}>
          <div className={css.emailForm}>
            <label htmlFor="email" className={css.label}>
              이메일
            </label>
            <div className={css.emailBox}>
              <input
                className={css.input}
                type="text"
                id="userEmail"
                placeholder="이메일"
                defaultValue={email}
                onChange={onEmailData}
              />
            </div>
            <div className={css.formatMessage}>
              {emailError === true ? (
                <span className={css.message}>
                  이메일 형식에 맞춰 입력해주세요
                </span>
              ) : null}
            </div>
          </div>

          <div className={css.passwordForm}>
            <label className={css.label} htmlFor="password">
              패스워드
            </label>
            <input
              className={css.input}
              type="password"
              id="userPassword"
              placeholder="패스워드"
              defaultValue={password}
              onChange={onPasswordData}
            />
          </div>

          <button className={css.loginBtn} onClick={onLogin}>
            로그인
          </button>

          <div className={css.joinContent}>
            <span className={css.goJoin}>아직 회원이 아니시라면?</span>
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
};

export default Login;
