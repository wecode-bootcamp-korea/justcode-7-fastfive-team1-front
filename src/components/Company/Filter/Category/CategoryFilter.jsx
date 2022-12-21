import React, { useState, useEffect } from 'react';
import css from './CategoryFilter.module.scss';

const CategoryFilter = ({ setCategory, category }) => {
  const [dropDown, setDropDown] = useState(false);
  const [categoryValue, setCategoryValue] = useState([]);
  const [categoryData, setCategoryData] = useState('카테고리');

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
        console.log(res.data);
        setCategoryValue(res.data);
      });
  }, []);

  const onCategoryValue = e => {
    setCategory(e.target.value);
    setCategoryData(e.target.name);
    setDropDown(!dropDown);
  };

  return (
    <div className={css.categoryFilterWrap}>
      <div className={css.categoryFilterContainer}>
        <span className={css.filterTitle}>카테고리</span>

        <button
          className={css.categoryFilter}
          onClick={() => setDropDown(!dropDown)}
        >
          <span className={css.category}>{categoryData}</span>
          {dropDown ? (
            <i className="fa-solid fa-angle-up" />
          ) : (
            <i className="fa-solid fa-angle-down" />
          )}
        </button>
        {dropDown ? (
          <div className={css.categoryItems}>
            {categoryValue.map(({ id, category_name }) => (
              <button
                className={css.categoryValue}
                key={id}
                name={category_name}
                value={id}
                onClick={onCategoryValue}
              >
                {category_name}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CategoryFilter;
