import React, { useRef, useEffect, useState } from 'react';
import AddCategoryModal from '../AdminModal/AddCategoryModal';
import AdminModifyModal from '../AdminModal/AdminModifyModal';
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

  const titleHandler = e => {
    setCategoryTitle(e.target.value);
  };
  const contentHandler = e => {
    setCategoryContent(e.target.value);
  };

  const onEdit = id => {
    setCardData(
      cardData.map(data =>
        data.id === id
          ? { ...data, title: categoryTitle, content: categoryContent }
          : data
      )
    );
  };

  const addCategory = () => {
    setCardData([
      {
        ...cardData,
        id: cardData.length++,
        title: categoryContent,
        content: categoryContent,
      },
    ]);
  };

  const [inputs, setInputs] = useState({
    title: categoryTitle,
    content: categoryContent,
  });
  const { title, content } = inputs;
  const onChange = e => {
    const { title, value } = e.target;
    setInputs({
      ...inputs,
      [title]: value,
    });
    console.log(inputs);
  };
  const nextId = useRef(cardData.length);
  const onCreate = () => {
    setCardData({
      ...cardData,
      id: cardData.length,
      title: categoryTitle,
      content: categoryContent,
    });
    nextId.current += 1;
  };

  const onCreates = (title, content) => {
    const newCard = {
      title,
      content,
      id: nextId.current,
    };
    nextId.current += 1;
    setCardData([...cardData, newCard]);
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
            categoryTitle={categoryTitle}
            categoryContent={categoryContent}
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
              addCategory={addCategory}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ServeHome;
