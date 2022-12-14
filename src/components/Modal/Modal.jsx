import React from 'react';
import css from './Modal.module.scss';

function Modal({ children, onClose }) {
  return (
    <div className={css.background}>
      <div className={css.imgBox}>
        <img
          src="https://corp.fastfive.co.kr/wp-content/uploads/2021/05/191009_fastfive_0115-2048x1366.jpg"
          alt=""
        />
      </div>
      <div className={css.content}>
        {children}
        <div className={css.cancelBtn} onClick={onClose}>
          <img src="./image/cancel.png" alt="닫기이미지" />
        </div>
      </div>
    </div>
  );
}

export default Modal;
