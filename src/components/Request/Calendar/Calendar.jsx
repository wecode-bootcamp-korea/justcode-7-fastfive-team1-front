import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import moment from 'moment';
import './react-datepicker.scss';
import css from './Calendar.module.scss';

const Calender = ({ setStartDateData, setEndDateData }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const startDateFormat = moment(startDate, 'YYYY.MM.DD').format('YYYY-MM-DD');
  const endDateFormat = moment(endDate, 'YYYY.MM.DD').format('YYYY-MM-DD');

  useEffect(() => {
    setStartDateData(startDateFormat);
    setEndDateData(endDateFormat);
  }, [startDate, endDate]);

  return (
    <div className={css.calenderBox}>
      <div className={css.calenderBox}>
        <DatePicker
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
          selected={startDate}
          onChange={date => setStartDate(date)}
        />
      </div>
      <i className="fa-solid fa-arrow-right" />

      <div className={css.calenderBox}>
        <DatePicker
          locale={ko}
          minDate={startDate}
          dateFormat="yyyy년 MM월 dd일"
          selected={endDate}
          onChange={date => setEndDate(date)}
        />
      </div>
    </div>
  );
};

export default Calender;
