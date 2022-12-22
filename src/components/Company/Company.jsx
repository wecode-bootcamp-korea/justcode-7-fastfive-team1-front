import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Company.module.scss';

const Company = React.memo(function ({
  id,
  companyName,
  companyShortDesc,
  companyImgUrl,
}) {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  const toPostDetail = () => {
    navigate(`/postdetail/${id}`, { state: '전체 보기' });
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5500/comment/${id}?page=1`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setComments(res.length);
      });
  }, [id]);

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
          <p className={css.comment}>댓글 ({comments})</p>
        </div>
        <div className={css.companyIntro}>
          <p className={css.intro}>
            {companyShortDesc} <span className={css.more}>더보기...</span>
          </p>
        </div>
      </div>
    </div>
  );
});

export default React.memo(Company);
