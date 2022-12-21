/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import css from './SelectForm.module.scss';

const SelectForm = ({ title, optionVal, datum, setFunc, selected }) => {
  console.log(datum);
  const [category, setCategory] = useState('');
  const [level2Category, setLevel2Category] = useState('');
  const [branch, setBranch] = useState('');
  const [value, setValue] = useState('default');

  useEffect(() => {
    datum.forEach(data => {
      if (data.category_name === category) {
        setFunc(data.id);
      }
    });
  }, [category]);

  useEffect(() => {
    datum.forEach(data => {
      if (data.category === level2Category) {
        setFunc(data.id);
      }
    });
  }, [level2Category]);

  useEffect(() => {
    datum.forEach(data => {
      if (data.branch_name === branch) {
        setFunc(data.id);
      }
    });
  }, [branch]);

  useEffect(() => {
    if (selected) {
      for (let i in datum) {
        if (datum[i].id === selected) {
          if (optionVal === '상세' || optionVal === '카테고리') {
            setValue(datum[i].category);
          } else {
            setValue(datum[i].branch_name);
          }
        }
      }
    }
  }, [datum, selected]);

  const handleSetId = e => {
    e.preventDefault();
    if (optionVal === '카테고리') {
      setCategory(e.currentTarget.value);
    } else if (optionVal === '상세') {
      setLevel2Category(e.currentTarget.value);
    } else if (optionVal === '지점명') {
      setBranch(e.currentTarget.value);
    }
  };

  return (
    <>
      {title && <h2 className={css.title}>{title}</h2>}
      {datum && (
        <select
          className={css.selectVal}
          value={value}
          name="place"
          onChange={e => handleSetId(e)}
        >
          <option value="default" disabled={true}>
            {optionVal}
          </option>
          {datum &&
            datum.map(data => {
              if (optionVal === '지점명') {
                return (
                  <option
                    defaultValue={value}
                    value={data.branch_name}
                    key={data.id}
                  >
                    {data.branch_name}
                  </option>
                );
              } else if (optionVal === '카테고리') {
                return (
                  <option
                    defaultValue={value}
                    value={data.category_name}
                    key={data.id}
                  >
                    {data.category_name}
                  </option>
                );
              } else {
                return (
                  <option
                    defaultValue={value}
                    value={data.category}
                    key={data.id}
                  >
                    {data.category}
                  </option>
                );
              }
            })}
        </select>
      )}
    </>
  );
};

export default SelectForm;
