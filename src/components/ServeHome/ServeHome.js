import React, { useEffect, useState } from 'react';
import Carousel from '../Carousel/Carousel';
import CategoryCard from './CategoryCard';
import css from './ServeHome.module.scss';

function ServeHome() {
  const [cardData, SetCardData] = useState([]);

  useEffect(() => {
    fetch('/data/CategoryData.json')
      .then(res => res.json())
      .then(res => SetCardData(res.data));
  }, []);
  return (
    <div className={css.ServeHomeContainer}>
      <div className={css.BannerAd}>
        <Carousel />
      </div>
      <button className={css.CompanyIntroduceBtn}>우리 회사 소개하기</button>
      <div className={css.TitleWrapper}>
        <h1 className={css.Title}>업종별 살펴보기</h1>
        <h2 className={css.ViewAllBtn}>전체 보기</h2>
      </div>
      <div className={css.CardComponent}>
        {cardData.map(card => {
          return (
            <CategoryCard
              key={card.id}
              title={card.title}
              img={card.img}
              content={card.content}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ServeHome;
