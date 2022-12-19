import React, { useState, useEffect } from 'react';
import css from './CategoryFilter.module.scss';

const CategoryFilter = ({ setFilterValue, setCategory, category }) => {
  const [dropDown, setDropDown] = useState(false);
  const [categoryValue, setCategoryValue] = useState([]);

  useEffect(() => {
    fetch('/data/category.json')
      .then(res => res.json())
      .then(data => {
        setCategoryValue(data.data);
      });
  }, []);

  const onCategoryValue = e => {
    setCategory(e.target.value);
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
          <span className={css.category}>{category}</span>
          {dropDown ? (
            <i className="fa-solid fa-angle-up" />
          ) : (
            <i className="fa-solid fa-angle-down" />
          )}
        </button>
        {dropDown ? (
          <div className={css.categoryItems}>
            {categoryValue.map(({ id, category, subCategory }) => (
              <button
                className={css.categoryValue}
                key={id}
                value={category}
                onClick={onCategoryValue}
              >
                {category}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CategoryFilter;
