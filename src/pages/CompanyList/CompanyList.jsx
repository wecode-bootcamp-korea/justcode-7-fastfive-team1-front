import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Company from '../../components/Company/Company';
import css from './CompanyList.module.scss';

const CompanyList = () => {
  const [companyListData, setCompanyListData] = useState([]);
  useEffect(() => {
    fetch('/data/company.json')
      .then(res => res.json())
      .then(data => {
        setCompanyListData(data.company);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className={css.companyListContainer}>
        <Sidebar />
        <section>
          <div className={css.companyListContent}>
            <button className={css.categoryName}>전체보기</button>
            <span>관심 있는 멤버를 찾아보세요!</span>
          </div>
          <div className={css.filterContent}>
            <div className={css.filterBox}>
              <button className={css.area}>
                <span>지역</span>
                <i className="fa-solid fa-caret-down" />
              </button>
              <button className={css.category}>
                <span>카테고리</span>
                <i className="fa-solid fa-caret-down" />
              </button>
              <button className={css.subCategory}>
                <span>상세분야</span>
                <i className="fa-solid fa-caret-down" />
              </button>
            </div>
            <button className={css.companyIntroduceBtn}>
              <span>우리회사 소개하기</span>
              <i className="fa-solid fa-building" />
            </button>
          </div>
          <div className={css.companyList}>
            {companyListData.map(({ id, name, body, comment, image }) => (
              <Company
                key={id}
                name={name}
                body={body}
                comment={comment}
                image={image}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompanyList;
