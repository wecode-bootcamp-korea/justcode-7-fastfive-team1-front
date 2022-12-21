import React, { useState } from 'react';
import axios from 'axios';
import AdminModal from './AdminModal';
import css from './AddCategoryModal.module.scss';

const AddCategoryModal = ({ onClose, onCreate }) => {
  const [cardTitle, setCardTitle] = useState('');
  const [cardContent, setCardContent] = useState('');
  const [cardImg, setCardImg] = useState('');

  const onChangeTitle = e => {
    setCardTitle(e.target.value);
  };
  const onChangeContent = e => {
    setCardContent(e.target.value);
  };
  const onChangeImg = e => {
    setCardImg(e.target.files[0]);
  };

  const postCategory = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category_name', cardTitle);
    formData.append('description', cardContent);
    formData.append('img_url', cardImg);
    for (let key of formData.keys()) {
      console.log(key, ':', formData.get(key));
    }

    await axios({
      method: 'POST',
      url: 'http://localhost:5500/category',
      mode: 'cors',
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: localStorage.getItem('token'),
      },
      data: formData,
    });
    onCreate({
      category_name: cardTitle,
      description: cardContent,
      img_url: cardImg,
    });
    setCardTitle('');
    setCardContent('');
    setCardImg('');
  };

  return (
    <AdminModal onClose={onClose}>
      <section className={css.adminContainer}>
        <h1 className={css.title}>Category</h1>
        <form className={css.adminFormBox}>
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
          <button className={css.saveBtn} onClick={e => postCategory(e)}>
            등록
          </button>
        </form>
      </section>
    </AdminModal>
  );
};

export default AddCategoryModal;
