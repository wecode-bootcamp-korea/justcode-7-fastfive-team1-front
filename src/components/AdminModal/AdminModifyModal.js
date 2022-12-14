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
  imgHandler,
  onEdit,
  onEditCategory,
}) => {
  return (
    <AdminModal onClose={onClose}>
      <section className={css.adminContainer}>
        <h1 className={css.title}>Category 수정</h1>
        <form className={css.adminFormBox}>
          <div className={css.categoryImgWrapper}>
            <img
              className={css.categoryImg}
              src={img_url}
              alt="categoryImage"
            />
            <div className={css.imgUploadWrapper}>
              <input
                className={css.uploadBtn}
                type="file"
                accept="image/*"
                onChange={imgHandler}
              />
              <button
                className={css.saveBtn}
                onClick={e => onEditCategory(e, id)}
              >
                이미지 변경
              </button>
            </div>
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
              카테고리 설명
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
        </form>
      </section>
    </AdminModal>
  );
};

export default Adminset;
