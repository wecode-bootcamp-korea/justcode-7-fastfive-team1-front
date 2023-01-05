import React from 'react';
import css from './Modal.module.scss';

const Modal = ({ children, onClose, modalImage }) => {
  return (
    <div className={css.background}>
      <div className={css.imgBox}>
        <img
          className={css.modalImg}
          src={modalImage}
          alt="패스트파이브 이미지"
        />
      </div>
      <div className={css.content}>
        {children}
        <div className={css.cancelBtn} onClick={onClose}>
          <img
            className={css.close}
            src="./image/cancel.png"
            alt="닫기이미지"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
