import React from 'react';
import AdminModal from './AdminModal';
import css from './AdminSet.module.scss';

function Adminset({ onClose, title, content }) {
  return (
    <AdminModal onClose={onClose}>
      <section className={css.adminContainer}>
        <h1>Admin 설정</h1>
        <div className={css.loginFormBox}>
          <div className={css.emailForm}>
            <label htmlFor="email">카테고리 이름</label>
            <input type="text" id="email" placeholder={title} />
          </div>
          <div className={css.passwordForm}>
            <label htmlFor="password">카테고리 한줄</label>
            <input type="text" id="password" placeholder={content} />
          </div>
          <button className={css.loginBtn}>저장</button>
        </div>
      </section>
    </AdminModal>
  );
}

export default Adminset;
