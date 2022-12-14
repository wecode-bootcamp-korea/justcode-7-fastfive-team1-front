import React from 'react';
function InputForm({
  title,
  type,
  placeholder,
  setFunction,
  onChange,
  flag,
  max,
  name,
  value,
}) {
  if (type === 'text') {
    return (
      <>
        <h2>{title}</h2>
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          required={flag}
          name={name}
          value={value}
        />
      </>
    );
  } else {
    return (
      <>
        <h2>{title}</h2>
        <textarea
          type={type}
          placeholder={placeholder}
          required={flag}
          onChange={onChange}
          name={name}
          value={value}
          maxLength={max}
        />
      </>
    );
  }
}

export default InputForm;
