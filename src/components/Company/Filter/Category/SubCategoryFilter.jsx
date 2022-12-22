import React, { useState, useEffect } from 'react';
import css from './SubCategoryFilter.module.scss';

const SubCategoryFilter = ({
  category,
  setSubCategory,
  subCategoryData,
  setSubCategoryData,
}) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [subCategoryValue, setSubCategoryValue] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URI}/category`, {
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
    e.preventDefault();
    setSubCategory(e.target.value);
    setSubCategoryData(e.target.name);
    setIsDropDown(!isDropDown);
  };

  return (
    <div className={css.subCategoryFilterContainer}>
      <span className={css.filterTitle}>상세분야</span>
      <button
        className={css.subCategoryFilter}
        onClick={() => setIsDropDown(!isDropDown)}
      >
        <span className={css.subCategory}>{subCategoryData}</span>
        {isDropDown ? (
          <i className="fa-solid fa-angle-up" />
        ) : (
          <i className="fa-solid fa-angle-down" />
        )}
      </button>
      {isDropDown ? (
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
