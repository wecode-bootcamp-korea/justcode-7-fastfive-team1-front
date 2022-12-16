import React, { useEffect, useState } from 'react';
import AdminSet from '../AdminSet/AdminSet';
import css from './CategoryCard.module.scss';

function CategoryCard({ id, title, img, content, onRemove }) {
  const [openAdminModal, setOpenAdminModal] = useState(false);

  const openAdmin = () => {
    setOpenAdminModal(true);
  };

  return (
    <div className={css.cardContainnerWrapper}>
      <div className={css.cardContainner}>
        <div className={css.imgWrapper}>
          <img className={css.cardImage} src={img} alt="카테고리 이미지" />
          <button
            className={css.cardDelete}
            onClick={() => onRemove(id)}
          ></button>
        </div>
        <div className={css.contentWrapper}>
          <div className={css.contentHeader}>
            <h2 className={css.categoryName}>{title}</h2>
            <button onClick={openAdmin}>수정</button>
            {openAdminModal && (
              <AdminSet
                onClose={() => {
                  setOpenAdminModal(false);
                }}
                title={title}
                content={content}
              />
            )}
          </div>
          <div className={css.content}>{content}</div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
