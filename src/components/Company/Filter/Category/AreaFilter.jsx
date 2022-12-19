import React, { useState, useEffect } from 'react';
import css from './AreaFilter.module.scss';

const AreaFilter = ({ area, setArea }) => {
  const [dropDown, setDropDown] = useState(false);
  const [areaValue, setAreaValue] = useState([]);

  useEffect(() => {
    fetch('/data/place.json')
      .then(res => res.json())
      .then(data => {
        setAreaValue(data.place);
      });
  }, []);

  const onAreaValue = e => {
    setArea(e.target.value);
    setDropDown(!dropDown);
  };

  return (
    <div className={css.areaFilterContainer}>
      <span className={css.filterTitle}>지역</span>
      <button className={css.areaFilter} onClick={() => setDropDown(!dropDown)}>
        <span className={css.area}>{area}</span>
        {dropDown ? (
          <i className="fa-solid fa-angle-up" />
        ) : (
          <i className="fa-solid fa-angle-down" />
        )}
      </button>
      {dropDown ? (
        <div className={css.areaItems}>
          {areaValue.map(areaItem => (
            <button
              className={css.areaValue}
              key={areaItem.id}
              value={areaItem.name}
              onClick={onAreaValue}
            >
              {areaItem.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default AreaFilter;
