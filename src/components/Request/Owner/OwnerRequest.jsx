import React, { useState, useEffect } from 'react';
import css from './OwnerRequest.module.scss';
import Calendar from '../Calendar/Calendar';

function OwnerRequest() {
  const [companyData, setCompanyData] = useState();
  const [startDateData, setStartDateData] = useState();
  const [endDateData, setEndDateData] = useState();

  const [companyCheck, setCompanyCheck] = useState(false);
  const [validation, setValidation] = useState(false);

  const companyNameCheck = e => {
    if (e.target.value.length > 0) {
      setCompanyData(e.target.value);
      setCompanyCheck(true);
    }
  };

  useEffect(() => {
    if (companyCheck) {
      setValidation(true);
    }
  }, [companyCheck]);

  const requestCheck = e => {
    alert('회사 이름을 작성해주세요');
  };

  const onSubmit = e => {
    const token = localStorage.getItem('token');
    if (validation === true) {
      fetch(`http://localhost:5500/company-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({
          companyName: companyData,
          startDate: startDateData,
          endDate: endDateData,
        }),
      }).then(res => res.json());
      alert('성공적으로 대표요청 되었습니다!');
      window.location.href = '/';
    } else {
      requestCheck();
    }
  };

  return (
    <div className={css.ownerRequestForm}>
      <div className={css.companyNameBox}>
        <label htmlFor="companyName">회사명</label>
        <input
          type="text"
          placeholder="회사 이름을 작성해주세요"
          className={css.companyName}
          onChange={companyNameCheck}
        />
      </div>
      <div className={css.leasedTerm}>
        <label>임대기간</label>
        <div className={css.dateForm}>
          <Calendar
            setStartDateData={setStartDateData}
            setEndDateData={setEndDateData}
          />
        </div>
      </div>

      <button className={css.submitBtn} onClick={onSubmit}>
        요청하기
      </button>
    </div>
  );
}

export default OwnerRequest;
