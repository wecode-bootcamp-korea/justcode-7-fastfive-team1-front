import React, { useState } from 'react';
import css from './OwnerRequest.module.scss';
import Calendar from '../Calendar/Calendar';

function OwnerRequest() {
  const [startDateData, setStartDateData] = useState();
  const [endDateData, setEndDateData] = useState();

  return (
    <div className={css.ownerRequestForm}>
      <div className={css.companyNameBox}>
        <label>회사명</label>
        <input
          type="text"
          placeholder="회사 이름을 작성해주세요"
          className={css.companyName}
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

      <button className={css.submitBtn}>요청하기</button>
    </div>
  );
}

export default OwnerRequest;
