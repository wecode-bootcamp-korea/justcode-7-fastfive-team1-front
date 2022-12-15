import React, { useEffect, useState } from 'react';
import css from './SelectForm.module.scss';

const SelectForm = ({ title, optionVal, datum, setFunc }) => {
  const [category, setCategory] = useState('');
  useEffect(() => {
    datum.map(data => {
      if (data.category === category) {
        setFunc(data.id);
      }
    });
  }, [category]);

  return (
    <>
      {title && <h2 className={css.title}>{title} </h2>}
      <select
        className={css.selectVal}
        defaultValue="default"
        name="place"
        onChange={e => setCategory(e.currentTarget.value)}
        required
      >
        <option value="default" disabled>
          {optionVal}
        </option>
        {datum.map(data => {
          if (optionVal === '지점명') {
            return (
              <option value={data.name} key={data.id}>
                {data.name}
              </option>
            );
          } else if (optionVal === '카테고리') {
            return (
              <option value={data.category} id={data.id} key={data.id}>
                {data.category}
              </option>
            );
          }
        })}
      </select>
    </>
  );
};

export default SelectForm;
