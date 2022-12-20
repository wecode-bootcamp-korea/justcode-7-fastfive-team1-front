import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AreaFilter from './Category/AreaFilter';
import CategoryFilter from './Category/CategoryFilter';
import SubCategoryFilter from './Category/SubCategoryFilter';
import css from './Filter.module.scss';

const Filter = ({ setQueryString }) => {
  const navigate = useNavigate();
  const [area, setArea] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();

  useEffect(() => {
    const queryString = `${area ? `locationsId=${area}&` : ''}${
      category ? `categoriesLv1Id=${category}` : ''
    }${subCategory ? `&categoriesLv2Id=${subCategory}` : ''}`;
    navigate(`?${queryString}`);
    setQueryString(queryString);
  }, [area, category, subCategory, navigate, setQueryString]);

  return (
    <div className={css.filterBox}>
      <AreaFilter setArea={setArea} />
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
