import React, { useState, useEffect } from 'react';
import css from './AreaFilter.module.scss';

const AreaFilter = ({ setArea }) => {
  const [dropDown, setDropDown] = useState(false);
  const [areaValue, setAreaValue] = useState([]);
  const [areaData, setAreaData] = useState('지역');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URI}/location`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(res => {
        setAreaValue(res.data);
      });
  }, []);

  const onAreaValue = e => {
    setArea(e.target.value);
    setAreaData(e.target.name);
    setDropDown(!dropDown);
  };

  return (
    <div className={css.areaFilterContainer}>
      <span className={css.filterTitle}>지역</span>
      <button className={css.areaFilter} onClick={() => setDropDown(!dropDown)}>
        <span className={css.area}>{areaData}</span>
        {dropDown ? (
          <i className="fa-solid fa-angle-up" />
        ) : (
          <i className="fa-solid fa-angle-down" />
        )}
      </button>
      {dropDown ? (
        <div className={css.areaItems}>
          {areaValue.map(({ id, location_name }) => (
            <button
              key={id}
              className={css.areaValue}
              name={location_name}
              value={id}
              onClick={onAreaValue}
            >
              {location_name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default AreaFilter;
