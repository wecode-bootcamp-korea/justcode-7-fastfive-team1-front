import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Company from '../../components/Company/Company';
import ListFilter from '../../components/Company/Filter/ListFilter';
import css from './CompanyList.module.scss';

const CategoryList = () => {
  const [companyListData, setCompanyListData] = useState([]);
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [queryString, setQueryString] = useState();

  const pageNation = [];
  for (let i = 1; i <= Math.ceil(companyListData.length / 8); i++) {
    pageNation.push(i);
  }

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
    fetch(`http://localhost:5500/user`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(res => setUserData(res.userInfo.company));
  }, []);

  useEffect(() => {
    setStartPage((currentPage - 1) * 8);
    setEndPage(currentPage * 8);
  }, [currentPage]);

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
            <Link to="/categoryList">
              <button className={css.categoryName}>IT</button>
            </Link>
            <span>관심 있는 멤버를 찾아보세요!</span>
          </div>
          <div className={css.categoryContent}>
            <ListFilter setQueryString={setQueryString} />
            {userData.isCompanyMainMember === 1 ? (
              <button className={css.companyIntroduceBtn}>
                <span>우리회사 소개하기</span>
                <i className="fa-solid fa-building" />
              </button>
            ) : null}
          </div>
          <div className={css.companyList}>
            {companyListData
              .slice(startPage, endPage)
              .map(({ id, companyName, companyShortDesc, companyImgUrl }) => (
                <Company
                  key={id}
                  companyName={companyName}
                  companyShortDesc={companyShortDesc}
                  companyImgUrl={companyImgUrl}
                />
              ))}
          </div>
          <div className={css.pageNation}>
            {pageNation.map(page => (
              <button
                className={currentPage === page ? css.currentPage : css.page}
                key={page}
                onClick={() => setCurrentPage(page)}
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

export default CategoryList;