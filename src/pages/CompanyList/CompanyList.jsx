import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Company from '../../components/Company/Company';
import Filter from '../../components/Company/Filter/Filter';
import css from './CompanyList.module.scss';

const CompanyList = () => {
  const [companyListData, setCompanyListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [queryString, setQueryString] = useState();

  const pagination = [];
  for (let i = 1; i <= Math.ceil(companyListData.length / 10); i++) {
    pagination.push(i);
  }

  const onPages = e => {
    setCurrentPage(e.target.value);
  };

  console.log(companyListData);
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5500/user`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(res => {
        const userMember = res.userInfo.company;
        setUserData(userMember);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (queryString !== '') {
      fetch(`http://localhost:5500/post?${queryString}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      })
        .then(res => res.json())
        .then(data => {
          setCompanyListData(data);
        });
    } else {
      fetch(`http://localhost:5500/post?${queryString}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      })
        .then(res => res.json())
        .then(data => {
          setCompanyListData(data);
        });
    }
  }, [queryString]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5500/user`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(res => {
        const userMember = res.userInfo.company;
        setUserData(userMember);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className={css.companyListContainer}>
        <Sidebar />
        <section>
          <div className={css.companyListContent}>
            <Link to="/">
              <button className={css.categoryName}>전체보기</button>
            </Link>
            <span>관심 있는 멤버를 찾아보세요!</span>
          </div>
          <div className={css.categoryContent}>
            <Filter setQueryString={setQueryString} currentPage={currentPage} />
            {userData.isCompanyMainMember === 1 ? (
              <Link to="/writePost">
                <button className={css.companyIntroduceBtn}>
                  <span>우리회사 소개하기</span>
                  <i className="fa-solid fa-building" />
                </button>
              </Link>
            ) : null}
          </div>
          <div className={css.companyList}>
            {companyListData.map(
              ({ id, companyName, companyShortDesc, companyImgUrl }) => (
                <Company
                  key={id}
                  id={id}
                  companyName={companyName}
                  companyShortDesc={companyShortDesc}
                  companyImgUrl={companyImgUrl}
                />
              )
            )}
          </div>
          <div className={css.pagination}>
            {pagination.map(page => (
              <button
                className={currentPage === page ? css.currentPage : css.page}
                key={page}
                value={page}
                onClick={onPages}
              >
                {page}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompanyList;
