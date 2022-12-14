import React from 'react';
function SelectForm({ title, optionVal, datum }) {
  return (
    <>
      {title && <h2>{title} </h2>}
      <select defaultValue="default" name="place" required>
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
}

export default SelectForm;
