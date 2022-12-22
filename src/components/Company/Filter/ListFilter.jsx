import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AreaFilter from './Category/AreaFilter';
import SubCategoryFilter from './Category/SubCategoryFilter';
import css from './ListFilter.module.scss';

const ListFilter = React.memo(function ListFilter({ setQueryString }) {
  const navigate = useNavigate();
  const [area, setArea] = useState();
  const [subCategory, setSubCategory] = useState();
  const [subCategoryData, setSubCategoryData] = useState('상세분야');
  const params = useParams();
  const category = params.id;

  useEffect(() => {
    const queryString = `${area ? `locationsId=${area}&` : ''}${
      category ? `categoriesLv1Id=${category}` : ''
    }${subCategory ? `&categoriesLv2Id=${subCategory}` : ''}`;
    setQueryString(queryString);
  }, [params.id, area, category, subCategory, navigate, setQueryString]);

  return (
    <div className={css.filterBox}>
      <AreaFilter setArea={setArea} />
      <SubCategoryFilter
        category={category}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        subCategoryData={subCategoryData}
        setSubCategoryData={setSubCategoryData}
      />
    </div>
  );
});

export default React.memo(ListFilter);
