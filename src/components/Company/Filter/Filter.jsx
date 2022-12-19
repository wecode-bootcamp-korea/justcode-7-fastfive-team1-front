import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AreaFilter from './Category/AreaFilter';
import CategoryFilter from './Category/CategoryFilter';
import SubCategoryFilter from './Category/SubCategoryFilter';
import css from './Filter.module.scss';

const Filter = () => {
  const navigate = useNavigate();
  const [area, setArea] = useState('지역');
  const [category, setCategory] = useState('카테고리');
  const [subCategory, setSubCategory] = useState('상세 분야');

  useEffect(() => {
    const queryString = `?${area ? `areaFilter=${area}` : ''} & 
${category ? `category=${category}` : ''} & 
${subCategory ? `subCategory=${subCategory}` : ''}`;
    navigate(queryString);
  }, [area, category, subCategory, navigate]);

  return (
    <div className={css.filterBox}>
      <AreaFilter area={area} setArea={setArea} />
      <CategoryFilter category={category} setCategory={setCategory} />
      <SubCategoryFilter
        category={category}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
      />
    </div>
  );
};

export default Filter;
