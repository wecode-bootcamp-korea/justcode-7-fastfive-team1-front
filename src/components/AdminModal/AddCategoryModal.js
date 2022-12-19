import React, { useState } from 'react';
import AdminModal from './AdminModal';
import css from './AddCategoryModal.module.scss';

const AddCategoryModal = ({ onClose, onCreate }) => {
  const [cardTitle, setCardTitle] = useState('');
  const [cardContent, setCardContent] = useState('');

  const onSubmint = e => {
    e.preventDefault();
    onCreate({ title: cardTitle, content: cardContent });
    setCardTitle('');
    setCardContent('');
  };

  const onChangeTitle = e => {
    setCardTitle(e.target.value);
  };
  const onChangeContent = e => {
    setCardContent(e.target.value);
  };
  return (
    <AdminModal onClose={onClose}>
      <section className={css.adminContainer}>
        <h1 className={css.title}>Admin 설정</h1>
        <div className={css.adminFormBox}>
          <div className={css.categoryImgWrapper}>
            <img className={css.categoryImg} alt="categoryImage" />
            <button className={css.imgUploadBtn}>이미지 업로드</button>
          </div>
          <div className={css.categoryForm}>
            <label className={css.categoryLabel} htmlFor="category">
              카테고리 이름
            </label>
            <input
              className={css.categoryInput}
              type="text"
              id="category"
              placeholder="카테고리 이름"
              value={cardTitle}
              onChange={onChangeTitle}
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
              value={cardContent}
              onChange={onChangeContent}
            />
          </div>
          <button className={css.saveBtn} onClick={onSubmint}>
            등록
          </button>
        </div>
      </section>
    </AdminModal>
  );
};

export default AddCategoryModal;
