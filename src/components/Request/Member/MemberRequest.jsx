import React, { useState, useEffect } from 'react';
import css from './MemberRequest.module.scss';

const MemberRequest = () => {
  const [companyData, setCompanyData] = useState([]);
  const [userCompany, setUserCompany] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URI}/company`)
      .then(res => res.json())
      .then(data => {
        setCompanyData(data);
      });
  }, []);

  const onCompanyData = e => {
    setUserCompany(e.target.value);
  };

  const onSubmit = e => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URI}/member-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        companiesId: userCompany,
      }),
    })
      .then(res => {
        if (res.status === 201) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(res => {
        if (res !== null) {
          alert('성공적으로 멤버요청 되었습니다!');
          window.location.href = '/';
        }
      });
  };

  return (
    <div className={css.memberRequestForm}>
      <p>회사를 선택해주세요</p>
      <select className={css.company} onChange={onCompanyData}>
        {companyData.map((company, idx) => (
          <option value={company.id} key={idx}>
            {company.company_name}
          </option>
        ))}
      </select>
      <button className={css.submitBtn} onClick={onSubmit}>
        요청하기
      </button>
    </div>
  );
};

export default MemberRequest;
