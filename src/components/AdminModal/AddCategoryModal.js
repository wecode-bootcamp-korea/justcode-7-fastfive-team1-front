import React, { useState, useEffect } from 'react';
import AdminModal from './AdminModal';
import css from './AddCategoryModal.module.scss';

const AddCategoryModal = ({ onClose, onCreate }) => {
  const [cardTitle, setCardTitle] = useState('');
  const [cardContent, setCardContent] = useState('');
  const [cardImg, setCardImg] = useState('');

  const onSubmit = e => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5500/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        img_url: cardImg,
        category_name: cardTitle,
        description: cardContent,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.message === 'CREATE_CATEGORY') {
          e.preventDefault();
          onCreate({
            category_name: cardTitle,
            description: cardContent,
            img_url: cardImg,
          });
          setCardTitle('');
          setCardContent('');
          setCardImg('');

          alert('카테고리 생성');
        } else {
          alert('다시 확인해주세요');
        }
      });
  };
  const onChangeTitle = e => {
    setCardTitle(e.target.value);
  };
  const onChangeContent = e => {
    setCardContent(e.target.value);
  };
  const onChangeImg = e => {
    setCardImg(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <AdminModal onClose={onClose}>
      <section className={css.adminContainer}>
        <h1 className={css.title}>Category</h1>
        <div className={css.adminFormBox}>
          <div className={css.categoryImgWrapper}>
            <input
              className={css.uploadBtn}
              type="file"
              accept="image/*"
              onChange={onChangeImg}
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
          <button className={css.saveBtn} onClick={onSubmit}>
            등록
          </button>
        </div>
      </section>
    </AdminModal>
  );
};

export default AddCategoryModal;
