import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryContent, setCategoryContent] = useState('');
  const [categoryImg, setCategoryImg] = useState('');
  const [userName, setUserName] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const openAdmin = () => {
    setOpenAdminModal(true);
  };
  const titleHandler = e => {
    setCategoryTitle(e.target.value);
  };
  const contentHandler = e => {
    setCategoryContent(e.target.value);
  };
  const imgHandler = e => {
    setCategoryImg(e.target.files[0]);
  };

  const openZendesk = () => {
    window.open('http://localhost:3000/zendesk', '_blank');
  };

  useEffect(() => {
    fetch('http://localhost:5500/category', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => setCardData(res.data));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== '') {
      fetch(`http://localhost:5500/user`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      })
        .then(res => res.json())
        .then(
          res => (
            setUserName(res.userInfo.username),
            setUserInfo(res.userInfo.company.isCompanyMainMember)
          )
        );
    } else {
      setUserName();
    }
  }, []);

  const onRemove = id => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5500/category', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        categoryId: id,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.message === 'DELETE_CATEGORY') {
          setCardData(cardData.filter(category => category.id !== id));
          alert('삭제 완료');
        } else {
          alert('다시 한번 확인해주세요');
        }
      });
  };

  const onEdit = id => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5500/category', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        categoryId: id,
        category_name: categoryTitle,
        description: categoryContent,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.message === 'UPDATE_CATEGORY') {
          setCardData(
            cardData.map(data =>
              data.id === id
                ? {
                    ...data,
                    category_name: categoryTitle,
                    description: categoryContent,
                  }
                : data
            )
          );
          alert('수정완료');
        } else {
          alert('수정 실패');
        }
      });
  };

  const editCategory = async (e, id) => {
    e.preventDefault();
    const imgData = new FormData();
    imgData.append('categoryId', id);
    imgData.append('img_url', categoryImg);

    await axios({
      method: 'PATCH',
      url: 'http://localhost:5500/category/img',
      mode: 'cors',
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: localStorage.getItem('token'),
      },
      data: imgData,
    });
    setCardData(
      cardData.map(data =>
        data.id === id
          ? {
              ...data,
              img_url: categoryImg,
            }
          : data
      )
    );
  };

  const onCreate = cardInfo => {
    setCardData(
      cardData.concat({
        id: cardData.length + 1,
        category_name: cardInfo.category_name,
        description: cardInfo.description,
        img_url: cardInfo.img_url,
      })
    );
  };

  // const [target, setTarget] = useState(null);
  // const page = 1;

  // useEffect(() => {
  //   let observer;
  //   if (target) {
  //     const onIntersect = async ([entry], observer) => {
  //       if (entry.isIntersection) {
  //         observer.unobserve(entry.target);
  //         await fetchData();
  //         observer.observe(entry.target);
  //       }
  //     };
  //     observer = new IntersectionObserver(onIntersect, { threshold: 1 });
  //     observer.observe(target);
  //   }
  //   return () => observer && observer.disconnect();
  // }, [target]);

  // const fetchData = async () => {
  //   const response = await fetch('/data/CategoryData.json');
  //   const data = await response.json();
  //   setCardData(prev => prev.concat(data.data));
  //   page++;
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className={css.serveHomeContainer}>
      <div className={css.bannerAd}>
        <Carousel />
      </div>
      {userInfo === 1 && (
        <button className={css.companyIntroduceBtn}>
          <span>우리회사 소개하기</span>
          <i className="fa-solid fa-building" />
        </button>
      )}
      <div className={css.titleWrapper}>
        <h1 className={css.title}>
          업종별 살펴보기
          {userName === 'admin' && (
            <img
              className={css.settingImg}
              src="https://cdn-icons-png.flaticon.com/512/1481/1481594.png"
              onClick={openAdmin}
            />
          )}
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
              userName={userName}
              toCategoryList={toCategoryList}
              editCategory={editCategory}
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
