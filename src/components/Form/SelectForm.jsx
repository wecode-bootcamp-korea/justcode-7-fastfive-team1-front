import React from 'react';
import css from './SelectForm.module.scss';
const SelectForm = ({ title, optionVal, datum }) => {
  return (
    <>
      {title && <h2 className={css.title}>{title} </h2>}
      <select
        className={css.selectVal}
        defaultValue="default"
        name="place"
        required
      >
        <option value="default" disabled>
          {optionVal}
        </option>
        {datum.map(data => (
          <option value={data.name} key={data.id}>
            {data.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectForm;
