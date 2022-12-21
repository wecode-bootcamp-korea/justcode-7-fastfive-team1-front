import React, { useState } from 'react';
import AdminModifyModal from '../AdminModal/AdminModifyModal';
import css from './CategoryCard.module.scss';

const CategoryCard = ({
  id,
  category_name,
  img_url,
  description,
  onRemove,
  titleHandler,
  contentHandler,
  categoryTitle,
  categoryContent,
  onEdit,
  addCategory,
  imgHandler,
  toCategoryList,
}) => {
  const [openAdminModal, setOpenAdminModal] = useState(false);

  const openAdmin = () => {
    setOpenAdminModal(true);
  };
  return (
    <div className={css.cardContainnerWrapper}>
      <div className={css.cardContainner} onClick={() => toCategoryList(id)}>
        <div className={css.imgWrapper}>
          <img className={css.cardImage} src={img_url} alt="카테고리 이미지" />
          <button className={css.cardDelete} onClick={() => onRemove(id)}>
            <img
              className={css.deleteImg}
              src="/image/cancel.png"
              alt="cancelImage"
            />
          </button>
        </div>
        <div className={css.contentWrapper}>
          <div className={css.contentHeader}>
            <h2 className={css.categoryName}>{category_name}</h2>
            <button className={css.fixBtn} onClick={openAdmin}>
              수정
            </button>
            {openAdminModal && (
              <AdminModifyModal
                onClose={() => {
                  setOpenAdminModal(false);
                }}
                category_name={category_name}
                description={description}
                id={id}
                img_url={img_url}
                titleHandler={titleHandler}
                contentHandler={contentHandler}
                categoryTitle={categoryTitle}
                categoryContent={categoryContent}
                onEdit={onEdit}
                imgHandler={imgHandler}
              />
            )}
          </div>
          <div className={css.content}>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
