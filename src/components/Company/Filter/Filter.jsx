import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AreaFilter from './Category/AreaFilter';
import CategoryFilter from './Category/CategoryFilter';
import SubCategoryFilter from './Category/SubCategoryFilter';
import css from './Filter.module.scss';

const Filter = ({ setQueryString, currentPage }) => {
  const navigate = useNavigate();
  const [area, setArea] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [subCategoryData, setSubCategoryData] = useState('상세분야');

  useEffect(() => {
    const queryString = `${area ? `locationsId=${area}&` : ''}${
      category ? `categoriesLv1Id=${category}` : ''
    }${subCategory ? `&categoriesLv2Id=${subCategory}` : ''}`;
    setQueryString(queryString);
  }, [area, currentPage, category, subCategory, navigate, setQueryString]);

  const handleCategory = categoryName => {
    setCategory(categoryName);
    setSubCategory();
    setSubCategoryData('상세분야');
  };

  return (
    <div className={css.filterBox}>
      <AreaFilter setArea={setArea} />
      <CategoryFilter handleCategory={handleCategory} />
      <SubCategoryFilter
        category={category}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        subCategoryData={subCategoryData}
        setSubCategoryData={setSubCategoryData}
      />
    </div>
  );
};

export default Filter;
