import React, { useCallback, useEffect, useState } from 'react';
import AdminSet from '../AdminSet/AdminSet';
import Carousel from '../Carousel/Carousel';
import CategoryCard from './CategoryCard';
import css from './ServeHome.module.scss';

function ServeHome() {
  const [cardData, setCardData] = useState([]);
  const [openAdminModal, setOpenAdminModal] = useState(false);

  const openAdmin = () => {
    setOpenAdminModal(true);
  };

  useEffect(() => {
    fetch('/data/CategoryData.json')
      .then(res => res.json())
      .then(res => setCardData(res.data));
  }, []);

  const onRemove = id => {
    setCardData(cardData.filter(category => category.id !== id));
  };

  return (
    <div className={css.serveHomeContainer}>
      <div className={css.bannerAd}>
        <Carousel />
      </div>
      <button className={css.companyIntroduceBtn}>우리 회사 소개하기</button>
      <div className={css.titleWrapper}>
        <h1 className={css.title}>
          업종별 살펴보기
          <img
            className={css.settingImg}
            src="https://cdn-icons-png.flaticon.com/512/1481/1481594.png"
            onClick={openAdmin}
          />
        </h1>
        {openAdminModal && (
          <AdminSet
            onClose={() => {
              setOpenAdminModal(false);
            }}
          />
        )}
        <h2 className={css.viewAllBtn}>전체 보기</h2>
      </div>
      <div className={css.cardComponent}>
        {cardData.map(card => {
          return (
            <CategoryCard
              key={card.id}
              id={card.id}
              title={card.title}
              img={card.img}
              content={card.content}
              onRemove={onRemove}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ServeHome;
