import React, { useState, useEffect } from 'react';
import css from './SubCategoryFilter.module.scss';

const SubCategoryFilter = ({ category, subCategory, setSubCategory }) => {
  const [dropDown, setDropDown] = useState(false);
  const [subCategoryValue, setSubCategoryValue] = useState([]);

  useEffect(() => {
    fetch('/data/category.json')
      .then(res => res.json())
      .then(res => {
        const subCategoryItem = res.data.filter(
          items => items.category === category
        );
        setSubCategoryValue(subCategoryItem);
      });
  }, [category]);

  const onSubCategoryValue = e => {
    setSubCategory(e.target.value);
    setDropDown(!dropDown);
  };

  return (
    <div className={css.subCategoryFilterContainer}>
      <span className={css.filterTitle}>세부 분야</span>
      <button
        className={css.subCategoryFilter}
        onClick={() => setDropDown(!dropDown)}
      >
        <span className={css.subCategory}>{subCategory}</span>
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
                  value={category}
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
