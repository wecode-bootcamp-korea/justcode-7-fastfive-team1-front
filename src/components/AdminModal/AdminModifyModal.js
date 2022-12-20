import React from 'react';
import AdminModal from './AdminModal';
import css from './AdminModifyModal.module.scss';

const Adminset = ({
  onClose,
  title,
  content,
  id,
  titleHandler,
  contentHandler,
  categoryTitle,
  categoryContent,
  onEdit,
  addCategory,
}) => {
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
              placeholder={title}
              value={categoryTitle}
              onChange={titleHandler}
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
              placeholder={content}
              value={categoryContent}
              onChange={contentHandler}
            />
          </div>
          <button className={css.saveBtn} onClick={() => onEdit(id)}>
            저장
          </button>
          <button className={css.saveBtn} onClick={() => addCategory()}>
            등록
          </button>
        </div>
      </section>
    </AdminModal>
  );
};

export default Adminset;
