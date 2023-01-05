import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AddCategoryModal from '../AdminModal/AddCategoryModal';
import Carousel from '../Carousel/Carousel';
import CategoryCard from './CategoryCard';
import css from './ServeHome.module.scss';
const ServeHome = () => {
  const [cardData, setCardData] = useState([]);
  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryContent, setCategoryContent] = useState('');
  const [categoryImg, setCategoryImg] = useState('');
  const [userName, setUserName] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [postData, setPostData] = useState({});
  const navigate = useNavigate();
  const { page } = useParams();

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

  const toCategoryList = id => {
    const token = localStorage.getItem('token');
    if (token === '' || token === null) {
      alert(`로그인 후 이용해주세요!`);
      navigate(`/`);
    } else {
      navigate(`/categoryList/${id}`, {
        state: {
          id: id,
        },
      });
    }
  };

  const toCompanyList = () => {
    const token = localStorage.getItem('token');
    if (token === '' || token === null) {
      alert(`로그인 후 이용해주세요!`);
      navigate(`/`);
    } else {
      navigate(`/companyList`);
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URI}/category`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => setCardData(res.data));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === '' || token === null) {
      setUserName();
    } else {
      fetch(`${process.env.REACT_APP_API_URI}/user`, {
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
    }
  }, []);

  const onRemove = id => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URI}/category`, {
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
    fetch(`${process.env.REACT_APP_API_URI}/category`, {
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

  const onEditCategory = async (e, id) => {
    e.preventDefault();
    const imgData = new FormData();
    const imgUrl = URL.createObjectURL(categoryImg);
    imgData.append('categoryId', id);
    imgData.append('img_url', categoryImg);

    await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URI}/category/img`,
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
              img_url: imgUrl,
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

  return (
    <div className={css.serveHomeContainer}>
      <div className={css.bannerAd}>
        <Carousel />
      </div>
      {userInfo === 1 && (
        <Link to="/writePost">
          <div className={css.companyIntro}>
            <button className={css.companyIntroduceBtn}>
              <span>우리회사 소개하기</span>
              <i className="fa-solid fa-building" />
            </button>
          </div>
        </Link>
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
              onEditCategory={onEditCategory}
            />
          );
        })}
      </div>
      <Link to="/zendesk">
        <button className={css.zendesk}>멤버 소개 관련 문의</button>
      </Link>
    </div>
  );
};

export default ServeHome;
