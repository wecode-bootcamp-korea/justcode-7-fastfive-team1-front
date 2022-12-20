import React, { useState, useEffect } from 'react';
import css from './SignUp.module.scss';
import Modal from '../Modal/Modal';

const SignUp = ({ onClose, modalImages }) => {
  const signUpModalImage = modalImages.find(image => {
    return image.title === '회원가입';
  });

  //이름,이메일,비밀번호
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //유효성 검사
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstCheckbox, setFirstCheckbox] = useState(false);
  const [secondCheckbox, setSecondCheckbox] = useState(false);
  const [validation, setValidation] = useState(false);

  //이메일 중복확인
  const [duplicateEmail, setDuplicateEmail] = useState(true);
  const duplicateCheck = e => {
    fetch(`http://localhost:5500/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.duplicateEmail === false) {
          alert('사용 가능한 이메일 입니다.');
          setDuplicateEmail(false);
        } else {
          alert('이미 존재하는 이메일 입니다.');
        }
      });
  };

  const nameCheck = e => {
    if (e.target.value.length > 0) {
      setNameError(false);
      setName(e.target.value);
    } else {
      setNameError(true);
    }
  };

  const emailCheck = e => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (emailRegex.test(e.target.value)) {
      setEmailError(false);
      setEmail(e.target.value);
    } else {
      setEmailError(true);
    }
  };

  const passwordCheck = e => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (passwordRegex.test(e.target.value)) {
      setPasswordError(false);
      setPassword(e.target.value);
    } else {
      setPasswordError(true);
    }
  };

  const onFirstCheck = () => {
    setFirstCheckbox(!firstCheckbox);
  };

  const onSecondCheck = () => {
    setSecondCheckbox(!secondCheckbox);
  };

  const signUpCheck = e => {
    if (nameError) {
      alert('이름을 작성해주세요');
    } else if (emailError) {
      alert('이메일을 작성해주세요');
    } else if (passwordError) {
      alert('비밀번호를 작성해주세요');
    } else if (firstCheckbox === false) {
      alert('이용약관에 동의해주세요');
    } else if (secondCheckbox === false) {
      alert('개인정보이용동의에 동의해주세요');
    } else if (duplicateEmail) {
      alert('이메일 중복 확인을 해주세요');
    }
  };

  useEffect(() => {
    if (
      nameError === false &&
      emailError === false &&
      passwordError === false &&
      duplicateEmail === false &&
      firstCheckbox &&
      secondCheckbox
    ) {
      setValidation(true);
    } else if (
      nameError ||
      emailError ||
      passwordError ||
      duplicateEmail ||
      firstCheckbox === false ||
      secondCheckbox === false
    ) {
      setValidation(false);
    }
  }, [
    nameError,
    emailError,
    passwordError,
    duplicateEmail,
    firstCheckbox,
    secondCheckbox,
  ]);

  const onSubmit = e => {
    if (validation === true) {
      fetch(`http://localhost:5500/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      }).then(res => res.json());

      alert('회원가입에 성공하였습니다!');
      window.location.href = '/';
    } else {
      signUpCheck();
    }
  };

  return (
    <Modal onClose={onClose} modalImage={signUpModalImage.image}>
      <section className={css.signUpContainer}>
        <h1 className={css.join}>회원가입</h1>
        <div className={css.signUpFormBox}>
          <div className={css.nameForm}>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="userName"
              placeholder="이름"
              defaultValue={name}
              onChange={nameCheck}
            />
          </div>

          <div className={css.emailForm}>
            <label htmlFor="email">이메일</label>
            <div className={css.emailBox}>
              <input
                type="text"
                id="userEmail"
                placeholder="이메일"
                defaultValue={email}
                onChange={emailCheck}
              />
              {duplicateEmail === true ? (
                <button className={css.duplicate} onClick={duplicateCheck}>
                  확인
                </button>
              ) : (
                <button className={css.notDuplicate} disabled>
                  완료
                </button>
              )}
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
            <label htmlFor="password">패스워드</label>
            <input
              type="password"
              id="userPassword"
              placeholder="패스워드"
              defaultValue={password}
              onChange={passwordCheck}
            />

            <div className={css.formatMessage}>
              {passwordError === true ? (
                <span className={css.message}>
                  영문,숫자, 특수문자를 사용하여 8~16자리 이내로 입력해주세요
                </span>
              ) : null}
            </div>
          </div>

          <div className={css.agreeContent}>
            <div className={css.agreeForm}>
              <input
                type="checkbox"
                id="check1"
                className={css.agreeInput}
                onClick={onFirstCheck}
              />
              <p className={css.agreeText}>
                이용약관 <span>(필수)</span>
              </p>
            </div>

            <div className={css.agreeForm}>
              <input
                type="checkbox"
                id="check2"
                className={css.agreeInput}
                onClick={onSecondCheck}
              />
              <p className={css.agreeText}>
                개인정보이용동의 <span>(필수)</span>
              </p>
            </div>
          </div>
          <button className={css.signUpBtn} onClick={onSubmit}>
            회원가입
          </button>
        </div>
      </section>
    </Modal>
  );
};

export default SignUp;
