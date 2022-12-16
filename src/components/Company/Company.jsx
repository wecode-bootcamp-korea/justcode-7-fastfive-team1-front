import React from 'react';
import css from './Company.module.scss';

function Company({ name, body, comment, image }) {
  return (
    <div className={css.companyContainer}>
      <div className={css.companyImageBox}>
        <img src={image} alt="회사이미지" />
      </div>
      <div className={css.companyContentBox}>
        <div className={css.companyName}>
          <p className={css.name}>{name}</p>
          <p className={css.comment}>댓글 ({comment})</p>
        </div>
        <div className={css.companyIntro}>
          <p className={css.intro}>
            {body} <span className={css.more}>더보기...</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Company;
