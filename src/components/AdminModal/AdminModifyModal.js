import React from 'react';
import AdminModal from './AdminModal';
import css from './AdminModifyModal.module.scss';

const Adminset = ({
  onClose,
  category_name,
  description,
  id,
  img_url,
  titleHandler,
  contentHandler,
  categoryTitle,
  categoryContent,
  onEdit,
  imgHandler,
}) => {
  return (
    <AdminModal onClose={onClose}>
      <section className={css.adminContainer}>
        <h1 className={css.title}>Category 수정</h1>
        <div className={css.adminFormBox}>
          <div className={css.categoryImgWrapper}>
            <img
              className={css.categoryImg}
              src={img_url}
              alt="categoryImage"
            />
            <input
              className={css.uploadBtn}
              type="file"
              accept="image/*"
              onChange={imgHandler}
            />
          </div>
          <div className={css.categoryForm}>
            <label className={css.categoryLabel} htmlFor="category">
              카테고리 이름
            </label>
            <input
              className={css.categoryInput}
              type="text"
              id="category"
              placeholder={category_name}
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
              placeholder={description}
              value={categoryContent}
              onChange={contentHandler}
            />
          </div>
          <button className={css.saveBtn} onClick={() => onEdit(id)}>
            저장
          </button>
        </div>
      </section>
    </AdminModal>
  );
};

export default Adminset;
