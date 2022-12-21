import React, { useState, useEffect } from 'react';
import css from './SubCategoryFilter.module.scss';

const SubCategoryFilter = ({ category, setSubCategory }) => {
  const [dropDown, setDropDown] = useState(false);
  const [subCategoryValue, setSubCategoryValue] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState('상세분야');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5500/category`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(res => {
        const subCategoryItem = res.data.filter(
          items => items.id === Number(category)
        );
        setSubCategoryValue(subCategoryItem);
      });
  }, [category]);

  const onSubCategoryValue = e => {
    setSubCategory(e.target.value);
    setSubCategoryData(e.target.name);
    setDropDown(!dropDown);
  };

  return (
    <div className={css.subCategoryFilterContainer}>
      <span className={css.filterTitle}>상세분야</span>
      <button
        className={css.subCategoryFilter}
        onClick={() => setDropDown(!dropDown)}
      >
        <span className={css.subCategory}>{subCategoryData}</span>
        {dropDown ? (
          <i className="fa-solid fa-angle-up" />
        ) : (
          <i className="fa-solid fa-angle-down" />
        )}
      </button>
      {dropDown ? (
        <div className={css.subCategoryItems}>
          {subCategoryValue.map(({ id, subCategory }) => (
            <div key={id}>
              {subCategory.map(({ id, category }) => (
                <button
                  className={css.subCategoryValue}
                  key={id}
                  name={category}
                  value={id}
                  onClick={onSubCategoryValue}
                >
                  {category}
                </button>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SubCategoryFilter;
