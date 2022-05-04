import React, { useState, useEffect } from 'react';

import { ComboBox } from 'gestalt';

export default function Select({placeholder, selection, setSelection}) {
  const optionsList = [
    'apple',
    'blueberries',
    'cranberries',
    'dark chocolate',
  ];

  const options = optionsList.map((option, index) => ({
    label: option,
    value: 'value' + index,
  }));

  // user types their own input
  const handleChange = (data) => {
    setSelection(data.value)
  }

  // user clicks on an option
  const handleSelect = (data) => {
    setSelection(data.item.label)
  }

  return (
    <ComboBox
      className="ComboBox"
      accessibilityClearButtonLabel="Clear category value"
      errorMessage={''}
      id="controlled"
      label="Choose a category to display top search trends"
      labelDisplay="hidden"
      noResultText="No results for your selection"
      onBlur={() => {}}
      onClear={() => {}}
      onChange={handleChange}
      onSelect={handleSelect}
      options={options}
      placeholder={placeholder}
    />
  );
}
