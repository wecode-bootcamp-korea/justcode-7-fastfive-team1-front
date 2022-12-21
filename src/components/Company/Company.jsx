import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Company.module.scss';

const Company = ({ id, companyName, companyShortDesc, companyImgUrl }) => {
  const navigate = useNavigate();

  const toPostDetail = () => {
    navigate(`/postdetail/${id}`);
  };
  return (
    <div className={css.companyContainer} onClick={toPostDetail}>
      <div className={css.companyImageBox}>
        <img
          src={companyImgUrl}
          className={css.companyImage}
          alt="회사이미지"
        />
      </div>
      <div className={css.companyContentBox}>
        <div className={css.companyName}>
          <p className={css.name}>{companyName}</p>
          <p className={css.comment}>댓글 ()</p>
        </div>
        <div className={css.companyIntro}>
          <p className={css.intro}>
            {companyShortDesc} <span className={css.more}>더보기...</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Company;
