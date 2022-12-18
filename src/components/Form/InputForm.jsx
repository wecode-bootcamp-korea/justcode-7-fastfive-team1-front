import React from 'react';
import css from './InputForm.module.scss';

const InputForm = ({
  title,
  type,
  placeholder,
  onChange,
  max,
  name,
  value,
}) => {
  if (type === 'text') {
    return (
      <div className={css.container}>
        <h2>{title}</h2>
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
        />
      </div>
    );
  } else {
    return (
      <div className={css.container}>
        <h2>{title}</h2>
        <textarea
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
          maxLength={max}
        />
      </div>
    );
  }
};

export default InputForm;
