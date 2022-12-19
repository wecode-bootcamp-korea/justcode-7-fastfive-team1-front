import React, { useEffect, useState } from 'react';
import AddCategoryModal from '../AdminModal/AddCategoryModal';
import Carousel from '../Carousel/Carousel';
import CategoryCard from './CategoryCard';
import css from './ServeHome.module.scss';

const ServeHome = () => {
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

  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryContent, setCategoryContent] = useState('');
  const [categoryImg, setCategoryImg] = useState('');

  const titleHandler = e => {
    setCategoryTitle(e.target.value);
  };
  const contentHandler = e => {
    setCategoryContent(e.target.value);
  };
  const imgHandler = e => {
    setCategoryImg(URL.createObjectURL(e.target.files[0]));
  };

  const onEdit = id => {
    setCardData(
      cardData.map(data =>
        data.id === id
          ? {
              ...data,
              title: categoryTitle,
              content: categoryContent,
              img: categoryImg,
            }
          : data
      )
    );
  };

  const [cardId, setCardId] = useState(0);

  const onCreate = cardInfo => {
    setCardData(
      cardData.concat({
        id: cardId,
        title: cardInfo.title,
        content: cardInfo.content,
        img: cardInfo.img,
      })
    );
    setCardId(i => i + 1);
  };
  const openZendesk = () => {
    window.open('http://localhost:3000/zendesk', '_blank');
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
          <AddCategoryModal
            onClose={() => {
              setOpenAdminModal(false);
            }}
            onCreate={onCreate}
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
              titleHandler={titleHandler}
              contentHandler={contentHandler}
              categoryTitle={categoryTitle}
              categoryContent={categoryContent}
              onEdit={onEdit}
              imgHandler={imgHandler}
            />
          );
        })}
      </div>
      <button className={css.zendesk} onClick={openZendesk}>
        멤버 소개 관련 문의
      </button>
    </div>
  );
};

export default ServeHome;
