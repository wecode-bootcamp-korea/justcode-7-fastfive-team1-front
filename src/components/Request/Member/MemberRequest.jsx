import React, { useState, useEffect } from 'react';
import css from './MemberRequest.module.scss';

const MemberRequest = () => {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    fetch('/data/company.json')
      .then(res => res.json())
      .then(data => {
        setCompany(data.company);
      });
  }, []);

  return (
    <div className={css.memberRequestForm}>
      <p>회사를 선택해주세요</p>
      <select className={css.company}>
        {company.map((company, idx) => (
          <option value={company.name} key={idx}>
            {company.name}
          </option>
        ))}
      </select>
      <button className={css.submitBtn}>요청하기</button>
    </div>
  );
};

export default MemberRequest;
