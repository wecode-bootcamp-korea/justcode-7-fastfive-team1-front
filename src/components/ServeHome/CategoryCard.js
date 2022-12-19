import React, { useState } from 'react';
import AdminModifyModal from '../AdminModal/AdminModifyModal';
import css from './CategoryCard.module.scss';

const CategoryCard = ({
  id,
  title,
  img,
  content,
  onRemove,
  titleHandler,
  contentHandler,
  categoryTitle,
  categoryContent,
  onEdit,
  addCategory,
  imgHandler,
}) => {
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
            <button className={css.fixBtn} onClick={openAdmin}>
              수정
            </button>
            {openAdminModal && (
              <AdminModifyModal
                onClose={() => {
                  setOpenAdminModal(false);
                }}
                title={title}
                content={content}
                id={id}
                img={img}
                titleHandler={titleHandler}
                contentHandler={contentHandler}
                categoryTitle={categoryTitle}
                categoryContent={categoryContent}
                onEdit={onEdit}
                imgHandler={imgHandler}
              />
            )}
          </div>
          <div className={css.content}>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
