import React from 'react';
import css from './AdminModal.module.scss';

function Modal({ children, onClose }) {
  return (
    <div className={css.background}>
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
