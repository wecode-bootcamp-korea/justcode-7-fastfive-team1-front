import { React } from 'react';
import css from './SignUp.module.scss';
import Modal from '../Modal/Modal';

function SignUp({ onClose, modalImages }) {
  const signUpModalImage = modalImages.find(image => {
    return image.title === '회원가입';
  });

  return (
    <Modal onClose={onClose} modalImage={signUpModalImage.image}>
      <section className={css.signUpContainer}>
        <h1>회원가입</h1>
        <div className={css.signUpFormBox}>
          <div className={css.nameForm}>
            <label htmlFor="name">이름</label>
            <input type="text" id="name" placeholder="이름" />
          </div>

          <div className={css.emailForm}>
            <label htmlFor="email">이메일</label>
            <input type="text" id="email" placeholder="이메일" />
          </div>

          <div className={css.passwordForm}>
            <label htmlFor="password">패스워드</label>
            <input type="text" id="password" placeholder="패스워드" />
          </div>

          <div className={css.agreeContent}>
            <div className={css.agreeForm}>
              <input type="checkbox" id="check1" className={css.agreeInput} />
              <label htmlFor="check1" className={css.agreeText}>
                이용약관 <span>(필수)</span>
              </label>
            </div>

            <div className={css.agreeForm}>
              <input type="checkbox" id="check2" className={css.agreeInput} />
              <label htmlFor="check2" className={css.agreeText}>
                개인정보이용동의 <span>(필수)</span>
              </label>
            </div>
          </div>
          <button className={css.signUpBtn}>회원가입</button>
        </div>
      </section>
    </Modal>
  );
}

export default SignUp;
