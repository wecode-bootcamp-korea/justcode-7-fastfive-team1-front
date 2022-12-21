import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddCategoryModal from '../AdminModal/AddCategoryModal';
import Carousel from '../Carousel/Carousel';
import CategoryCard from './CategoryCard';
import css from './ServeHome.module.scss';
const ServeHome = () => {
  const [cardData, setCardData] = useState([]);
  const [openAdminModal, setOpenAdminModal] = useState(false);
  const navigate = useNavigate();

  const toCategoryList = id => {
    const token = localStorage.getItem('token');
    if (token !== '') {
      navigate(`/categoryList/${id}`, {
        state: {
          id: id,
        },
      });
    } else {
      alert(`로그인을 먼저 해주세요!`);
      navigate(`/`);
    }
  };

  const toCompanyList = () => {
    const token = localStorage.getItem('token');
    if (token !== '') {
      navigate(`/companyList`);
    } else {
      alert(`로그인을 먼저 해주세요!`);
      navigate(`/`);
    }
  };

  const openAdmin = () => {
    setOpenAdminModal(true);
  };

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
              category_name: categoryTitle,
              description: categoryContent,
              img_url: categoryImg,
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
        category_name: cardInfo.title,
        description: cardInfo.content,
        img_url: cardInfo.img,
      })
    );
    setCardId(i => i + 1);
  };

  const openZendesk = () => {
    window.open('http://localhost:3000/zendesk', '_blank');
  };

  const [target, setTarget] = useState(null);
  const page = 1;

  useEffect(() => {
    let observer;
    if (target) {
      const onIntersect = async ([entry], observer) => {
        if (entry.isIntersection) {
          observer.unobserve(entry.target);
          await fetchData();
          observer.observe(entry.target);
        }
      };
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  const fetchData = async () => {
    const response = await fetch('/data/CategoryData.json');
    const data = await response.json();
    setCardData(prev => prev.concat(data.data));
    page++;
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={css.serveHomeContainer}>
      <div className={css.bannerAd}>
        <Carousel />
      </div>
      <button className={css.companyIntroduceBtn}>
        <span>우리회사 소개하기</span>
        <i className="fa-solid fa-building" />
      </button>
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
        <h2 className={css.viewAllBtn} onClick={toCompanyList}>
          전체 보기
        </h2>
      </div>
      <div className={css.cardComponent}>
        {cardData.map(card => {
          return (
            <CategoryCard
              key={card.id}
              id={card.id}
              category_name={card.category_name}
              img_url={card.img_url}
              description={card.description}
              onRemove={onRemove}
              titleHandler={titleHandler}
              contentHandler={contentHandler}
              categoryTitle={categoryTitle}
              categoryContent={categoryContent}
              onEdit={onEdit}
              imgHandler={imgHandler}
              toCategoryList={toCategoryList}
            />
          );
        })}
      </div>
      <button className={css.zendesk} onClick={openZendesk} ref={setTarget}>
        멤버 소개 관련 문의
      </button>
    </div>
  );
};

export default ServeHome;
