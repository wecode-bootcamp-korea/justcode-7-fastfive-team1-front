import React, { useEffect, useState } from 'react';
import css from './CategoryCard.module.scss';

function CategoryCard({ title, img, content }) {
  return (
    <div className={css.CardContainnerWrapper}>
      <div className={css.CardContainner}>
        <img
          className={css.CardImage}
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt=""
        />
        <div className={css.ContentWrapper}>
          <h2 className={css.CategoryName}>{title}</h2>
          <div className={css.Content}>{content}</div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
