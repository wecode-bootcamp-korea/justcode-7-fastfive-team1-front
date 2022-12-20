import React from 'react';
import AdminModal from './AdminModal';
import css from './AddCategoryModal.module.scss';

const AddCategoryModal = ({ onClose }) => {
  return (
    <AdminModal onClose={onClose}>
      <section className={css.adminContainer}>
        <h1 className={css.title}>Admin 설정</h1>
        <div className={css.adminFormBox}>
          <div className={css.categoryForm}>
            <label className={css.categoryLabel} htmlFor="category">
              카테고리 이름
            </label>
            <input
              className={css.categoryInput}
              type="text"
              id="category"
              placeholder="카테고리 이름"
            />
          </div>
          <div className={css.contentForm}>
            <label className={css.categoryLabel} htmlFor="content">
              카테고리 한줄
            </label>
            <input
              className={css.categoryInput}
              type="text"
              id="content"
              placeholder="카테고리 내용"
            />
          </div>
          <button className={css.saveBtn}>등록</button>
        </div>
      </section>
    </AdminModal>
  );
};

export default AddCategoryModal;
